
export type CompetitionStatus = "Draft" | "Published" | "Verify" | "In Progress" | "Completed";
export type MatchStatus = "Scheduled" | "Live" | "Completed" | "Postponed";

export interface Player {
  id: string;
  name: string;
  jerseyNumber?: number;
  position?: string;
}

export interface Team {
  id:string;
  name: string;
  logoUrl?: string; // URL to team logo
  players: Player[];
  coach?: string;
  staff?: { role: string; name: string }[];
}

export interface MatchEvent {
  minute: number;
  type: "Goal" | "Card" | "Substitution"; // Example event types
  teamId: string; // ID of the team the event belongs to
  playerId?: string; // ID of the player involved
  detail: string; // e.g., "Red Card", "Assist by Player X"
}

export interface Match {
  id: string;
  competitionId: string;
  date: string; // ISO string for date
  time: string; // HH:MM format
  teamA: Team;
  teamB: Team;
  scoreA?: number;
  scoreB?: number;
  status: MatchStatus;
  venue: string;
  officials?: { role: string; name: string }[];
  lineupA?: Player[]; // Starting lineup for Team A
  lineupB?: Player[]; // Starting lineup for Team B
  events?: MatchEvent[];
  keyEventsSummary?: string; // For AI input, text summary of key events like "Team A goal 10', Team B red card 40'"
  story?: { preview?: string; summary?: string };
}

export interface StandingEntry {
  teamId: string;
  teamName: string;
  teamLogoUrl?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Competition {
  id: string;
  name: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  location: string;
  type: string; // e.g., "League", "Cup", "Tournament"
  status: CompetitionStatus;
  description?: string;
  teams: Team[]; // List of participating teams
  matches: Match[];
  standings?: { poolName?: string; entries: StandingEntry[] }[]; // Array of standings, possibly per pool
  topScorers?: { player: Player; goals: number }[];
  // Other relevant statistics
}
