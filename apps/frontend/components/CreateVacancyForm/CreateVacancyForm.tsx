'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import css from './CreateVacancyForm.module.css';
import { getFilterOptions } from '@/lib/optionsApi';
import { useEffect, useState } from 'react';
import {
  EmploymentType,
  ExperienceLevel,
  Industry,
  Location,
  VacancyFormValues,
} from '@/types/vacancyType';
import { vacancyFormValidation } from '@/validation/vacancyFormValidation';
import toast from 'react-hot-toast';
import { createVacancy } from '@/lib/vacanciesApi';

const CreateVacancyForm = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [experiences, setExperiences] = useState<ExperienceLevel[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [
          industriesData,
          experiencesData,
          locationsData,
          employmentTypesData,
        ] = await Promise.all([
          getFilterOptions('industries'),
          getFilterOptions('experienceLevels'),
          getFilterOptions('locations'),
          getFilterOptions('employmentTypes'),
        ]);

        setIndustries(industriesData);
        setExperiences(experiencesData);
        setLocations(locationsData);
        setEmploymentTypes(employmentTypesData);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to fetch options',
        );
      }
    };

    fetchOptions();
  }, []);

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
  const handleSubmit = async (
    values: VacancyFormValues,
    actions: FormikHelpers<VacancyFormValues>,
  ) => {
    try {
      await createVacancy(values);
      actions.resetForm();
      toast.success('Вакансію успішно створено');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Щось пішло не так');
    }
  };

  return (
    <div>
      <h2>Створення вакансії</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={vacancyFormValidation}>
        <Form className={css.createForm}>
          <div className={css.inputArea}>
            <label htmlFor="title">Назва вакансії</label>
            <Field
              id="title"
              type="text"
              name="title"
              placeholder="Назва вакансії"
            />
            <ErrorMessage
              name="title"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.inputArea}>
            <label htmlFor="description">Опис</label>
            <Field
              id="description"
              type="text"
              name="description"
              placeholder="Короткий опис"
            />
            <ErrorMessage
              name="description"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.inputArea}>
            <label htmlFor="requirements">Вимоги</label>
            <Field
              id="requirements"
              type="text"
              name="requirements"
              placeholder="Вимоги до кандидата"
            />
            <ErrorMessage
              name="requirements"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.radioGroup}>
            <span className={css.title}>Рівень кандидата</span>
            {experiences.map(experience => (
              <label key={experience._id} className={css.radioLabel}>
                <Field
                  type="radio"
                  name="experienceLevelId"
                  value={experience._id}
                  className={css.radioInput}
                />
                <span>{experience.name}</span>
              </label>
            ))}
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
                <span>{employment.name}</span>
              </label>
            ))}
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
                <span>{industry.name}</span>
              </label>
            ))}
          </div>

          <div className={css.inputArea}>
            <label htmlFor="title">Обовʼязки</label>
            <Field
              id="duties"
              type="text"
              name="duties"
              placeholder="Обовʼязки кандидата"
            />
            <ErrorMessage
              name="duties"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.inputArea}>
            <label htmlFor="title">Буде плюсом</label>
            <Field
              id="plusWillBe"
              type="text"
              name="plusWillBe"
              placeholder="Буде плюсом до кандидата"
            />
            <ErrorMessage
              name="plusWillBe"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.inputArea}>
            <label htmlFor="title">Ми пропонуємо</label>
            <Field
              id="weOffer"
              type="text"
              name="weOffer"
              placeholder="Ваші пропозиції кандидату"
            />
            <ErrorMessage
              name="weOffer"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.inputArea}>
            <label htmlFor="title">Зарплата</label>
            <Field
              id="salaryRange"
              type="text"
              name="salaryRange"
              placeholder="Зарплата в доларах"
            />
            <ErrorMessage
              name="salaryRange"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.inputArea}>
            <label htmlFor="locationId">Локація</label>

            <Field as="select" id="locationId" name="locationId">
              <option value="">Оберіть локацію</option>

              {locations.map(location => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </Field>
          </div>

          <div>
            <Field id="isRemote" type="checkbox" name="isRemote" />
            <label htmlFor="isRemote">Віддалено</label>
          </div>

          <button type="reset" className={css.reset}>
            Відмінити
          </button>

          <button type="submit" className={css.search}>
            Опублікувати
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateVacancyForm;
