'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './CreateVacancyForm.module.css';

const CreateVacancyForm = () => {
  const initialValues = {};
  const handleSubmit = () => {};
  const vavncyFormSchema = Yup.object();
  return (
    <div>
      <h2>Створення вакансії</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={vavncyFormSchema}>
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
        </Form>
      </Formik>
    </div>
  );
};

export default CreateVacancyForm;
