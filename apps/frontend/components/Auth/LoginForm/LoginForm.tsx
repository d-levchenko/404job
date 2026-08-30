'use client';

import css from './LoginForm.module.css';

import { useId } from 'react';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('електронна адреса має бути валідною, приклад: example@gmail.com')
    .max(64, 'максимум 64 символи')
    .required('це поле обовʼязкове для заповнення'),
  password: Yup.string()
    .min(8, 'пароль має бути не меньше 8 символів')
    .max(128, 'пароль має бути не більше 128 символів')
    .required('це поле обовʼязкове для заповнення'),
});

const LoginForm = () => {
  const router = useRouter();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: LoginFormValues) => {
    //   ПОКИ ТАК, БЕЗ ЛОГІКИ

    router.push('/');
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
