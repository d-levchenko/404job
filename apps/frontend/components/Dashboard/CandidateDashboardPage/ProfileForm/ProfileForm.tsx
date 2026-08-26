'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { PROFILE_FIELDS } from '@/constants/profileFields';
import { getProfile, updateProfile } from '@/lib/api/profile';
import { profileSchema } from '@/lib/validation/profileSchema';
import type { UpdateProfilePayload } from '@/types/user';

const ProfileForm = () => {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isPending,
    isError,
  } = useQuery({ queryKey: ['profile'], queryFn: getProfile });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Зміни збережено');
    },
    onError: () => {
      toast.error('Не вдалося зберегти зміни. Спробуйте ще раз');
    },
  });

  const initialValues: UpdateProfilePayload = {
    name: profile?.name ?? '',
    githubUrl: profile?.githubUrl ?? '',
    linkedinUrl: profile?.linkedinUrl ?? '',
    behanceUrl: profile?.behanceUrl ?? '',
  };

  return (
    <div className="flex w-full flex-col gap-4 md:w-[640px]">
      <h2 className="text-[18px]/[27px] font-bold text-black desktop:text-[20px]/[30px]">
        Особиста інформація
      </h2>

      {isPending && (
        <span
          role="status"
          aria-label="Завантаження профілю"
          className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent"
        />
      )}

      {isError && (
        <p className="text-[14px]/[21px] text-error desktop:text-[16px]/[24px]">
          Не вдалося завантажити дані профілю
        </p>
      )}

      {profile && (
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          enableReinitialize
          onSubmit={values => mutation.mutate(values)}>
          {({ errors, touched, resetForm }) => (
            <Form className="flex flex-col gap-4" noValidate>
              {PROFILE_FIELDS.map(field => {
                const hasError = Boolean(
                  touched[field.name] && errors[field.name],
                );

                return (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.name}
                      className="text-[14px]/[21px] text-black desktop:text-[16px]/[24px]">
                      {field.label}
                    </label>
                    <Field
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder={field.placeholder}
                      aria-invalid={hasError}
                      aria-describedby={
                        hasError ? `${field.name}-error` : undefined
                      }
                      className={`h-10 w-full rounded-[32px] border bg-transparent px-4 py-2 text-[14px]/[21px] outline-none placeholder:text-black/60 desktop:text-[16px]/[24px] ${
                        hasError
                          ? 'border-error text-error'
                          : 'border-black text-black focus:border-primary'
                      }`}
                    />
                    {hasError && (
                      <p
                        id={`${field.name}-error`}
                        className="pl-4 text-[14px]/[21px] text-error">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-col gap-4 md:flex-row">
                <button
                  type="button"
                  onClick={() => resetForm()}
                  disabled={mutation.isPending}
                  className="flex items-center justify-center gap-2 rounded-full border border-black px-3 py-1.5 text-[14px]/[21px] font-medium text-black hover:bg-primary hover:text-white active:bg-secondary-active active:text-white disabled:pointer-events-none disabled:opacity-30 md:w-auto desktop:text-[16px]/[24px]">
                  Скинути зміни
                </button>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-3 py-1.5 text-[14px]/[21px] font-medium text-white hover:bg-primary-light hover:text-black active:bg-primary-active active:text-black disabled:pointer-events-none disabled:opacity-30 md:w-auto desktop:text-[16px]/[24px]">
                  {mutation.isPending && (
                    <span
                      role="status"
                      aria-label="Збереження"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    />
                  )}
                  Зберегти зміни
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ProfileForm;
