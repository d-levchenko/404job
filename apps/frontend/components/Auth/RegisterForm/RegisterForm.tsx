'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import css from './RegisterForm.module.css';
import { RegisterData, UserType } from '@/types/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/authApi';
import { RegisterValidation } from '@/validation/authValidation';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
interface RegisterFormValidation {
  name: string;
  companyName: string;
  email: string;
  password: string;
}

const initialValues: RegisterFormValidation = {
  name: '',
  companyName: '',
  email: '',
  password: '',
};

const RegistrationForm = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const [userType, setUserType] = useState<UserType>('candidate');

  const router = useRouter();
  const RegisterFormSchema = RegisterValidation(userType);

  const handleSubmit = async (
    values: RegisterFormValidation,
    actions: FormikHelpers<RegisterFormValidation>,
  ) => {
    const payload: RegisterData =
      userType === 'candidate'
        ? {
            userType: 'candidate',
            name: values.name,
            email: values.email,
            password: values.password,
          }
        : {
            userType: 'employer',
            companyName: values.companyName,
            email: values.email,
            password: values.password,
          };
    try {
      const user = await registerUser(payload);

      setUser(user);
      setIsAuthenticated(true);
      toast.success('Реєстрація успішна');
      router.push('/');
    } catch {
      toast.error('Ця електронна адреса вже використовується');
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <>
      <div className={css.userType}>
        <label htmlFor="candidate">
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
      <div className={css.formContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={RegisterFormSchema}>
          {({ errors, touched, isSubmitting }) => (
            <Form className={css.form}>
              {userType === 'candidate' && (
                <div className={css.fieldGroup}>
                  <label htmlFor="name"> Ім&#39;я*</label>
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Ваше ім’я"
                    className={`${css.input} ${touched.name && errors.name ? css.inputError : ''}`}
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={css.errorMessage}
                  />
                </div>
              )}
              {userType === 'employer' && (
                <div className={css.fieldGroup}>
                  <label htmlFor="companyName">Компанія*</label>
                  <Field
                    id="companyName"
                    type="text"
                    name="companyName"
                    placeholder="Назва компанії"
                    className={`${css.input} ${touched.companyName && errors.companyName ? css.inputError : ''}`}
                  />
                  <ErrorMessage
                    name="companyName"
                    component="span"
                    className={css.errorMessage}
                  />
                </div>
              )}
              <div className={css.fieldGroup}>
                <label htmlFor="email">Пошта*</label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Ваша пошта"
                  className={`${css.input} ${touched.email && errors.email ? css.inputError : ''}`}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.fieldGroup}>
                <label htmlFor="password">Пароль*</label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  className={`${css.input} ${touched.password && errors.password ? css.inputError : ''}`}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.errorMessage}
                />
              </div>
              <button className={css.button} type="submit">
                {isSubmitting ? 'Реєстрація...' : 'Зареєструватись'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegistrationForm;
