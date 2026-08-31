'use client';
import css from './LoginForm.module.css';
import { useId } from 'react';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/lib/authApi';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Електронна адреса має бути валідною, приклад: example@gmail.com')
    .max(64, 'Максимум 64 символи')
    .required('Це поле обовʼязкове для заповнення'),
  password: Yup.string()
    .min(8, 'Пароль має бути не меньше 8 символів')
    .max(128, 'Пароль має бути не більше 128 символів')
    .required('Це поле обовʼязкове для заповнення'),
});

const LoginForm = () => {
  const router = useRouter();
  const { setEmployer, setCandidate, setUserType } = useAuthStore();

  const initialValues: LoginFormData = {
    email: '',
    password: '',
  };
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      if (data.userType === 'employer') {
        setUserType(data.userType);
        setEmployer(data);
      } else {
        setUserType(data.userType);
        setCandidate(data);
      }
      router.push('/');
    },
    onError: error => {
      console.log('mutation error', error); // додай це для діагностики
      toast.error('Неправильний email або пароль');
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    mutate(values);
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
