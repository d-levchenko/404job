export type CandidateProfile = {
  _id: string;
  name: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
};

export type UpdateProfilePayload = {
  name: string;
  githubUrl: string;
  linkedinUrl: string;
  behanceUrl: string;
};
