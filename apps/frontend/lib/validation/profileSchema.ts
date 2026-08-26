import * as Yup from 'yup';

const linkField = (network: string) =>
  Yup.string()
    .trim()
    .url(`Введіть коректне посилання на ${network}`)
    .max(200, 'Максимум 200 символів');

export const profileSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Мінімум 2 символи')
    .max(50, 'Максимум 50 символів')
    .required('Введіть ім’я'),
  githubUrl: linkField('GitHub'),
  linkedinUrl: linkField('LinkedIn'),
  behanceUrl: linkField('Behance'),
});
