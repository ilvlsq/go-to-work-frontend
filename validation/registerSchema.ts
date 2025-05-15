import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  email: Yup.string().email('Введіть коректний email').required('Email обовʼязковий'),
  password: Yup.string().min(6, 'Мінімум 6 символів').required('Пароль обовʼязковий'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Паролі не співпадають')
    .required('Підтвердження паролю обовʼязкове'),
  contactNumber: Yup.string().min(10, 'Введіть коректний номер').required('Номер обовʼязковий'),
  firstName: Yup.string().min(2, 'Введіть імʼя').required('Імʼя обовʼязкове'),
  lastName: Yup.string().min(2, 'Введіть прізвище').required('Прізвище обовʼязкове'),
  companyName: Yup.string(),
  companyDirection: Yup.string(),
  companyDescription: Yup.string(),
  companyFoundation: Yup.string(),
});
