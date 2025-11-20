export interface Job {
  id: number;
  companyId: number; // New: To link job to a company profile
  title: string;
  company: string;
  city: string;
  description: string;
  postedDate: string;
  educationLevel?: string;
  experience?: string;
  languages?: string[];
  phoneNumber?: string;
}

export type City = string;

export enum View {
  Home,
  Onboarding,
  JobBoard,
  PostJobForm,
  Services,
  About,
  Contact,
  CompanyProfileSetup,
  AuthChoice,
  Login,
  SignUp,
  Profile,
  Messages,
  CompanyProfilePage, // New
  UserProfilePage, // New
}

export interface Filters {
  education: string[];
  languages: string[];
}

export interface WorkExperience {
    jobTitle: string;
    company: string;
    years: string;
}

export interface UserProfile {
    id: number; // New
    name: string;
    profilePicture?: string;
    residentCity: string;
    education: string;
    experienceLevel: string;
    workHistory: WorkExperience[];
    cities: string[];
    languages: string[];
    skills: string[];
}

export type UserRole = 'jobSeeker' | 'employer' | null;

export interface CompanyProfile {
  id: number; // New
  name: string;
  logo: string; // base64 data URL
  website?: string;
  city: string;
  industry: string;
  size: string;
  description: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

export interface Conversation {
  id: number;
  participantId: number; // New
  participantType: 'user' | 'company'; // New
  name: string;
  avatarUrl: string;
  avatarChar: string; // Fallback
  messages: Message[];
  unread: number;
  onlineStatus: 'online' | 'offline';
  lastReadMessageId?: number; // To track read receipts
}

export interface MockUser {
  email: string;
  password?: string; // Optional for social logins
  role: 'jobSeeker' | 'employer';
  profileId: number | null; // null if profile is not yet created
}

export interface MockGoogleAccount {
  name: string;
  email: string;
  avatarUrl: string;
}
