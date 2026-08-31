'use client';

import { useId } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';

import { CandidateProfile } from '@/types/userType';
import { updateUser } from '@/lib/userApi';

import css from './ProfileForm.module.css';
import { updateUserProfileValidationSchema } from '@/validation/authValidation';

const ProfileForm = ({ user }: { user: CandidateProfile }) => {
  const id = useId();

  const handleSubmit = async (values: CandidateProfile) => {
    try {
      await updateUser(values);
    } catch {
      toast.error('Server error');
    }
  };

  const initialValues: CandidateProfile = {
    name: user.name,
    githubUrl: user.githubUrl || '',
    linkedinUrl: user.linkedinUrl || '',
    behanceUrl: user.behanceUrl || '',
  };

  return (
    <section className={css['profile-section']}>
      <Formik
        initialValues={initialValues}
        validationSchema={updateUserProfileValidationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched, resetForm }) => (
          <Form className={css['profile-form']}>
            <div className={css.field}>
              <label htmlFor={`${id}-name`}>Імʼя</label>

              <Field
                type="text"
                id={`${id}-name`}
                name="name"
                placeholder="Ваше ім’я"
                className={
                  errors.name && touched.name ? css['error-input'] : css.input
                }
              />

              <ErrorMessage
                component="span"
                name="name"
                className={css['error-message']}
              />
            </div>

            <div className={css.field}>
              <label htmlFor={`${id}-github`}>Посилання на GitHub</label>

              <Field
                type="text"
                id={`${id}-github`}
                name="githubUrl"
                placeholder="Ваше посилання"
                className={
                  errors.githubUrl && touched.githubUrl
                    ? css['error-input']
                    : css.input
                }
              />

              <ErrorMessage
                component="span"
                name="githubUrl"
                className={css['error-message']}
              />
            </div>

            <div className={css.field}>
              <label htmlFor={`${id}-linkedin`}>Посилання на LinkedIn</label>

              <Field
                type="text"
                id={`${id}-linkedin`}
                name="linkedinUrl"
                placeholder="Ваше посилання"
                className={
                  errors.linkedinUrl && touched.linkedinUrl
                    ? css['error-input']
                    : css.input
                }
              />

              <ErrorMessage
                component="span"
                name="linkedinUrl"
                className={css['error-message']}
              />
            </div>

            <div className={css.field}>
              <label htmlFor={`${id}-behance`}>Посилання на Behance</label>

              <Field
                type="text"
                id={`${id}-behance`}
                name="behanceUrl"
                placeholder="Ваше посилання"
                className={
                  errors.behanceUrl && touched.behanceUrl
                    ? css['error-input']
                    : css.input
                }
              />

              <ErrorMessage
                component="span"
                name="behanceUrl"
                className={css['error-message']}
              />
            </div>

            <div className={css['btn-group']}>
              <button
                type="button"
                className={css['reset-btn']}
                onClick={() => resetForm()}>
                Скинути зміни
              </button>

              <button type="submit" className={css['submit-btn']}>
                Зберегти зміни
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ProfileForm;
