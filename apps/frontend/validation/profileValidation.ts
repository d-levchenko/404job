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
