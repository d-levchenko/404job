'use client';

import { useId } from 'react';
import css from './ProfileForm.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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

const validationSchema = Yup.object({
  name: Yup.string().min(2).max(32).required(),
  githubUrl: Yup.string().url().max(512).optional(),
  linkedinUrl: Yup.string().url().max(512).optional(),
  behanceUrl: Yup.string().url().max(512).optional(),
});

const ProfileForm = ({ user }: ProfileFormProps) => {
  const id = useId();

  const handleSubmit = (values: ProfileValidation) => {
    console.log(values);

    //   ДАЛІ ЛОГІКА ЗАПИТУ
  };

  const initialValues: ProfileValidation = {
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
