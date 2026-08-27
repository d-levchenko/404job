import Image from 'next/image';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import css from '@/app/auth/login/page.module.css';

const Page = () => {
  return (
    <main className={css['login-page']}>
      <div>
        <LoginForm />
      </div>

      <Image
        src="/images/login.jpeg"
        alt=""
        width={720}
        height={900}
        className={css['login-image']}
      />
    </main>
  );
};

export default Page;
