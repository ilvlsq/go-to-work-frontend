import * as valid from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

const baseUserSchema = {
  email: valid
    .string()
    .min(1, 'Email обовʼязковий')
    .max(255, 'Email не може бути довшим за 255 символів')
    .regex(emailRegex, 'Введіть коректний email'),
  password: valid
    .string()
    .min(6, 'Пароль має містити мінімум 6 символів')
    .max(100, 'Пароль не може бути довшим за 100 символів'),
  confirmPassword: valid.string(),
  contactNumber: valid
    .string()
    .min(10, 'Введіть коректний номер')
    .max(20, 'Номер не може бути довшим за 20 символів')
    .regex(phoneRegex, 'Введіть коректний номер телефону'),
};

export const seekerRegisterSchema = valid
  .object({
    ...baseUserSchema,
    firstName: valid
      .string()
      .min(2, 'Введіть імʼя')
      .max(50, 'Імʼя не може бути довшим за 50 символів'),
    lastName: valid
      .string()
      .min(2, 'Введіть прізвище')
      .max(50, 'Прізвище не може бути довшим за 50 символів'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export const companyRegisterSchema = valid
  .object({
    ...baseUserSchema,
    companyName: valid
      .string()
      .min(2, 'Введіть назву компанії')
      .max(100, 'Назва компанії не може бути довшою за 100 символів'),
    companyDirection: valid
      .string()
      .min(2, 'Введіть напрямок компанії')
      .max(50, 'Напрямок компанії не може бути довшим за 50 символів'),
    companyDescription: valid
      .string()
      .max(1000, 'Опис компанії не може бути довшим за 1000 символів')
      .optional(),
    companyFoundation: valid.string().refine((date) => new Date(date) <= new Date(), {
      message: 'Дата заснування не може бути в майбутньому',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  });

export type SeekerRegisterInput = valid.infer<typeof seekerRegisterSchema>;
export type CompanyRegisterInput = valid.infer<typeof companyRegisterSchema>;
