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

interface VacanciesProps {
  filters: FiltersOptions;
}

const CreateVacancyForm = ({ filters }: VacanciesProps) => {
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
      await createVacancy(values);
      actions.resetForm();
      toast.success('Вакансію успішно створено');
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
        <Form className={css.createForm}>
          <div className={css.inputArea}>
            <label htmlFor="title" className={css.inputLabel}>
              Назва вакансії
            </label>
            <Field
              id="title"
              type="text"
              name="title"
              placeholder="Назва вакансії"
              className={css.inputField}
            />
            <ErrorMessage
              name="title"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.inputArea}>
            <label htmlFor="description" className={css.inputLabel}>
              Опис
            </label>
            <Field
              id="description"
              as="textarea"
              name="description"
              placeholder="Короткий опис"
              className={`${css.inputField} ${css.highField}`}
            />
            <ErrorMessage
              name="description"
              component={'span'}
              className={css.error}
            />
          </div>

          <div className={css.inputArea}>
            <label htmlFor="requirements" className={css.inputLabel}>
              Вимоги
            </label>
            <Field
              id="requirements"
              as="textarea"
              name="requirements"
              placeholder="Вимоги до кандидата"
              className={`${css.inputField} ${css.highField}`}
            />
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
            <Field
              id="duties"
              as="textarea"
              name="duties"
              placeholder="Обовʼязки кандидата"
              className={`${css.inputField} ${css.highField}`}
            />
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
            <Field
              id="plusWillBe"
              as="textarea"
              name="plusWillBe"
              placeholder="Буде плюсом до кандидата"
              className={`${css.inputField} ${css.highField}`}
            />
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
            <Field
              id="weOffer"
              as="textarea"
              name="weOffer"
              placeholder="Ваші пропозиції кандидату"
              className={`${css.inputField} ${css.highField}`}
            />
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
            <Field
              id="salaryRange"
              type="text"
              name="salaryRange"
              placeholder="Зарплата в доларах"
              className={css.inputField}
            />
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
              Опублікувати
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateVacancyForm;
