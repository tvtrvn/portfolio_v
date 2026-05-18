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

export type ProjectStatus = 'shipped' | 'in-progress' | 'archived' | 'live';
export type ProjectKind = 'fullstack' | 'frontend' | 'mobile' | 'extension' | 'data' | 'systems';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  links?: ProjectLink[];
  highlight?: string;
  year: string;
  role: string;
  status: ProjectStatus;
  kind: ProjectKind;
  featured?: boolean;
  /**
   * Marks this project as the portfolio's flagship / hero project.
   * The starred project is always sorted first across every surface
   * (Home hero, Projects archive, Resume grid). Use sparingly — ideally
   * only one project carries this flag at a time.
   */
  starred?: boolean;
  metrics?: { label: string; value: string }[];
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
  phone?: string;
  github: string;
  linkedin: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  verifyUrl?: string;
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
  certifications: Certification[];
  contact: ContactConfig;
  resume: ResumeConfig;
  seo: SeoConfig;
}
