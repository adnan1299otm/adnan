
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { IntakeForm } from './components/IntakeForm';
import { IntakeFormData } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'assessment'>('home');

  const startAssessment = () => {
    setView('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const normalizeIntakeData = (data: IntakeFormData) => {
    const getVal = (val: any) => (val && (Array.isArray(val) ? val.length > 0 : true)) ? (Array.isArray(val) ? (val as string[]).join(', ') : val) : 'Not provided';

    const normalized: any = {
      company_name: getVal(data.companyName),
      your_name: getVal(data.userName),
      job_title: getVal(data.jobTitle),
      email: getVal(data.email),
      phone: getVal(data.phone),
      website: getVal(data.websiteUrl),
      company_size: getVal(data.companySize),
      current_tools: getVal(data.techStack),
      primary_pain_point: getVal(data.painPoints),
      price: getVal(data.budget),
      timeline: getVal(data.timeline),
    };

    // Rule 1 & 3: Map industry to company_size and channels to current_tools
    if (data.industry && data.industry !== 'Not provided') {
      normalized.company_size = `${normalized.company_size} | Extra: industry=${data.industry}`;
    }

    if (data.channels && data.channels.length > 0) {
      normalized.current_tools = `${normalized.current_tools} | Extra: channels=${data.channels.join(', ')}`;
    }

    return normalized;
  };

  const handleFormSubmit = async (data: IntakeFormData) => {
    console.log('=== FORM SUBMISSION START ===');
    const normalizedData = normalizeIntakeData(data);
    console.log('Normalized Payload:', JSON.stringify(normalizedData, null, 2));

    const webhookUrl = 'https://n8n-nxanmywj.ap-northeast-1.clawcloudrun.com/webhook/75988002-49f8-4732-a909-243381cb5412';

    try {
      console.log('Sending POST request to:', webhookUrl);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(normalizedData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      // Try to read response body for debugging
      let responseBody = '';
      try {
        responseBody = await response.text();
        console.log('Response body:', responseBody);
      } catch (bodyError) {
        console.log('Could not read response body');
      }

      if (!response.ok) {
        console.error('❌ Failed to submit data');
        console.error('Status:', response.status, response.statusText);
        console.error('Response:', responseBody);
      } else {
        console.log('✅ Data successfully sent to n8n webhook');
        console.log('=== FORM SUBMISSION COMPLETE ===');
      }
    } catch (error) {
      console.error('❌ Network error submitting data:', error);
      if (error instanceof TypeError) {
        console.error('This may be a CORS or network connectivity issue');
      }
    }
  };

  return (
    <Layout hideHeaderFooter={view === 'assessment'}>
      {view === 'home' ? (
        <div className="animate-in fade-in duration-700">
          <Hero onStart={startAssessment} />

          {/* Engineering & Support - High Fidelity, Professional */}
          <section className="py-40 border-t border-white/[0.05] bg-[#030712]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">

                <div className="space-y-12">
                  <div className="space-y-6">
                    <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">Real Humans</p>
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                      Direct Technical <br /> Support Nexus.
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg font-medium">
                      We don't hide behind chatbots. Our core engineering team is accessible via direct lines for enterprise-level troubleshooting and architectural reviews.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="space-y-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">WhatsApp Direct</p>
                      <a href="https://wa.me/01743951355" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
                        +01743951355
                      </a>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Email Nexus</p>
                      <a href="mailto:arafath1299otm@gmail.com" className="text-xl md:text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
                        arafath1299otm@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-[#0A0F1E] border border-white/[0.05] rounded-3xl p-16 aspect-square flex flex-col justify-between shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Audit Protocol</p>
                        <p className="text-[10px] font-black text-[#00E66B] uppercase tracking-widest">Active Status</p>
                      </div>
                    </div>

                    <div className="bg-[#111827]/50 backdrop-blur-sm border border-white/[0.08] p-6 md:p-8 rounded-2xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-2 h-2 bg-[#00E66B] rounded-full animate-pulse"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00E66B]">System Verified</p>
                      </div>
                      <p className="text-base md:text-lg text-slate-200 font-bold leading-relaxed italic">
                        "System integrity confirmed. No riba-based financial modules detected. Security proxy engaged."
                      </p>
                    </div>

                    <div className="flex justify-between items-end text-slate-500 text-[10px] font-mono font-bold uppercase tracking-tighter">
                      <div>SEC_LEVEL: ALPHA</div>
                      <div>RSA-4096_VERIFIED</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ethics Standard */}
          <section className="py-40 border-t border-white/[0.05] bg-[#030712]">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-24 space-y-6">
                <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px]">Compliance Standards</p>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Ethical Workflow Architecture.</h2>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                  We adhere to strict ethical guidelines. Every automation is audited to ensure Sharia-compliant logic and total operational transparency.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <EthicsCard
                  title="Zero-Riba Logic"
                  desc="Financial modules engineered to avoid interest-based calculations by default."
                />
                <EthicsCard
                  title="Full Audit Trail"
                  desc="Absolute traceability for every automated decision and data flow."
                />
                <EthicsCard
                  title="Data Sovereignty"
                  desc="Private infrastructure hosting options for maximum security control."
                />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <IntakeForm
          onSubmit={handleFormSubmit}
          onClose={() => setView('home')}
        />
      )}
    </Layout>
  );
};

const EthicsCard = ({ title, desc }: { title: string, desc: string }) => (
  <div className="p-8 md:p-12 bg-[#0A0F1E] border border-white/[0.08] rounded-3xl transition-all hover:bg-[#0f152a] hover:border-white/[0.15]">
    <p className="text-white font-black text-xl mb-5 tracking-tight">{title}</p>
    <p className="text-slate-400 text-base leading-relaxed font-medium">{desc}</p>
  </div>
);

export default App;
