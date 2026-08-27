type Status = 'active' | 'closed';

interface Employer {
  _id: string;
  companyName: string;
  logo: string;
}

interface Location {
  _id: string;
  name: string;
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
  industryId: string;
  experienceLevelId: string;
  locationId: Location;
  employmentTypeId: string;
  isRemote: boolean;
  status: Status;
  createdAt: string;
  updatedAt: string;
  salaryRange: string;
  hotVacancy: boolean;
}
