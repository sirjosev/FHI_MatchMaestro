"use client";

import { useState } from "react";
import { Send, Upload, Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SchedulePage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: 'Hello! I can help you create a match schedule. You can ask me to generate one, or upload a photo of a handwritten bracket.' }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Mock function to simulate AI response
    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput("");
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `I'm processing your request for: "${userMsg}". (API integration pending deployment)`
            }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">

            {/* Sidebar / Chat Interface */}
            <div className="w-full md:w-[400px] border-r border-white/10 flex flex-col bg-card">
                <div className="p-4 border-b border-white/10 font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" /> AI Scheduler Assistant
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={cn("p-3 rounded-lg max-w-[85%] text-sm", m.role === 'user' ? "ml-auto bg-primary text-primary-foreground" : "bg-white/10")}>
                            {m.content}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bg-white/10 w-fit p-3 rounded-lg">
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-white/10 flex flex-col gap-2">
                    {/* Input Area */}
                    <div className="relative">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Describe your schedule..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-primary/50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="absolute right-2 top-2 p-1.5 bg-primary rounded-md text-white hover:bg-primary/90 disabled:opacity-50"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="text-xs text-center text-white/30 px-2 py-1">
                        OR
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-white/20 hover:bg-white/5 transition-colors text-sm text-white/60 hover:text-white">
                        <Upload className="w-4 h-4" /> Upload Handwritten Diagram
                    </button>
                </div>
            </div>

            {/* Main Content / Visualization Area */}
            <div className="flex-1 p-8 bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />

                <div className="z-10 relative h-full flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <ImageIcon className="w-10 h-10 text-white/20" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Schedule Visualization</h3>
                        <p className="text-white/40 max-w-sm mx-auto">
                            The generated schedule or digitized bracket will appear here once processed by the AI.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
