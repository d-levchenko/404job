import * as Yup from 'yup';

export const companyProfileFormSchema = Yup.object({
  companyName: Yup.string()
    .trim()
    .min(2, 'Назва компанії має містити щонайменше 2 символи')
    .max(100, 'Назва компанії занадто довга')
    .required('Введіть назву компанії'),

  websiteUrl: Yup.string().url('Введіть коректне посилання').nullable(),

  description: Yup.string().max(2000, 'Опис занадто довгий').nullable(),
});

export const updateUserProfileValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Мінімум 2 символи в цьому полі')
    .max(32, 'Максимум 32 символи в цьому полі')
    .required('Це поле є обов’язковим'),

  githubUrl: Yup.string()
    .url('Введіть коректне посилання')
    .max(512, 'Максимум 512 символів в цьому полі')
    .optional(),

  linkedinUrl: Yup.string()
    .url('Введіть коректне посилання')
    .max(512, 'Максимум 512 символів в цьому полі')
    .optional(),

  behanceUrl: Yup.string()
    .url('Введіть коректне посилання')
    .max(512, 'Максимум 512 символів в цьому полі')
    .optional(),
});
