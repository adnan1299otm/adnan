
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-40 pb-28 min-h-[75vh] flex items-center bg-[#030712]">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white/[0.03] border border-white/[0.1] text-slate-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-12">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          <span>Enterprise Automation Engineering</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-10 leading-[1.1] md:leading-[1.05]">
          Automate Your <br className="hidden md:block" />
          <span className="text-indigo-400">Business Operations</span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
          We build custom automations using n8n to handle customer messages,
          manage leads, and reduce manual work.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-16 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-lg uppercase tracking-widest transition-all shadow-2xl shadow-indigo-900/40 active:scale-[0.98]"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </section>
  );
};
