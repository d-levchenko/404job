'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import css from './CreateVacancyForm.module.css';
import { VacancyFormValues } from '@/types/vacancyType';
import { vacancyFormValidation } from '@/validation/vacancyFormValidation';
import toast from 'react-hot-toast';
import { createVacancy } from '@/lib/vacanciesApi';
import { FiltersOptions } from '../VacanciesPage/FiltersPanel/FilterFields';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import { LocationSelect } from './LocationSelect';
import type { FieldProps } from 'formik';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';

interface VacanciesProps {
  filters: FiltersOptions;
}

const CreateVacancyForm = ({ filters }: VacanciesProps) => {
  const router = useRouter();

  const initialValues = {
    title: '',
    description: '',
    requirements: '',
    duties: '',
    plusWillBe: '',
    weOffer: '',
    salaryRange: '',
    experienceLevelId: '',
    employmentTypeId: '',
    industryId: '',
    locationId: '',
    isRemote: false,
  };

  const { industries, locations, experienceLevels, employmentTypes } = filters;

  const handleSubmit = async (
    values: VacancyFormValues,
    actions: FormikHelpers<VacancyFormValues>,
  ) => {
    try {
      const vacancy = await createVacancy(values);

      toast.success('Вакансію успішно створено');
      router.push(`/vacancies/${vacancy._id}`);
      actions.resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Щось пішло не так');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={vacancyFormValidation}>
        {({ isSubmitting }) => (
          <Form className={css.createForm}>
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
                component={'span'}
                className={css.error}
              />
            </div>

            <div className={css.radioBlock}>
              <div className={css.radioGroup}>
                <span className={css.title}>Рівень кандидата</span>
                {experienceLevels.map(experience => (
                  <label key={experience._id} className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="experienceLevelId"
                      value={experience._id}
                      className={css.radioInput}
                    />

                    <SvgIcon
                      name="radio"
                      width={18}
                      height={18}
                      className={css.radioOff}
                      aria-hidden="true"
                    />

                    <SvgIcon
                      name="radioChecked"
                      width={18}
                      height={18}
                      className={css.radioOn}
                      aria-hidden="true"
                    />

                    <span>{experience.name}</span>
                  </label>
                ))}
                <ErrorMessage
                  name="experienceLevelId"
                  component={'span'}
                  className={css.error}
                />
              </div>
              <div className={css.radioGroup}>
                <span className={css.title}>Тип зайнятості</span>
                {employmentTypes.map(employment => (
                  <label key={employment._id} className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="employmentTypeId"
                      value={employment._id}
                      className={css.radioInput}
                    />

                    <SvgIcon
                      name="radio"
                      width={18}
                      height={18}
                      className={css.radioOff}
                      aria-hidden="true"
                    />

                    <SvgIcon
                      name="radioChecked"
                      width={18}
                      height={18}
                      className={css.radioOn}
                      aria-hidden="true"
                    />

                    <span>{employment.name}</span>
                  </label>
                ))}
                <ErrorMessage
                  name="employmentTypeId"
                  component={'span'}
                  className={css.error}
                />
              </div>
              <div className={css.radioGroup}>
                <span className={css.title}>Галузь</span>
                {industries.map(industry => (
                  <label key={industry._id} className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="industryId"
                      value={industry._id}
                      className={css.radioInput}
                    />

                    <SvgIcon
                      name="radio"
                      width={18}
                      height={18}
                      className={css.radioOff}
                      aria-hidden="true"
                    />

                    <SvgIcon
                      name="radioChecked"
                      width={18}
                      height={18}
                      className={css.radioOn}
                      aria-hidden="true"
                    />

                    <span>{industry.name}</span>
                  </label>
                ))}
                <ErrorMessage
                  name="industryId"
                  component={'span'}
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
                    className={`${css.inputField} ${css.highField} ${meta.touched && meta.error ? css.inputFieldError : ''}`}
                  />
                )}
              </Field>
              <ErrorMessage
                name="duties"
                component={'span'}
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
                    className={`${css.inputField} ${css.highField} ${meta.touched && meta.error ? css.inputFieldError : ''}`}
                  />
                )}
              </Field>
              <ErrorMessage
                name="plusWillBe"
                component={'span'}
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
                    className={`${css.inputField} ${css.highField} ${meta.touched && meta.error ? css.inputFieldError : ''}`}
                  />
                )}
              </Field>
              <ErrorMessage
                name="weOffer"
                component={'span'}
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
                component={'span'}
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
              <button type="reset" className={css.reset}>
                Відмінити
              </button>

              <button type="submit" className={css.search}>
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
