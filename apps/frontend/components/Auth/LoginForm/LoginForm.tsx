'use client';

import css from './LoginForm.module.css';

import { useId } from 'react';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import { loginUser } from '@/lib/authApi';
import toast from 'react-hot-toast';
import { loginSchema } from '@/validation/authValidation';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();

  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormData) => {
    try {
      await loginUser(values);
      router.push('/');
    } catch {
      toast.error('Неправильний email або пароль');
    }
  };

  const id = useId();

  return (
    <div className={css['login-form']}>
      <h1 className={css['form-title']}>Вхід</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}>
        {({ errors, touched }) => {
          return (
            <Form className={css['form']}>
              <div className={css['inputs-and-btn']}>
                <div className={css['input-label-container']}>
                  <label htmlFor={`${id}-email`}>Пошта*</label>
                  <Field
                    type="email"
                    id={`${id}-email`}
                    placeholder="Ваше ім’я"
                    className={
                      errors.email && touched.email
                        ? css['input-error']
                        : css['input']
                    }
                    name="email"
                  />
                  <ErrorMessage
                    component={'span'}
                    name="email"
                    className={css['error-valid-text']}
                  />
                </div>

                <div className={css['input-label-container']}>
                  <label htmlFor={`${id}-password`}>Пароль*</label>
                  <Field
                    type="password"
                    id={`${id}-password`}
                    placeholder="********"
                    className={
                      errors.password && touched.password
                        ? css['input-error']
                        : css['input']
                    }
                    name="password"
                  />
                  <ErrorMessage
                    component={'span'}
                    name="password"
                    className={css['error-valid-text']}
                  />
                </div>

                <button type="submit" className={css['submit-form-btn']}>
                  Увійти
                </button>
              </div>
              <p className={css['register-info']}>
                Ще не маєте аккаунту?{' '}
                <Link href={'/auth/register'} className={css['register-link']}>
                  Зареєструватися
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
