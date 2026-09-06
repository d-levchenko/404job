import Image from 'next/image';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import css from './page.module.css';
import AuthHeader from '@/components/AuthHeader/AuthHeader';
import AuthFooter from '@/components/AuthFooter/AuthFooter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Увійти | JobSpace',
  description: 'Вхід в особистий кабінет JobSpace.',

  openGraph: {
    title: 'Увійти | JobSpace',
    description: 'Вхід в особистий кабінет JobSpace.',
    url: '/auth/login',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Увійти | JobSpace',
    description: 'Вхід в особистий кабінет JobSpace.',
  },
};

const Page = () => {
  return (
    <main className={css['login-page']}>
      <div className={css['login-page-container']}>
        <AuthHeader />
        <LoginForm />
        <AuthFooter />
      </div>

      <Image
        src="/images/login.jpeg"
        alt=""
        width={720}
        height={900}
        priority
        className={css['login-image']}
      />
    </main>
  );
};

export default Page;
