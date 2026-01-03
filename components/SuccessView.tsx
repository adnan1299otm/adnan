
import React from 'react';

interface SuccessViewProps {
    onReturn: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onReturn }) => {
    return (
        <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6 py-24 animate-in fade-in zoom-in-95 duration-700">
            <div className="max-w-3xl w-full">
                <div className="text-center mb-16">
                    <div className="w-24 h-24 bg-indigo-600/10 border-2 border-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-900/20">
                        <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                        Audit Submission <br className="hidden md:block" /> Logged & Secured.
                    </h2>
                    <p className="text-slate-300 text-xl font-medium max-w-xl mx-auto leading-relaxed">
                        Your strategic organizational profile is now being audited by our engineering team for operational optimization.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <StepCard
                        number="01"
                        title="Internal Audit Start"
                        desc="Our team initiates a manual review of your identified bottlenecks and ecosystem sync points."
                        active
                    />
                    <StepCard
                        number="02"
                        title="Structural Mapping"
                        desc="A senior architect develops an initial logic flow tailored specifically to your tech stack."
                    />
                    <StepCard
                        number="03"
                        title="Strategic Brief"
                        desc="We reach out via your preferred channel within 24 hours to schedule a deep-dive session."
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={onReturn}
                        className="group px-16 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95"
                    >
                        Return to Nexus
                    </button>
                </div>
            </div>
        </div>
    );
};

const StepCard = ({ number, title, desc, active = false }: { number: string, title: string, desc: string, active?: boolean }) => (
    <div className={`p-8 rounded-3xl border-2 transition-all duration-500 ${active ? 'bg-indigo-600/5 border-indigo-500/30' : 'bg-[#0A0F1E] border-white/[0.05]'
        }`}>
        <span className={`block font-black text-xs tracking-widest mb-4 ${active ? 'text-indigo-400' : 'text-slate-600'}`}>
            STEP {number}
        </span>
        <h4 className="text-white font-black text-lg mb-3 tracking-tight">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
);
