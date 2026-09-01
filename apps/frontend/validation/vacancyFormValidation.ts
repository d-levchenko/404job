import * as Yup from 'yup';

const objectId = (fieldName: string) =>
  Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/, `${fieldName} повинен бути валідним`)
    .required(`${fieldName} є обов’язковим`);

export const vacancyFormValidation = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Мінімум 5 символи в цьому полі')
    .max(256, 'Максимум 256 символи в цьому полі')
    .required('Це поле є обов’язковим'),
  description: Yup.string()
    .min(50, 'Мінімум 50 символи в цьому полі')
    .max(4000, 'Максимум 4000 символи в цьому полі')
    .required('Це поле є обов’язковим'),
  requirements: Yup.string()
    .min(50, 'Мінімум 50 символи в цьому полі')
    .max(4000, 'Максимум 4000 символи в цьому полі')
    .required('Це поле є обов’язковим'),
  duties: Yup.string()
    .min(50, 'Мінімум 50 символи в цьому полі')
    .max(4000, 'Максимум 4000 символи в цьому полі')
    .required('Це поле є обов’язковим'),
  plusWillBe: Yup.string()
    .min(20, 'Мінімум 20 символи в цьому полі')
    .max(4000, 'Максимум 4000 символи в цьому полі')
    .optional(),
  weOffer: Yup.string()
    .min(50, 'Мінімум 50 символи в цьому полі')
    .max(4000, 'Максимум 4000 символи в цьому полі')
    .required('Це поле є обов’язковим'),
  salaryRange: Yup.string().optional(),
  experienceLevelId: objectId('Experience level ID'),
  employmentTypeId: objectId('Employment type ID'),
  industryId: objectId('Industry ID'),
  locationId: objectId('Location ID'),
  isRemote: Yup.boolean().required(
    'Поле «Віддалений» обов’язкове для заповнення',
  ),
});
