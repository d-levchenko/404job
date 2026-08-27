'use client';

import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './CompanyProfileForm.module.css';

const validationSchema = Yup.object({
  companyName: Yup.string()
    .min(2, 'Назва компанії має містити щонайменше 2 символи')
    .max(100, 'Назва компанії занадто довга')
    .required('Введіть назву компанії'),

  websiteUrl: Yup.string().url('Введіть коректне посилання').nullable(),

  description: Yup.string().max(2000, 'Опис занадто довгий').nullable(),
});

const initialValues = {
  companyName: '',
  websiteUrl: '',
  description: '',
  logo: '',
};

const CompanyProfileForm = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Інформація про компанію</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}>
        {({ resetForm, isSubmitting }) => (
          <Form className={css.form}>
            <label className={css.label}>
              Назва компанії
              <Field
                className={css.input}
                type="text"
                name="companyName"
                placeholder="Назва компанії"
              />
              <ErrorMessage
                name="companyName"
                component="span"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              Сайт компанії
              <Field
                className={css.input}
                type="url"
                name="websiteUrl"
                placeholder="Сайт компанії"
              />
              <ErrorMessage
                name="websiteUrl"
                component="span"
                className={css.error}
              />
            </label>

            <div className={css.label}>
              <span>Логотип</span>

              <div className={css.logoPlaceholder}>Місце для логотипу</div>

              <input type="file" accept="image/*" />
            </div>

            <label className={css.label}>
              Опис
              <Field
                className={css.textarea}
                as="textarea"
                name="description"
                placeholder="Короткий опис"
              />
              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </label>

            <div className={css.actions}>
              <button
                type="button"
                onClick={() => resetForm()}
                className={css.resetButton}>
                Скинути зміни
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}>
                Зберегти зміни
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyProfileForm;
