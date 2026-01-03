
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  hideHeaderFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, hideHeaderFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-indigo-500/30 font-sans tracking-tight">
      {!hideHeaderFooter && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/95 backdrop-blur-md border-b border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
            <span className="font-black text-lg md:text-xl tracking-[0.15em] text-white uppercase">Ara AutoFlow</span>
          </div>
        </header>
      )}

      <main className={`flex-grow ${!hideHeaderFooter ? 'pt-20' : ''}`}>
        {children}
      </main>

      {!hideHeaderFooter && (
        <footer className="bg-[#030712] border-t border-white/[0.05] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-16">
              <div className="space-y-6">
                <span className="font-black text-2xl text-white tracking-tighter">Ara AutoFlow</span>
                <p className="text-slate-400 leading-relaxed font-medium max-w-sm text-base">
                  High-performance automation systems for enterprise operations. Built on n8n. Secured for scale.
                </p>
              </div>
              <div className="space-y-6">
                <h4 className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[10px]">Support Nexus</h4>
                <div className="space-y-4">
                  <p className="text-slate-300 text-sm font-medium">For project inquiries and technical assistance:</p>
                  <a
                    href="mailto:arafath1299otm@gmail.com"
                    className="text-lg md:text-xl font-bold text-white hover:text-indigo-400 transition-colors block"
                  >
                    arafath1299otm@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-slate-500 text-xs font-medium">
                &copy; {new Date().getFullYear()} Ara AutoFlow — Architecting Operational Autonomy.
              </p>
              <div className="flex space-x-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Official n8n Solution Partner</span>
                <span>Encrypted Data Governance</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
