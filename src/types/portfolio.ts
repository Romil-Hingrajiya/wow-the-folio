export interface WorkExperience {
  id: string;
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string;
  projectType: string;
  liveDemoLink: string;
  githubLink: string;
  projectImages: string;
  role: string;
  date: string;
  teamSize: string;
  usecases: string;
  isPriority: boolean;
}

export interface Education {
  id: string;
  institution: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ContactInfo {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  dribbble: string;
  behance: string;
  blog: string;
  media: string;
  whatsapp: string;
  telegram: string;
}

export interface Customization {
  template: 'template1' | 'template2';
  font: 'Inter' | 'Poppins' | 'Space Grotesk' | 'Roboto' | 'Open Sans' | 'Lato' | 'Montserrat' | 'Raleway';
  primaryColor: string;
  secondaryColor: string;
  theme: 'light' | 'dark';
}

export interface PortfolioData {
  fullName: string;
  title: string;
  tagline: string;
  profilePicture: string;
  aboutMe: string;
  resume: string;
  address: string;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  workExperience: WorkExperience[];
  contact: ContactInfo;
  customization: Customization;
} 