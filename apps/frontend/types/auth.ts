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

export type UserType = 'candidate' | 'employer';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export type UpdateProfileData = Pick<
  AuthUser,
  'name' | 'githubUrl' | 'linkedinUrl' | 'behanceUrl'
>;

export interface AuthUser {
  _id: string;
  userType: UserType;
  name?: string;
  companyName?: string;
  email: string;
  websiteUrl?: string;
  logo?: string;
  description?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type RegisterData = CandidateRegisterData | EmployerRegisterData;
