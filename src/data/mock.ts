
import type { Competition, Team, Match, StandingEntry, Player, CompetitionStatus, MatchStatus } from '@/types';

const generatePlayers = (teamIdBase: string, numPlayers: number): Player[] => {
  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
  return Array.from({ length: numPlayers }, (_, i) => ({
    id: `${teamIdBase}-player-${i + 1}`,
    name: `Player ${String.fromCharCode(65 + i)} (${teamIdBase.toUpperCase()})`,
    jerseyNumber: i + 1,
    position: positions[i % positions.length],
  }));
};

export const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Blue Dragons',
    logoUrl: 'https://placehold.co/100x100.png',
    players: generatePlayers('team-1', 16),
    coach: 'Coach Dragon',
  },
  {
    id: 'team-2',
    name: 'Red Phoenix',
    logoUrl: 'https://placehold.co/100x100.png',
    players: generatePlayers('team-2', 16),
    coach: 'Coach Phoenix',
  },
  {
    id: 'team-3',
    name: 'Green Griffins',
    logoUrl: 'https://placehold.co/100x100.png',
    players: generatePlayers('team-3', 16),
    coach: 'Coach Griffin',
  },
  {
    id: 'team-4',
    name: 'Yellow Yetis',
    logoUrl: 'https://placehold.co/100x100.png',
    players: generatePlayers('team-4', 16),
    coach: 'Coach Yeti',
  },
];

const createMatchesForCompetition = (competitionId: string, teams: Team[]): Match[] => {
  const matches: Match[] = [];
  if (teams.length < 2) return matches;

  const matchDates = [
    new Date(2024, 6, 15).toISOString(), // July 15
    new Date(2024, 6, 16).toISOString(), // July 16
    new Date(2024, 6, 20).toISOString(), // July 20
    new Date(2024, 6, 21).toISOString(), // July 21
    new Date(2024, 7, 5).toISOString(),  // Aug 5
    new Date(2024, 7, 6).toISOString(),  // Aug 6
  ];
  const matchTimes = ["14:00", "16:00", "18:00", "20:00"];
  const venues = ["Main Stadium", "Field Alpha", "Arena Beta", "Community Pitch"];
  const statuses: MatchStatus[] = ["Scheduled", "Completed", "Live", "Postponed"];

  let matchCounter = 0;
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const matchStatus = statuses[matchCounter % statuses.length];
      let scoreA, scoreB, keyEventsSummary;

      if (matchStatus === "Completed") {
        scoreA = Math.floor(Math.random() * 5);
        scoreB = Math.floor(Math.random() * 5);
        const teamAName = teams[i].name.split(' ')[0]; // Use first word of team name for brevity
        const teamBName = teams[j].name.split(' ')[0];
        keyEventsSummary = `${teamAName} goal ${Math.floor(Math.random()*90)}', ${teamBName} goal ${Math.floor(Math.random()*90)}'.`;
        if (Math.random() > 0.5) keyEventsSummary += ` ${teamAName} penalty ${Math.floor(Math.random()*90)}'.`;
      } else if (matchStatus === "Live") {
         scoreA = Math.floor(Math.random() * 3);
         scoreB = Math.floor(Math.random() * 3);
         keyEventsSummary = `Match currently in progress. Exciting plays unfolding!`;
      } else if (matchStatus === "Scheduled") {
        keyEventsSummary = `Get ready for this exciting matchup!`;
      } else { // Postponed
        keyEventsSummary = `This match has been postponed. New details will be announced soon.`;
      }

      matches.push({
        id: `match-${competitionId}-${matchCounter}`,
        competitionId,
        date: matchDates[matchCounter % matchDates.length],
        time: matchTimes[matchCounter % matchTimes.length],
        teamA: teams[i],
        teamB: teams[j],
        scoreA,
        scoreB,
        status: matchStatus,
        venue: venues[matchCounter % venues.length],
        keyEventsSummary,
      });
      matchCounter++;
    }
  }
  return matches.slice(0, Math.min(matches.length, 6)); // Limit matches for brevity per competition
};

const calculateStandings = (teams: Team[], matches: Match[]): StandingEntry[] => {
  const standingsMap: Map<string, StandingEntry> = new Map();

  teams.forEach(team => {
    standingsMap.set(team.id, {
      teamId: team.id,
      teamName: team.name,
      teamLogoUrl: team.logoUrl,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    });
  });

  matches.forEach(match => {
    if (match.status !== 'Completed' || typeof match.scoreA !== 'number' || typeof match.scoreB !== 'number') {
      return; // Skip matches not completed or without scores
    }

    const teamAStats = standingsMap.get(match.teamA.id)!;
    const teamBStats = standingsMap.get(match.teamB.id)!;

    teamAStats.played++;
    teamBStats.played++;
    teamAStats.goalsFor += match.scoreA;
    teamAStats.goalsAgainst += match.scoreB;
    teamBStats.goalsFor += match.scoreB;
    teamBStats.goalsAgainst += match.scoreA;

    if (match.scoreA > match.scoreB) {
      teamAStats.won++;
      teamAStats.points += 3;
      teamBStats.lost++;
    } else if (match.scoreB > match.scoreA) {
      teamBStats.won++;
      teamBStats.points += 3;
      teamAStats.lost++;
    } else {
      teamAStats.drawn++;
      teamBStats.drawn++;
      teamAStats.points += 1;
      teamBStats.points += 1;
    }
  });

  return Array.from(standingsMap.values()).map(entry => ({
    ...entry,
    goalDifference: entry.goalsFor - entry.goalsAgainst,
  })).sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    return b.goalsFor - a.goalsFor; // Tie-breaker: goals for
  });
};


export const mockCompetitions: Competition[] = [
  {
    id: 'comp-1',
    name: 'Summer Hockey League 2024',
    startDate: new Date(2024, 6, 15).toISOString(), // July 15, 2024
    endDate: new Date(2024, 7, 15).toISOString(),   // Aug 15, 2024 (extended)
    location: 'City Arena, Capital Town',
    type: 'League',
    status: 'In Progress' as CompetitionStatus,
    description: 'The premier summer hockey league featuring top regional teams. Expect fierce competition and thrilling matches throughout the season.',
    teams: [mockTeams[0], mockTeams[1], mockTeams[2], mockTeams[3]], // Added one more team
    matches: [], 
    standings: [], 
  },
  {
    id: 'comp-2',
    name: 'National Hockey Championship',
    startDate: new Date(2024, 8, 1).toISOString(),  // September 1, 2024
    endDate: new Date(2024, 8, 15).toISOString(), // September 15, 2024
    location: 'National Sports Complex',
    type: 'Tournament',
    status: 'Published' as CompetitionStatus,
    description: 'The annual national championship to crown the best hockey team in the country. Features a knockout stage after group matches.',
    teams: mockTeams, // Uses all mock teams
    matches: [], 
    standings: [], 
  },
  {
    id: 'comp-3',
    name: 'Youth Invitational Cup',
    startDate: new Date(2024, 5, 10).toISOString(), // June 10, 2024 (earlier)
    endDate: new Date(2024, 5, 15).toISOString(), // June 15, 2024
    location: 'Community Sports Park',
    type: 'Cup',
    status: 'Completed' as CompetitionStatus,
    description: 'An invitational cup for promising youth hockey teams, focusing on development and sportsmanship.',
    teams: [mockTeams[0], mockTeams[1], mockTeams[2]], // More teams
    matches: [],
    standings: [],
  },
];

mockCompetitions.forEach(comp => {
  comp.matches = createMatchesForCompetition(comp.id, comp.teams);
  comp.standings = [{ poolName: comp.type === 'League' ? 'Overall League Standings' : (comp.teams.length > 2 ? 'Group A' : undefined), entries: calculateStandings(comp.teams, comp.matches) }];
  // Example for multi-pool, not fully implemented in createMatchesForCompetition yet but structure is ready:
  // if (comp.id === 'comp-2') { // Example for a tournament with groups
  //   const groupASteams = comp.teams.slice(0,2);
  //   const groupBSteams = comp.teams.slice(2,4);
  //   const groupAMatches = comp.matches.filter(m => groupASteams.includes(m.teamA) && groupASteams.includes(m.teamB));
  //   const groupBMatches = comp.matches.filter(m => groupBSteams.includes(m.teamA) && groupBSteams.includes(m.teamB));
  //   comp.standings = [
  //     { poolName: 'Group A', entries: calculateStandings(groupASteams, groupAMatches) },
  //     { poolName: 'Group B', entries: calculateStandings(groupBSteams, groupBMatches) }
  //   ];
  // }
  
  comp.topScorers = comp.teams.flatMap(team => team.players)
    .slice(0,5) 
    .map(player => ({ player, goals: Math.floor(Math.random() * 10) }))
    .sort((a,b) => b.goals - a.goals);
});


export const getCompetitionById = (id: string): Competition | undefined => {
  return mockCompetitions.find(comp => comp.id === id);
};

export const getAllCompetitions = (): Competition[] => {
  return mockCompetitions;
};

// Example function to get matches for a specific team (not used yet but useful)
export const getMatchesByTeamId = (teamId: string): Match[] => {
  const allMatches: Match[] = mockCompetitions.flatMap(comp => comp.matches);
  return allMatches.filter(match => match.teamA.id === teamId || match.teamB.id === teamId);
};
