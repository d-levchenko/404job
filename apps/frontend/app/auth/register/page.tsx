'use client';
import { useState } from 'react';
import css from './register.module.css';
import Image from 'next/image';
import RegistrationForm from '@/components/Auth/RegisterForm/RegisterForm';
import Link from 'next/link';
type UserType = 'candidate' | 'employer';
const Page = () => {
  const [userType, setUserType] = useState<UserType>('candidate');
  return (
    <div className={css.container}>
      <div className={css.left}>
        <h1 className={css.registerTitle}>Реєстрація</h1>
        <div className={css.content}>
          <div className={css.userType}>
            <label htmlFor="userType">
              <input
                id="candidate"
                type="radio"
                name="userType"
                value="candidate"
                checked={userType === 'candidate'}
                onChange={() => setUserType('candidate')}
              />
              <span>Шукаю роботу</span>
            </label>
            <label htmlFor="employer">
              <input
                id="employer"
                type="radio"
                name="userType"
                value="employer"
                checked={userType === 'employer'}
                onChange={() => setUserType('employer')}
              />
              <span>Шукаю працівників</span>
            </label>
          </div>
          <RegistrationForm type={userType} />
          <div className={css.textLinkContainer}>
            <p>Вже маєте аккаунт?</p>
            <Link href="/auth/login" className={css.link}>
              Увійти
            </Link>
          </div>
        </div>
      </div>
      <div className={css.right}>
        <Image
          src="/images/registerimg.png"
          alt="Register"
          width={500}
          height={600}
          priority
          className={css.registerImage}
        />
      </div>
    </div>
  );
};

export default Page;
