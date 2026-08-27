'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './RegisterForm.module.css';
import { RegisterData } from '@/types/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/authApi';
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
interface RegistrationFormProps {
  type: 'candidate' | 'employer';
}

const RegistrationForm = ({ type }: RegistrationFormProps) => {
  const router = useRouter();
  const RegisterFormSchema = Yup.object().shape({
    name:
      type === 'candidate'
        ? Yup.string()
            .trim()
            .min(2, "Ім'я має бути не менше 2 символів")
            .max(32, "Ім'я має бути не більше 32 символів")
            .required("Вкажіть ім'я")
        : Yup.string(),
    companyName:
      type === 'employer'
        ? Yup.string()
            .trim()
            .min(2, 'Назва компанії має бути не менше 2 символів')
            .max(64, 'Назва компанії має бути не більше 64 символів')
            .required('Вкажіть назву компанії')
        : Yup.string(),
    email: Yup.string()
      .trim()
      .email('Електронна адреса має бути валідною, приклад: example@gmail.com')
      .required('Вкажіть електронну адресу'),
    password: Yup.string()
      .min(8, 'Пароль має бути не менше 8 символів')
      .max(128, 'Пароль має бути не більше 128 символів')
      .required('Вкажіть пароль'),
  });

  const handleSubmit = async (
    values: RegisterFormValidation,
    actions: FormikHelpers<RegisterFormValidation>,
  ) => {
    const payload: RegisterData =
      type === 'candidate'
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
      console.log(user);
      toast.success('Реєстрація успішна');
      router.push('/');
    } catch {
      toast.error('Email in use');
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterFormSchema}>
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            {type === 'candidate' && (
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
            {type === 'employer' && (
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
  );
};

export default RegistrationForm;
