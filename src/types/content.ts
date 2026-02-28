export type SkillCategoryKey = 'languages' | 'frameworks' | 'tools';

export interface SkillGroups {
  languages: string[];
  frameworks: string[];
  tools: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links?: ProjectLink[];
  highlight?: string;
}

export interface HeroHighlight {
  label: string;
  items: string[];
}

export interface SeoConfig {
  title: string;
  description: string;
}

export interface ResumeConfig {
  fileName: string;
  summary: string[];
}

export interface ContactConfig {
  email: string;
  github: string;
  linkedin: string;
}

export interface SiteData {
  name: string;
  role: string;
  location?: string;
  heroTagline: string;
  heroIntro: string;
  heroHighlights: HeroHighlight[];
  about: {
    paragraphs: string[];
  };
  skills: SkillGroups;
  experience: ExperienceItem[];
  projects: Project[];
  contact: ContactConfig;
  resume: ResumeConfig;
  seo: SeoConfig;
}

