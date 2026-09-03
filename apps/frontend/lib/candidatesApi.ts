import axios from 'axios';

export type ApplicationStatus =
  'pending' | 'reviewed' | 'accepted' | 'rejected';

export type EditableApplicationStatus = 'reviewed' | 'accepted' | 'rejected';

export interface EmployerApplication {
  applicationId: string;

  candidateId: string;
  candidateName: string;

  vacancyId: string;
  vacancyTitle: string;

  resumeUrl: string;
  resumeName: string;

  status: ApplicationStatus;
}

export interface EmployerApplicationsResponse {
  page: number;
  perPage: number;
  totalApplications: number;
  totalPages: number;
  applications: EmployerApplication[];
}

interface GetEmployerApplicationsParams {
  page?: number;
  perPage?: number;
}

export const getEmployerApplications = async ({
  page = 1,
  perPage = 7,
}: GetEmployerApplicationsParams): Promise<EmployerApplicationsResponse> => {
  const response = await axios.get<EmployerApplicationsResponse>(
    '/api/vacancies/my/applications',
    {
      params: {
        page,
        perPage,
      },
    },
  );

  return response.data;
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: EditableApplicationStatus,
) => {
  const response = await axios.patch(
    `/api/vacancies/applications/${applicationId}/status`,
    {
      status,
    },
  );

  return response.data;
};
