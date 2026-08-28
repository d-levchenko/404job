'use client';

import { useId } from 'react';
import css from './ProfileForm.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ProfileValidation {
  name: string;
  githubUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
}

interface User {
  name: string;
  githubUrl?: string;
  linkedinUrl?: string;
  behanceUrl?: string;
}

const validationSchema = Yup.object({
  name: Yup.string().min(2).max(32).required(),
  githubUrl: Yup.string().url().max(512).optional(),
  linkedinUrl: Yup.string().url().max(512).optional(),
  behanceUrl: Yup.string().url().max(512).optional(),
});

const ProfileForm = ({ user }: { user: User }) => {
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
    <section className={css['profile-form']}>
      <h2>Особиста інформація</h2>

      <Formik
        initialValues={initialValues}

        onSubmit={handleSubmit}

        validationSchema={validationSchema}>
        {({ errors, touched, resetForm }) => {
          return (
            <Form>
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

              <button
                type="button"
                onClick={() => {
                  resetForm();
                }}>
                Скинути зміни
              </button>
              <button type="submit">Зберегти зміни</button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default ProfileForm;
