'use client';

import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

import {
  type EmployerProfile,
  getCurrentUser,
  updateEmployerProfile,
} from '@/lib/usersApi';

import css from './CompanyProfileForm.module.css';

const emptyValues: EmployerProfile = {
  companyName: '',
  websiteUrl: '',
  logo: '',
  description: '',
};

const validationSchema = Yup.object({
  companyName: Yup.string()
    .trim()
    .min(2, 'Назва компанії має містити щонайменше 2 символи')
    .max(100, 'Назва компанії занадто довга')
    .required('Введіть назву компанії'),

  websiteUrl: Yup.string().url('Введіть коректне посилання').nullable(),

  description: Yup.string().max(2000, 'Опис занадто довгий').nullable(),
});

const CompanyProfileForm = () => {
  const [initialValues, setInitialValues] =
    useState<EmployerProfile>(emptyValues);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getCurrentUser();

        setInitialValues({
          companyName: user.companyName ?? '',
          websiteUrl: user.websiteUrl ?? '',
          logo: user.logo ?? '',
          description: user.description ?? '',
        });
      } catch (error) {
        console.error('Failed to load employer profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (
    values: EmployerProfile,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: (nextState?: { values: EmployerProfile }) => void;
    },
  ) => {
    try {
      const updatedUser = await updateEmployerProfile(values);

      const updatedValues = {
        companyName: updatedUser.companyName ?? '',
        websiteUrl: updatedUser.websiteUrl ?? '',
        logo: updatedUser.logo ?? '',
        description: updatedUser.description ?? '',
      };

      setInitialValues(updatedValues);

      resetForm({
        values: updatedValues,
      });
    } catch (error) {
      console.error('Failed to update employer profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Інформація про компанію</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ resetForm, isSubmitting, dirty }) => (
          <Form className={css.form}>
            <label className={css.label}>
              <span>Назва компанії</span>

              <Field
                className={css.input}
                type="text"
                name="companyName"
                placeholder="Назва компанії"
              />

              <ErrorMessage
                name="companyName"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <span>Сайт компанії</span>

              <Field
                className={css.input}
                type="text"
                name="websiteUrl"
                placeholder="Сайт компанії"
              />

              <ErrorMessage
                name="websiteUrl"
                component="span"
                className={css.error}
              />
            </label>

            <div className={css.label}>
              <span>Логотип</span>

              <div className={css.logoPlaceholder}>
                {initialValues.logo ? (
                  <Image
                    src={initialValues.logo}
                    alt="Логотип компанії"
                    width={220}
                    height={120}
                    className={css.logo}
                  />
                ) : (
                  <span>Логотип не завантажено</span>
                )}
              </div>

              <input type="file" accept="image/*" />
            </div>

            <label className={css.label}>
              <span>Опис</span>

              <Field
                className={css.textarea}
                as="textarea"
                name="description"
                placeholder="Короткий опис"
              />

              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </label>

            <div className={css.actions}>
              <button
                type="button"
                className={css.resetButton}
                onClick={() => resetForm()}
                disabled={!dirty || isSubmitting}>
                Скинути зміни
              </button>

              <button
                type="submit"
                className={css.submitButton}
                disabled={!dirty || isSubmitting}>
                {isSubmitting ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyProfileForm;
