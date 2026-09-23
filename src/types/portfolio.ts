export type ContactPlatform = "github" | "linkedin" | "email" | "phone" | "location";

export interface HeroContent {
  eyebrow: string;
  headline: string;
  role: string;
  description: string;
  profileDescription: string;
  photoLabel: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
}

export interface CaseImage {
  src: string;
  alt: string;
}

export interface CaseLink {
  label: string;
  href: string;
}

export interface CaseStudyEntry {
  id: string;
  name: string;
  category: string;
  status?: string;
  summary: string;
  contribution: string;
  details: string[];
  technologies: string[];
  limitations: string[];
  aiScope?: string;
  evidenceNote: string;
  links: CaseLink[];
  images: CaseImage[];
}

export interface EducationEntry {
  id: string;
  title: string;
  institution: string;
  details: string[];
}

export interface ContactEntry {
  id: string;
  platform: ContactPlatform;
  label: string;
  value: string;
  href?: string;
}

export interface PortfolioContent {
  hero: HeroContent;
  cases: CaseStudyEntry[];
  education: EducationEntry[];
  contacts: ContactEntry[];
}
