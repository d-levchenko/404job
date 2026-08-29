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
