export type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'ai' | 'mobile' | 'opensource';
export type AccentColor = 'monochrome' | 'zinc' | 'indigo' | 'emerald';

export interface ProjectItem {
  id: string;
  title: string;
  year?: string;
  location?: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  category?: 'fullstack' | 'frontend' | 'ai' | 'mobile' | 'opensource';
  isMobile?: boolean;
  tags: string[];
  image: string;
  images?: string[];
  demo?: string;
  liveUrl?: string;
  isDemoRestricted?: boolean;
  demoRestrictionReason?: string;
  github?: string;
  githubUrl?: string;
  knowMoreMailto?: string;
  knowMoreLabel?: string;
  readMore?: string;
  playStoreUrl?: string;
  additionalLinks?: { label: string; url: string }[];
  featured: boolean;
  metrics?: { label: string; value: string };
  highlights?: string[];
}

export interface SkillItem {
  name: string;
  level?: number;
  iconName?: string;
}

export interface SkillCategory {
  categoryName: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  role?: string;
  duration: string;
  period?: string;
  location?: string;
  type?: 'Full-time' | 'Contract' | 'Remote' | 'Internship';
  description: string;
  content?: string[];
  achievements: string[];
  techUsed?: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  institution?: string;
  degree: string;
  duration: string;
  period?: string;
  location?: string;
  content?: string[];
  details?: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  email: string;
  website?: string;
}

export interface PersonalInfo {
  name: string;
  headline?: string;
  role: string;
  tagline: string;
  bio: string;
  detailedBio?: string;
  pronunciation?: string;
  audioFile?: string;
  location: string;
  availableForHire: boolean;
  statusText: string;
  avatarUrl: string;
  landingPicture?: string;
  yearsExperience: number;
  completedProjects: number;
  satisfiedClients: number;
  openSourceContributions: number;
  logoType?: {
    mobile: string;
    desktop: string;
  };
}

export interface PortfolioData {
  personal: PersonalInfo;
  socials: SocialLinks;
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  theme: {
    darkMode: boolean;
    primaryColor?: string;
  };
}
