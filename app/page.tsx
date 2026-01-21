import Link from "next/link";
import { ArrowRight, Trophy, Sparkles, Calendar, History } from "lucide-react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 overflow-hidden relative">

            {/* Hero Section */}
            <div className="z-10 w-full max-w-5xl items-center justify-between font-bold text-sm lg:flex mb-12">
                <div className="glass-panel px-6 py-2 rounded-full flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="gradient-text">AI-Powered Scoring & Scheduling</span>
                </div>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-background via-background/80 to-transparent lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <span className="text-white/50">v1.0.0 (Beta)</span>
                </div>
            </div>

            <div className="relative flex place-items-center mb-16 z-10">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                        The Future of <span className="text-primary">Match Management</span>
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                        Experience the next generation of sports scoring. Generate schedules with AI, scan handwritten brackets, and manage tournaments with time-travel version control.
                    </p>

                    <div className="flex gap-4 justify-center">
                        <Link href="/scoring" className="group rounded-lg border border-transparent px-5 py-4 transition-colors bg-primary hover:bg-primary/80 text-white font-semibold flex items-center gap-2">
                            Start Scoring <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/schedule" className="group rounded-lg border border-white/20 px-5 py-4 transition-colors hover:bg-white/10 text-white font-semibold">
                            AI Scheduler
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-6 z-10">
                <FeatureCard
                    icon={<Trophy className="w-8 h-8 text-purple-400" />}
                    title="Live Scoring"
                    desc="Real-time scoreboard with premium animations and audience view support."
                />
                <FeatureCard
                    icon={<Calendar className="w-8 h-8 text-blue-400" />}
                    title="AI Assistant"
                    desc="Just ask: 'Create a double-elimination bracket for 8 teams' and watch the magic."
                />
                <FeatureCard
                    icon={<History className="w-8 h-8 text-pink-400" />}
                    title="Time Travel"
                    desc="Made a mistake? Undo/Redo any action in the tournament history instantly."
                />
            </div>

            {/* Accents */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-0" />
        </main>
    );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="group rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-primary/50 hover:bg-white/10">
            <div className="mb-3">{icon}</div>
            <h2 className={`mb-3 text-2xl font-semibold`}>
                {title}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {desc}
            </p>
        </div>
    )
}
