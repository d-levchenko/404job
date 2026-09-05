import css from './register.module.css';
import Image from 'next/image';
import RegistrationForm from '@/components/Auth/RegisterForm/RegisterForm';
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader/AuthHeader';
import AuthFooter from '@/components/AuthFooter/AuthFooter';

const RegisterPageClient = () => {
  return (
    <div className={css.container}>
      <div className={css.left}>
        <AuthHeader />
        <div className={css.content}>
          <h1 className={css.registerTitle}>Реєстрація</h1>

          <RegistrationForm />
          <div className={css.textLinkContainer}>
            <p>Вже маєте аккаунт?</p>
            <Link href="/auth/login" className={css.link}>
              Увійти
            </Link>
          </div>
        </div>
        <AuthFooter />
      </div>
      <div className={css.right}>
        <Image
          src="/images/registerimg.png"
          alt="Register"
          width={720}
          height={900}
          priority
          className={css.registerImage}
        />
      </div>
    </div>
  );
};

export default RegisterPageClient;
