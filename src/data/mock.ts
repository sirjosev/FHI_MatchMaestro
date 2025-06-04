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
    new Date(2024, 6, 15).toISOString(),
    new Date(2024, 6, 16).toISOString(),
    new Date(2024, 6, 17).toISOString(),
    new Date(2024, 6, 18).toISOString(),
  ];
  const matchTimes = ["14:00", "16:00", "18:00", "20:00"];
  const venues = ["Main Stadium", "Field Alpha", "Arena Beta"];
  const statuses: MatchStatus[] = ["Scheduled", "Completed", "Live", "Postponed"];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const matchStatus = statuses[(i*teams.length + j) % statuses.length];
      let scoreA, scoreB, keyEventsSummary;
      if (matchStatus === "Completed") {
        scoreA = Math.floor(Math.random() * 5);
        scoreB = Math.floor(Math.random() * 5);
        keyEventsSummary = `${teams[i].name} goal ${Math.floor(Math.random()*90)}', ${teams[j].name} goal ${Math.floor(Math.random()*90)}'`;
      } else if (matchStatus === "Live") {
         scoreA = Math.floor(Math.random() * 3);
         scoreB = Math.floor(Math.random() * 3);
         keyEventsSummary = `Match in progress.`;
      }


      matches.push({
        id: `match-${competitionId}-${i}-${j}`,
        competitionId,
        date: matchDates[(i*teams.length + j) % matchDates.length],
        time: matchTimes[(i*teams.length + j) % matchTimes.length],
        teamA: teams[i],
        teamB: teams[j],
        scoreA,
        scoreB,
        status: matchStatus,
        venue: venues[(i*teams.length + j) % venues.length],
        keyEventsSummary,
      });
    }
  }
  return matches.slice(0, 6); // Limit matches for brevity
};

const calculateStandings = (teams: Team[], matches: Match[]): StandingEntry[] => {
  const standingsMap: Map<string, StandingEntry> = new Map(
    teams.map(team => [
      team.id,
      {
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
      },
    ])
  );

  matches.filter(m => m.status === 'Completed').forEach(match => {
    const teamAStats = standingsMap.get(match.teamA.id)!;
    const teamBStats = standingsMap.get(match.teamB.id)!;

    teamAStats.played++;
    teamBStats.played++;
    teamAStats.goalsFor += match.scoreA!;
    teamAStats.goalsAgainst += match.scoreB!;
    teamBStats.goalsFor += match.scoreB!;
    teamBStats.goalsAgainst += match.scoreA!;

    if (match.scoreA! > match.scoreB!) {
      teamAStats.won++;
      teamAStats.points += 3;
      teamBStats.lost++;
    } else if (match.scoreB! > match.scoreA!) {
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
  })).sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);
};


export const mockCompetitions: Competition[] = [
  {
    id: 'comp-1',
    name: 'Summer Hockey League 2024',
    startDate: new Date(2024, 6, 15).toISOString(), // July 15, 2024
    endDate: new Date(2024, 6, 30).toISOString(),   // July 30, 2024
    location: 'City Arena, Capital Town',
    type: 'League',
    status: 'In Progress' as CompetitionStatus,
    description: 'The premier summer hockey league featuring top regional teams.',
    teams: [mockTeams[0], mockTeams[1], mockTeams[2]],
    matches: [], // Will be populated below
    standings: [], // Will be populated below
  },
  {
    id: 'comp-2',
    name: 'National Hockey Championship',
    startDate: new Date(2024, 8, 1).toISOString(),  // September 1, 2024
    endDate: new Date(2024, 8, 15).toISOString(), // September 15, 2024
    location: 'National Sports Complex',
    type: 'Tournament',
    status: 'Published' as CompetitionStatus,
    description: 'The annual national championship to crown the best hockey team in the country.',
    teams: mockTeams,
    matches: [], // Will be populated below
    standings: [], // Will be populated below
  },
  {
    id: 'comp-3',
    name: 'Youth Invitational Cup',
    startDate: new Date(2024, 7, 5).toISOString(), // August 5, 2024
    endDate: new Date(2024, 7, 10).toISOString(), // August 10, 2024
    location: 'Community Sports Park',
    type: 'Cup',
    status: 'Completed' as CompetitionStatus,
    description: 'An invitational cup for promising youth hockey teams.',
    teams: [mockTeams[1], mockTeams[3]],
    matches: [], // Will be populated below
    standings: [], // Will be populated below
  },
];

mockCompetitions.forEach(comp => {
  comp.matches = createMatchesForCompetition(comp.id, comp.teams);
  comp.standings = [{ entries: calculateStandings(comp.teams, comp.matches) }];
  comp.topScorers = comp.teams.flatMap(team => team.players)
    .slice(0,5) // take first 5 players overall for simplicity
    .map(player => ({ player, goals: Math.floor(Math.random() * 10) }))
    .sort((a,b) => b.goals - a.goals);
});


export const getCompetitionById = (id: string): Competition | undefined => {
  return mockCompetitions.find(comp => comp.id === id);
};

export const getAllCompetitions = (): Competition[] => {
  return mockCompetitions;
};
