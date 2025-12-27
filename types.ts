
export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum SkillStatus {
  GENUINE = 'Genuine',
  EXAGGERATED = 'Exaggerated',
  FAKE = 'Fake'
}

export interface SkillDetail {
  name: string;
  confidence: number;
  status: SkillStatus;
  reason: string;
}

export interface AnalysisResult {
  score: number;
  riskLevel: RiskLevel;
  skills: SkillDetail[];
  explanation: string;
  candidateName?: string;
}

export interface AnalysisFormState {
  linkedinProfile: string;
  resumeFile: File | null;
}

export interface User {
  email: string;
  name: string;
  avatar?: string;
}
