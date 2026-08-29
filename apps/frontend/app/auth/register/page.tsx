import { Metadata } from 'next';
import RegisterPageClient from './RegisterPageClient';

export const metadata: Metadata = {
  title: 'Реєстрація',
  description: 'Створіть акаунт кандидата або роботодавця на JobScape.',
  openGraph: {
    title: 'Реєстрація',
    description: 'Створіть акаунт кандидата або роботодавця на JobScape.',
    url: '/auth/register',
  },
};

const Page = () => <RegisterPageClient />;
export default Page;
