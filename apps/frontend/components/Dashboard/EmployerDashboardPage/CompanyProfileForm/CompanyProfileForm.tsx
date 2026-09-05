'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import toast from 'react-hot-toast';

import NoImage from '@/assets/no-image.svg';
import Loader from '@/components/Loader/Loader';
import {
  type EmployerProfile,
  getCurrentUser,
  updateEmployerProfile,
} from '@/lib/usersApi';
import { companyProfileFormSchema } from '@/validation/profileValidation';

import css from './CompanyProfileForm.module.css';

const emptyValues: EmployerProfile = {
  companyName: '',
  websiteUrl: '',
  logo: '',
  description: '',
};

const CompanyProfileForm = () => {
  const [initialValues, setInitialValues] =
    useState<EmployerProfile>(emptyValues);

  const [isLoading, setIsLoading] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

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
      } catch {
        toast.error('Не вдалося завантажити дані компанії.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleSubmit = async (
    values: EmployerProfile,
    { setSubmitting, resetForm }: FormikHelpers<EmployerProfile>,
  ) => {
    try {
      const formData = new FormData();

      formData.append('companyName', values.companyName ?? '');
      formData.append('websiteUrl', values.websiteUrl ?? '');
      formData.append('description', values.description ?? '');

      if (logoFile) {
        formData.append('logo', logoFile);
      }

      const updatedUser = await updateEmployerProfile(formData);

      const updatedValues: EmployerProfile = {
        companyName: updatedUser.companyName ?? '',
        websiteUrl: updatedUser.websiteUrl ?? '',
        logo: updatedUser.logo ?? '',
        description: updatedUser.description ?? '',
      };

      setInitialValues(updatedValues);

      resetForm({
        values: updatedValues,
      });

      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }

      setLogoFile(null);
      setLogoPreview('');

      toast.success('Зміни успішно збережено');
    } catch {
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
        validationSchema={companyProfileFormSchema}
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

                  if (logoPreview) {
                    URL.revokeObjectURL(logoPreview);
                  }

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
