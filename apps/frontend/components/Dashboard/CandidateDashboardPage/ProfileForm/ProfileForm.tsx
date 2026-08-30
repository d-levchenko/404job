'use client';

import { useId } from 'react';
import css from './ProfileForm.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
<<<<<<< HEAD
import { CandidateProfile } from '@/types/userType';
import { updateUser } from '@/lib/userApi';
import toast from 'react-hot-toast';
=======
import { type UpdateProfileData } from '@/types/auth';

interface ProfileValidation {
  name: string;
  githubUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
}

interface ProfileFormProps {
  user: UpdateProfileData;
}
>>>>>>> origin/feature/login-page

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Мінімум 2 символи в цьому полі')
    .max(32, 'Максимум 32 символи в цьому полі')
    .required('Це поле є обов’язковим'),
  githubUrl: Yup.string()
    .url()
    .max(512, 'Максимум 512 символів в цьому полі')
    .optional(),
  linkedinUrl: Yup.string()
    .url()
    .max(512, 'Максимум 512 символів в цьому полі')
    .optional(),
  behanceUrl: Yup.string()
    .url()
    .max(512, 'Максимум 512 символів в цьому полі')
    .optional(),
});

<<<<<<< HEAD
const ProfileForm = ({ user }: { user: CandidateProfile }) => {
=======
const ProfileForm = ({ user }: ProfileFormProps) => {
>>>>>>> origin/feature/login-page
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

        onSubmit={handleSubmit}

        validationSchema={validationSchema}>
        {({ errors, touched, resetForm }) => {
          return (
            <Form className={css['profile-form']}>
              <h2 className={css['title-form']}>Особиста інформація</h2>
              <div>
                <label htmlFor={`${id}-name`}>Імʼя</label>
                <Field
                  type="text"
                  id={`${id}-name`}
                  placeholder="Ваше ім’я"
                  name="name"
                  className={
                    errors.name && touched.name
                      ? css['error-input']
                      : css['input']
                  }
                />

                <ErrorMessage
                  component="span"
                  name="name"
                  className={css['error-message']}
                />
              </div>

              <div>
                <label htmlFor={`${id}-github`}>Посилання на GitHub</label>
                <Field
                  type="text"
                  id={`${id}-github`}
                  placeholder="Ваше посилання"
                  name="githubUrl"
                  className={
                    errors.githubUrl && touched.githubUrl
                      ? css['error-input']
                      : css['input']
                  }
                />

                <ErrorMessage
                  component="span"
                  name="githubUrl"
                  className={css['error-message']}
                />
              </div>

              <div>
                <label htmlFor={`${id}-linkedin`}>Посилання на LinkedIn</label>
                <Field
                  type="text"
                  id={`${id}-linkedin`}
                  placeholder="Ваше посилання"
                  name="linkedinUrl"
                  className={
                    errors.linkedinUrl && touched.linkedinUrl
                      ? css['error-input']
                      : css['input']
                  }
                />

                <ErrorMessage
                  component="span"
                  name="linkedinUrl"
                  className={css['error-message']}
                />
              </div>

              <div>
                <label htmlFor={`${id}-behance`}>Посилання на Behance</label>
                <Field
                  type="text"
                  id={`${id}-behance`}
                  placeholder="Ваше посилання"
                  name="behanceUrl"
                  className={
                    errors.behanceUrl && touched.behanceUrl
                      ? css['error-input']
                      : css['input']
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
                  className={css['reset-btn']}
                  type="button"
                  onClick={() => {
                    resetForm();
                  }}>
                  Скинути зміни
                </button>
                <button type="submit" className={css['submit-btn']}>
                  Зберегти зміни
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default ProfileForm;
