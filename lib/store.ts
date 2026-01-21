import { create } from 'zustand';
import { temporal } from 'zundo'; // We might need to add zundo to dependencies if not there, but for now I'll write manual undo/redo or just simulate it if I can't add packages.
// Actually, standard zustand pattern for undo/redo is easier to implement manually or use a library.
// Since I can't install 'zundo' easily without node, I will implement a simple history stack manually.

type Match = {
    id: string;
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    status: 'scheduled' | 'live' | 'finished';
};

type AppState = {
    matches: Match[];
    addMatch: (match: Match) => void;
    updateScore: (id: string, team: 'A' | 'B', delta: number) => void;
};

// Simple History Wrapper
type HistoryState<T> = {
    past: T[];
    present: T;
    future: T[];
    undo: () => void;
    redo: () => void;
    set: (newPresent: T) => void;
};

/* 
  Ideally we'd use 'zundo' but let's stick to a simple store first to ensure compilatibility.
  I'll just put a placeholder for now. 
*/

export const useStore = create<AppState>((set) => ({
    matches: [],
    addMatch: (match) => set((state) => ({ matches: [...state.matches, match] })),
    updateScore: (id, team, delta) => set((state) => ({
        matches: state.matches.map((m) => {
            if (m.id !== id) return m;
            return {
                ...m,
                scoreA: team === 'A' ? Math.max(0, m.scoreA + delta) : m.scoreA,
                scoreB: team === 'B' ? Math.max(0, m.scoreB + delta) : m.scoreB,
            };
        }),
    })),
}));
