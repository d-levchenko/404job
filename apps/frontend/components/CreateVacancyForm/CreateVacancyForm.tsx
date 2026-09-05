'use client';

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  type FieldProps,
  type FormikHelpers,
} from 'formik';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import css from './CreateVacancyForm.module.css';
import type { VacancyFormValues } from '@/types/vacancyType';
import { vacancyFormValidation } from '@/validation/vacancyFormValidation';
import { createVacancy } from '@/lib/vacanciesApi';
import type { FiltersOptions } from '../VacanciesPage/FiltersPanel/FilterFields';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import { LocationSelect } from './LocationSelect';
import Loader from '@/components/Loader/Loader';
import { useVacancyDraftStore } from '@/store/vacancyDraftStore';

interface VacanciesProps {
  filters: FiltersOptions;
}

const SaveVacancyDraft = () => {
  const { values } = useFormikContext<VacancyFormValues>();
  const setDraft = useVacancyDraftStore(state => state.setDraft);

  useEffect(() => {
    setDraft(values);
  }, [values, setDraft]);

  return null;
};

const CreateVacancyForm = ({ filters }: VacanciesProps) => {
  const router = useRouter();

  const draft = useVacancyDraftStore(state => state.draft);
  const clearDraft = useVacancyDraftStore(state => state.clearDraft);
  const hasHydrated = useVacancyDraftStore(state => state.hasHydrated);

  const { industries, locations, experienceLevels, employmentTypes } = filters;

  const handleSubmit = async (
    values: VacancyFormValues,
    actions: FormikHelpers<VacancyFormValues>,
  ) => {
    try {
      const vacancy = await createVacancy(values);

      clearDraft();
      toast.success('Вакансію успішно створено');
      router.push(`/vacancies/${vacancy._id}`);
    } catch {
      toast.error('Щось пішло не так, вакансія не створена');
      actions.setSubmitting(false);
    }
  };

  const handleCancel = () => {
    clearDraft();
    router.back();
  };

  if (!hasHydrated) {
    return null;
  }

  return (
    <div>
      <Formik
        initialValues={draft}
        enableReinitialize
        validationSchema={vacancyFormValidation}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={css.createForm}>
            <SaveVacancyDraft />

            {isSubmitting && <Loader />}

            <div className={css.inputArea}>
              <label htmlFor="title" className={css.inputLabel}>
                Назва вакансії
              </label>

              <Field name="title">
                {({ field, meta }: FieldProps<string>) => (
                  <input
                    {...field}
                    id="title"
                    type="text"
                    placeholder="Назва вакансії"
                    className={`${css.inputField} ${
                      meta.touched && meta.error ? css.inputFieldError : ''
                    }`}
                  />
                )}
              </Field>

              <ErrorMessage
                name="title"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.inputArea}>
              <label htmlFor="description" className={css.inputLabel}>
                Опис
              </label>

              <Field name="description">
                {({ field, meta }: FieldProps<string>) => (
                  <textarea
                    {...field}
                    id="description"
                    placeholder="Короткий опис"
                    className={`${css.inputField} ${css.highField} ${
                      meta.touched && meta.error ? css.inputFieldError : ''
                    }`}
                  />
                )}
              </Field>

              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.inputArea}>
              <label htmlFor="requirements" className={css.inputLabel}>
                Вимоги
              </label>

              <Field name="requirements">
                {({ field, meta }: FieldProps<string>) => (
                  <textarea
                    {...field}
                    id="requirements"
                    placeholder="Вимоги до кандидата"
                    className={`${css.inputField} ${css.highField} ${
                      meta.touched && meta.error ? css.inputFieldError : ''
                    }`}
                  />
                )}
              </Field>

              <ErrorMessage
                name="requirements"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.radioBlock}>
              <div className={css.radioGroup}>
                <span className={css.title}>Рівень кандидата</span>

                {experienceLevels.map(experience => (
                  <label key={experience._id} className={css.radioLabel}>
                    <div className={css.radiowrapper}>
                      <Field
                        type="radio"
                        name="experienceLevelId"
                        value={experience._id}
                        className={css.radioInput}
                      />

                      <SvgIcon
                        name="radioChecked"
                        width={18}
                        height={18}
                        className={css.radio}
                        aria-hidden="true"
                      />
                    </div>

                    <span>{experience.name}</span>
                  </label>
                ))}

                <ErrorMessage
                  name="experienceLevelId"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.radioGroup}>
                <span className={css.title}>Тип зайнятості</span>

                {employmentTypes.map(employment => (
                  <label key={employment._id} className={css.radioLabel}>
                    <div className={css.radiowrapper}>
                      <Field
                        type="radio"
                        name="employmentTypeId"
                        value={employment._id}
                        className={css.radioInput}
                      />

                      <SvgIcon
                        name="radioChecked"
                        width={18}
                        height={18}
                        className={css.radio}
                        aria-hidden="true"
                      />
                    </div>

                    <span>{employment.name}</span>
                  </label>
                ))}

                <ErrorMessage
                  name="employmentTypeId"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.radioGroup}>
                <span className={css.title}>Галузь</span>

                {industries.map(industry => (
                  <label key={industry._id} className={css.radioLabel}>
                    <div className={css.radiowrapper}>
                      <Field
                        type="radio"
                        name="industryId"
                        value={industry._id}
                        className={css.radioInput}
                      />

                      <SvgIcon
                        name="radioChecked"
                        width={18}
                        height={18}
                        className={css.radio}
                        aria-hidden="true"
                      />
                    </div>

                    <span>{industry.name}</span>
                  </label>
                ))}

                <ErrorMessage
                  name="industryId"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.inputArea}>
              <label htmlFor="duties" className={css.inputLabel}>
                Обовʼязки
              </label>

              <Field name="duties">
                {({ field, meta }: FieldProps<string>) => (
                  <textarea
                    {...field}
                    id="duties"
                    placeholder="Обовʼязки кандидата"
                    className={`${css.inputField} ${css.highField} ${
                      meta.touched && meta.error ? css.inputFieldError : ''
                    }`}
                  />
                )}
              </Field>

              <ErrorMessage
                name="duties"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.inputArea}>
              <label htmlFor="plusWillBe" className={css.inputLabel}>
                Буде плюсом
              </label>

              <Field name="plusWillBe">
                {({ field, meta }: FieldProps<string>) => (
                  <textarea
                    {...field}
                    id="plusWillBe"
                    placeholder="Буде плюсом до кандидата"
                    className={`${css.inputField} ${css.highField} ${
                      meta.touched && meta.error ? css.inputFieldError : ''
                    }`}
                  />
                )}
              </Field>

              <ErrorMessage
                name="plusWillBe"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.inputArea}>
              <label htmlFor="weOffer" className={css.inputLabel}>
                Ми пропонуємо
              </label>

              <Field name="weOffer">
                {({ field, meta }: FieldProps<string>) => (
                  <textarea
                    {...field}
                    id="weOffer"
                    placeholder="Ваші пропозиції кандидату"
                    className={`${css.inputField} ${css.highField} ${
                      meta.touched && meta.error ? css.inputFieldError : ''
                    }`}
                  />
                )}
              </Field>

              <ErrorMessage
                name="weOffer"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.inputArea}>
              <label htmlFor="salaryRange" className={css.inputLabel}>
                Зарплата
              </label>

              <Field name="salaryRange">
                {({ field, meta }: FieldProps<string>) => (
                  <input
                    {...field}
                    id="salaryRange"
                    type="text"
                    placeholder="Зарплата в доларах"
                    className={`${css.inputField} ${
                      meta.touched && meta.error ? css.inputFieldError : ''
                    }`}
                  />
                )}
              </Field>

              <ErrorMessage
                name="salaryRange"
                component="span"
                className={css.error}
              />
            </div>

            <LocationSelect locations={locations} />

            <label htmlFor="isRemote" className={css.checkboxLabel}>
              <div className={css.checkboxWrapper}>
                <Field
                  id="isRemote"
                  type="checkbox"
                  name="isRemote"
                  className={css.checkboxInput}
                />

                <SvgIcon
                  name="checkbox"
                  width={20}
                  height={20}
                  className={css.checkboxIcon}
                  aria-hidden="true"
                />
              </div>

              <span>Віддалено</span>
            </label>

            <div className={css.buttons}>
              <button
                type="button"
                className={css.reset}
                onClick={handleCancel}>
                Відмінити
              </button>

              <button
                type="submit"
                className={css.search}
                disabled={isSubmitting}>
                {isSubmitting ? 'Публікуємо…' : 'Опублікувати'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateVacancyForm;
