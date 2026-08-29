type Status = 'active' | 'closed';
type ExperienceLevelsName = 'Trainee' | 'Junior' | 'Middle' | 'Senior' | 'Lead';
export type FilterOptionType =
  'locations' | 'industries' | 'experienceLevels' | 'employmentTypes';

interface Employer {
  _id: string;
  companyName: string;
  logo: string;
  createdAt: string;
  description: string;
  email: string;
  updatedAt: string;
  userType: string;
  websiteUrl: string;
}

export interface Location {
  _id: string;
  name: string;
}

export interface AllVacancies {
  page: number;
  perPage: number;
  totalPages: number;
  totalVacancies: number;
  vacancies: Vacancy[];
}

export interface EmploymentType {
  _id: string;
  name: string;
}

export interface Industry {
  _id: string;
  name: string;
}

export interface ExperienceLevel {
  _id: string;
  name: ExperienceLevelsName;
}

export interface Vacancy {
  _id: string;
  employerId: Employer;
  title: string;
  description: string;
  requirements: string;
  duties: string;
  plusWillBe: string;
  weOffer: string;
  industryId: Industry;
  experienceLevelId: ExperienceLevel;
  locationId: Location;
  employmentTypeId: EmploymentType;
  isRemote: boolean;
  status: Status;
  createdAt: string;
  updatedAt: string;
  salaryRange: string;
  hotVacancy: boolean;
  isFavorite?: boolean;
  isApplied?: boolean;
}
