"use client";

import { useState } from "react";
import { useStore } from "@/lib/store"; // We'll assume the store export works
import { cn } from "@/lib/utils";
import { Minus, Plus, RefreshCcw, Save } from "lucide-react";

export default function ScoringPage() {
    // Local state for demo if store isn't fully wired or for simple interaction
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [teamA, setTeamA] = useState("Home Team");
    const [teamB, setTeamB] = useState("Away Team");

    // In a real app, we'd use the global store:
    // const { updateScore } = useStore();

    const handleScore = (team: 'A' | 'B', delta: number) => {
        if (team === 'A') setScoreA(Math.max(0, scoreA + delta));
        else setScoreB(Math.max(0, scoreB + delta));
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 glass-panel p-4 rounded-xl">
                <h1 className="text-xl font-bold gradient-text">Live Match Scoring</h1>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-sm flex gap-2 items-center">
                        <Save className="w-4 h-4" /> Save Result
                    </button>
                </div>
            </header>

            {/* Scoreboard */}
            <div className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center max-w-6xl mx-auto w-full">

                {/* Team A */}
                <TeamCard
                    name={teamA}
                    score={scoreA}
                    onInc={() => handleScore('A', 1)}
                    onDec={() => handleScore('A', -1)}
                    color="text-indigo-400"
                    onChangeName={setTeamA}
                />

                {/* VS / Timer Section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="text-4xl font-black text-white/20">VS</div>
                    <div className="glass-panel px-6 py-3 rounded-lg text-2xl font-mono font-bold tracking-widest text-white">
                        12:45
                    </div>
                    <button
                        onClick={() => { setScoreA(0); setScoreB(0); }}
                        className="p-2 text-white/40 hover:text-white transition-colors"
                        title="Reset Match"
                    >
                        <RefreshCcw className="w-6 h-6" />
                    </button>
                </div>

                {/* Team B */}
                <TeamCard
                    name={teamB}
                    score={scoreB}
                    onInc={() => handleScore('B', 1)}
                    onDec={() => handleScore('B', -1)}
                    color="text-pink-400"
                    isReversed
                    onChangeName={setTeamB}
                />
            </div>
        </div>
    );
}

function TeamCard({ name, score, onInc, onDec, color, isReversed, onChangeName }: any) {
    return (
        <div className={cn("glass-panel p-8 rounded-3xl w-full md:w-96 flex flex-col items-center gap-6 transition-all hover:bg-white/5", isReversed ? "md:items-start" : "md:items-end")}>
            <input
                value={name}
                onChange={(e) => onChangeName(e.target.value)}
                className={cn("bg-transparent text-3xl font-bold outline-none w-full text-center md:text-right border-b border-transparent focus:border-white/20 transition-colors pb-2", isReversed && "md:text-left")}
            />

            <div className={cn("text-9xl font-black tracking-tighter select-none tabular-nums", color)}>
                {score}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onDec}
                    className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors active:scale-95"
                >
                    <Minus className="w-8 h-8" />
                </button>
                <button
                    onClick={onInc}
                    className={cn("w-16 h-16 rounded-full flex items-center justify-center transition-colors active:scale-95 text-black shadow-lg shadow-white/10", color.replace('text-', 'bg-'))}
                >
                    <Plus className="w-8 h-8 font-bold" />
                </button>
            </div>
        </div>
    )
}
