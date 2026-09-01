'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import NoImage from '@/assets/no-image.svg';
import Loader from '@/components/Loader/Loader';
import { uploadLogo } from '@/lib/uploadLogo';
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

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [logoPreview, setLogoPreview] = useState('');

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

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

        toast.error('Не вдалося завантажити дані компанії.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (
    values: EmployerProfile,
    { setSubmitting, resetForm }: FormikHelpers<EmployerProfile>,
  ) => {
    try {
      let logoUrl = values.logo;

      if (logoFile) {
        logoUrl = await uploadLogo(logoFile);
      }

      const updatedUser = await updateEmployerProfile({
        ...values,
        logo: logoUrl,
      });

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

      setLogoFile(null);
      setLogoPreview('');

      toast.success('Зміни успішно збережено');
    } catch (error) {
      console.error('Failed to update employer profile:', error);

      toast.error('Не вдалося зберегти зміни. Спробуйте ще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Інформація про компанію</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ resetForm, isSubmitting, dirty, errors, touched }) => (
          <Form className={css.form}>
            <label className={css.label}>
              <span>Назва компанії</span>

              <Field
                className={`${css.input} ${
                  touched.companyName && errors.companyName
                    ? css.inputError
                    : ''
                }`}
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
                className={`${css.input} ${
                  touched.websiteUrl && errors.websiteUrl ? css.inputError : ''
                }`}
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

              <div
                className={`${css.logoPlaceholder} ${
                  logoPreview || initialValues.logo ? css.logoLoaded : ''
                }`}>
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Логотип компанії"
                    width={304}
                    height={99}
                    className={css.logo}
                    unoptimized
                  />
                ) : initialValues.logo ? (
                  <Image
                    src={initialValues.logo}
                    alt="Логотип компанії"
                    width={304}
                    height={99}
                    className={css.logo}
                  />
                ) : (
                  <NoImage className={css.noImage} />
                )}
              </div>

              <input
                id="company-logo"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className={css.fileInput}
                onChange={handleLogoChange}
              />

              <label htmlFor="company-logo" className={css.uploadButton}>
                Завантажити файл
              </label>
            </div>

            <label className={css.label}>
              <span>Опис</span>

              <Field
                className={`${css.textarea} ${
                  touched.description && errors.description
                    ? css.inputError
                    : ''
                }`}
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
                onClick={() => {
                  resetForm();
                  setLogoFile(null);
                  setLogoPreview('');
                }}
                disabled={(!dirty && !logoFile) || isSubmitting}>
                Скинути зміни
              </button>

              <button
                type="submit"
                className={css.submitButton}
                disabled={(!dirty && !logoFile) || isSubmitting}>
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
