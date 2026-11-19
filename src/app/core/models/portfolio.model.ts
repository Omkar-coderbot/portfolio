export interface MetricItem {
  label: string;
  value: string;
  detail: string;
}

export interface StructuredColumn {
  title: string;
  badge?: string;
  items: {
    label: string;
    value: string;
    detail?: string;
  }[];
}

export interface ProjectMediaView {
  id: string;
  label: string;
  assetUrl: string;
  caption: string;
  alt: string;
  description?: string;
}

export interface ProjectMediaSlot {
  type: 'single' | 'switcher';
  defaultViewId?: string;
  views: ProjectMediaView[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  scaleBadge: string;
  tags: string[];
  metrics: MetricItem[];
  mediaSlot: ProjectMediaSlot;
  columnLeft: StructuredColumn;
  columnRight: StructuredColumn;
  problem: string;
  hardDecision: string;
  whatBrokeFirstAndFix: {
    broke: string;
    fix: string;
    outcome: string;
  };
  architectureHighlights: string[];
}

export interface HowIWorkPillar {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  keyPractices: string[];
  icon: 'poc' | 'mentor' | 'performance';
}

export interface TechSkill {
  name: string;
  description: string;
  highlight?: boolean;
}

export interface TechCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: TechSkill[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  description?: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  board: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface ProfileData {
  name: string;
  title: string; // Strictly "Senior Software Engineer"
  company: string;
  location: string;
  tenure: string;
  totalExperience: string;
  summary: string;
  email: string;
  phone: string;
  resumeUrl: string;
  github: string;
  linkedin: string;
  coreStack: string[];
  telemetryHighlights: {
    value: string;
    label: string;
    subtext: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'complete' | 'error';
}
