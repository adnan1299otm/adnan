
export interface IntakeFormData {
  // Step 1: Contact Info
  companyName: string;
  userName: string;
  jobTitle: string;
  email: string;
  phone: string;
  websiteUrl?: string;

  // Step 2: Business Details
  companySize: string;
  industry: string;

  // Step 3: Tech Stack (Multi-select)
  techStack: string[];

  // Step 4: Pain Points (Multi-select)
  painPoints: string[];

  // Step 5: Channels (Multi-select)
  channels: string[];

  // Step 6: Timeline & Budget
  timeline: string;
  budget: string;
}

export type StepKey = 1 | 2 | 3 | 4 | 5 | 6;
