export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  scaleBadge: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  problem: string;
  hardDecision: string;
  whatBrokeFirstAndFix: {
    broke: string;
    fix: string;
    outcome: string;
  };
  architectureHighlights: string[];
  diagramType: 'tpl-dataflow' | 'koop-spatial' | 'ai-massing';
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

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'complete' | 'error';
}
