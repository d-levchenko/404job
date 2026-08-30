import { UserType } from '@/types/auth';
import * as Yup from 'yup';

export const RegisterValidation = (type: UserType) =>
  Yup.object().shape({
    name:
      type === 'candidate'
        ? Yup.string()
            .trim()
            .min(2, "Ім'я має бути не менше 2 символів")
            .max(32, "Ім'я має бути не більше 32 символів")
            .required("Вкажіть ім'я")
        : Yup.string(),
    companyName:
      type === 'employer'
        ? Yup.string()
            .trim()
            .min(2, 'Назва компанії має бути не менше 2 символів')
            .max(64, 'Назва компанії має бути не більше 64 символів')
            .required('Вкажіть назву компанії')
        : Yup.string(),
    email: Yup.string()
      .trim()
      .email('Електронна адреса має бути валідною, приклад: example@gmail.com')
      .max(64, 'Електронна адреса має бути не більше 64 символів')
      .required('Вкажіть електронну адресу'),
    password: Yup.string()
      .min(8, 'Пароль має бути не менше 8 символів')
      .max(128, 'Пароль має бути не більше 128 символів')
      .required('Вкажіть пароль'),
  });
