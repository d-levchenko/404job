export interface CandidateRegisterData {
  userType: 'candidate';
  name: string;
  email: string;
  password: string;
}

export interface EmployerRegisterData {
  userType: 'employer';
  companyName: string;
  email: string;
  password: string;
}

export type RegisterData = CandidateRegisterData | EmployerRegisterData;

export type UserType = 'candidate' | 'employer';

export interface LoginFormData {
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name: string;
  githubUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
}

export interface AuthUser {
  _id: string;
  userType: 'candidate' | 'employer';
  name?: string;
  companyName?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
