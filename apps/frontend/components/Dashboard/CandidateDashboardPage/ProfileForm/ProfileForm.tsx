'use client';

import { useId } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';

import Loader from '@/components/Loader/Loader';
import { getCurrentCandidate, updateUser } from '@/lib/userApi';
import { updateUserProfileValidationSchema } from '@/validation/profileValidation';

import css from './ProfileForm.module.css';
import { UpdateProfileData } from '@/types/auth';

const ProfileForm = () => {
  const id = useId();
  const queryClient = useQueryClient();

  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentCandidate,
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Зміни збережено');
    },
    onError: error => {
      toast.error(
        (isAxiosError(error) && error.response?.data?.message) ||
          'Не вдалося зберегти зміни',
      );
    },
  });

  if (isPending) return <Loader />;

  if (isError || !user) {
    return <p>Не вдалося завантажити дані профілю</p>;
  }

  const initialValues: UpdateProfileData = {
    name: user.name,
    githubUrl: user.githubUrl || '',
    linkedinUrl: user.linkedinUrl || '',
    behanceUrl: user.behanceUrl || '',
  };

  return (
    <section className={css['profile-section']}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={updateUserProfileValidationSchema}
        onSubmit={values => mutation.mutate(values)}>
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
                disabled={mutation.isPending}
                onClick={() => resetForm()}>
                Скинути зміни
              </button>

              <button
                type="submit"
                className={css['submit-btn']}
                disabled={mutation.isPending}>
                {mutation.isPending ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ProfileForm;
