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
