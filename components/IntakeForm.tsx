
import React, { useState } from 'react';
import { 
  COMPANY_SIZE_OPTIONS, 
  TECH_STACK_OPTIONS, 
  PAIN_POINT_OPTIONS, 
  CHANNEL_OPTIONS, 
  TIMELINE_OPTIONS, 
  BUDGET_OPTIONS 
} from '../constants';
import { IntakeFormData, StepKey } from '../types';

interface IntakeFormProps {
  onSubmit: (data: IntakeFormData) => void;
  onClose?: () => void;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit, onClose }) => {
  const [currentStep, setCurrentStep] = useState<StepKey>(1);
  const [formData, setFormData] = useState<IntakeFormData>({
    companyName: '',
    userName: '',
    jobTitle: '',
    email: '',
    phone: '',
    websiteUrl: '',
    companySize: '',
    industry: '',
    techStack: [],
    painPoints: [],
    channels: [],
    timeline: '',
    budget: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleMultiSelect = (field: keyof IntakeFormData, value: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!(formData.companyName && formData.userName && formData.jobTitle && formData.email && formData.phone);
      case 2:
        return !!(formData.companySize && formData.industry);
      case 3:
        return formData.techStack.length > 0;
      case 4:
        return formData.painPoints.length > 0;
      case 5:
        return formData.channels.length > 0;
      case 6:
        return !!(formData.timeline && formData.budget);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (isStepValid() && currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as StepKey);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as StepKey);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    onSubmit(formData);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#030712] flex items-center justify-center p-6 animate-in fade-in duration-500">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-900/40">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Profile Secured</h2>
          <p className="text-slate-400 mb-12 text-lg leading-relaxed font-medium">
            Your organizational data is being processed. An automation architect will be in touch within 24 hours.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-16 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-xl hover:bg-slate-200 transition-all shadow-2xl"
          >
            Finalize
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#030712] overflow-y-auto pt-16 pb-24 px-6 selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-14">
          <div className="flex flex-col">
            <span className="font-black text-[10px] tracking-[0.4em] text-indigo-500 uppercase mb-2">Technical Assessment</span>
            <span className="font-black text-sm tracking-[0.2em] text-white uppercase">Phase {currentStep} <span className="text-slate-700">/ 06</span></span>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-slate-700 hover:text-white transition-colors p-2 bg-white/[0.03] rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden mb-20">
          <div 
            className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>

        <div className="bg-[#0A0F1E] border border-white/[0.05] rounded-[2.5rem] p-12 md:p-20 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="space-y-16">
            
            <div className="min-h-[400px]">
              {currentStep === 1 && (
                <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-tight">Lead Stakeholder</h3>
                    <p className="text-slate-500 text-lg font-medium">Core contact for technical implementation.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <InputGroup label="Organization" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Enterprise Name" />
                    <InputGroup label="Stakeholder Name" name="userName" value={formData.userName} onChange={handleInputChange} placeholder="Full Legal Name" />
                    <InputGroup label="Position" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Role or Title" />
                    <InputGroup label="Secure Email" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="corp@nexus.io" />
                    <InputGroup label="Direct Phone" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+X XXX XXX XXXX" />
                    <InputGroup label="Digital Domain" type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} placeholder="https://domain.io" required={false} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-tight">Organization Profile</h3>
                    <p className="text-slate-500 text-lg font-medium">Operational scale and sector definition.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <label className="block text-[11px] font-black text-slate-500 mb-5 uppercase tracking-[0.3em]">Workforce Scale</label>
                      <select 
                        name="companySize" 
                        value={formData.companySize} 
                        onChange={handleInputChange} 
                        className="w-full bg-[#111827] border-2 border-white/[0.05] rounded-2xl px-7 py-5 text-white font-black focus:border-indigo-600 outline-none transition-all appearance-none cursor-pointer text-base shadow-sm"
                      >
                        <option value="">Select Scale...</option>
                        {COMPANY_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <InputGroup label="Primary Vertical" name="industry" value={formData.industry} onChange={handleInputChange} placeholder="e.g. Fintech, Logistics" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-tight">Technical Stack</h3>
                    <p className="text-slate-500 text-lg font-medium">Identify current ecosystem integration points.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TECH_STACK_OPTIONS.map(opt => (
                      <SelectCard key={opt} active={formData.techStack.includes(opt)} onClick={() => toggleMultiSelect('techStack', opt)} label={opt} />
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-tight">System Friction</h3>
                    <p className="text-slate-500 text-lg font-medium">Identify critical operational bottlenecks.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PAIN_POINT_OPTIONS.map(opt => (
                      <SelectCard key={opt} active={formData.painPoints.includes(opt)} onClick={() => toggleMultiSelect('painPoints', opt)} label={opt} />
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-tight">Surface Channels</h3>
                    <p className="text-slate-500 text-lg font-medium">Active touchpoints requiring logic layers.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CHANNEL_OPTIONS.map(opt => (
                      <SelectCard key={opt} active={formData.channels.includes(opt)} onClick={() => toggleMultiSelect('channels', opt)} label={opt} />
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-tight">Implementation Logic</h3>
                    <p className="text-slate-500 text-lg font-medium">Timeline and strategic allocation.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <label className="block text-[11px] font-black text-slate-500 mb-5 uppercase tracking-[0.3em]">Deployment Timeline</label>
                      <select 
                        name="timeline" 
                        value={formData.timeline} 
                        onChange={handleInputChange} 
                        className="w-full bg-[#111827] border-2 border-white/[0.05] rounded-2xl px-7 py-5 text-white font-black focus:border-indigo-600 outline-none transition-all appearance-none cursor-pointer text-base shadow-sm"
                      >
                        <option value="">Select Timeline...</option>
                        {TIMELINE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-500 mb-5 uppercase tracking-[0.3em]">Allocation Range</label>
                      <select 
                        name="budget" 
                        value={formData.budget} 
                        onChange={handleInputChange} 
                        className="w-full bg-[#111827] border-2 border-white/[0.05] rounded-2xl px-7 py-5 text-white font-black focus:border-indigo-600 outline-none transition-all appearance-none cursor-pointer text-base shadow-sm"
                      >
                        <option value="">Select Allocation...</option>
                        {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-16 flex items-center justify-between border-t border-white/[0.05]">
              <button
                type="button"
                onClick={prevStep}
                className={`px-10 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all ${
                  currentStep === 1 
                  ? 'opacity-0 pointer-events-none' 
                  : 'text-slate-600 hover:text-white'
                }`}
              >
                Back
              </button>
              
              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`px-16 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all ${
                    isStepValid() 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-900/40' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className={`px-20 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all ${
                    isStepValid() && !isSubmitting
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-900/40' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  {isSubmitting ? 'Securing Data...' : 'Submit Profile'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, placeholder, type = "text", required = true }) => (
  <div>
    <label className="block text-[11px] font-black text-slate-500 mb-5 uppercase tracking-[0.3em]">{label}</label>
    <input
      required={required}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#111827] border-2 border-white/[0.05] rounded-2xl px-7 py-5 text-white placeholder:text-slate-800 font-black focus:border-indigo-600 outline-none transition-all text-base shadow-sm"
    />
  </div>
);

const SelectCard: React.FC<SelectCardProps> = ({ active, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative text-left p-7 rounded-[1.5rem] border-2 transition-all duration-300 flex items-center gap-6 ${
      active 
      ? 'bg-indigo-600/10 border-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
      : 'bg-[#111827] border-white/5 text-slate-500 hover:border-white/10'
    }`}
  >
    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
      active ? 'bg-indigo-500 border-indigo-500' : 'bg-transparent border-slate-700 group-hover:border-slate-600'
    }`}>
      {active && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
    </div>
    <span className="font-black text-base tracking-tight leading-tight">{label}</span>
  </button>
);

interface InputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}

interface SelectCardProps {
  active: boolean;
  onClick: () => void;
  label: string;
}
