import ProfileForm from '@/components/Dashboard/CandidateDashboardPage/ProfileForm/ProfileForm';

const testUser = {
  name: 'Іван',
  githubUrl: 'https://github.com/test',
  linkedinUrl: 'https://linkedin.com/in/test',
  behanceUrl: '',
};

const Page = () => {
  return <ProfileForm user={testUser} />;
};

export default Page;
