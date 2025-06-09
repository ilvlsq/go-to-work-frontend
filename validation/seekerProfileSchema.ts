import * as valid from 'zod';

export const profileSchema = valid.object({
  firstName: valid
    .string()
    .min(2, 'Введіть імʼя')
    .max(50, 'Імʼя не може бути довшим за 50 символів'),
  lastName: valid
    .string()
    .min(2, 'Введіть прізвище')
    .max(50, 'Прізвище не може бути довшим за 50 символів'),
  contactNumber: valid
    .string()
    .min(10, 'Введіть коректний номер')
    .max(20, 'Номер не може бути довшим за 20 символів')
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      'Введіть коректний номер телефону',
    ),
  email: valid
    .string()
    .min(1, 'Email обовʼязковий')
    .max(255, 'Email не може бути довшим за 255 символів')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Введіть коректний email'),
});

export const educationSchema = valid.object({
  certificateDegreeId: valid.number({ required_error: 'Оберіть ступінь/диплом' }),
  major: valid.string().min(2, 'Вкажіть спеціальність'),
  instituteOrUniversityName: valid.string().min(2, 'Вкажіть назву закладу'),
  startDate: valid.string().min(1, 'Вкажіть дату початку'),
  completionDate: valid.string().min(1, 'Вкажіть дату завершення'),
  cgpa: valid.number().min(0, 'Середній бал не може бути менше 0'),
});

export const educationArraySchema = valid.array(educationSchema);

export const experienceSchema = valid.object({
  isCurrentJob: valid.boolean(),
  startDate: valid.string().min(1, 'Вкажіть дату початку'),
  endDate: valid.string().min(1, 'Вкажіть дату завершення'),
  jobTitle: valid.string().min(2, 'Вкажіть посаду'),
  companyName: valid.string().min(2, 'Вкажіть компанію'),
  jobLocationCity: valid.string().min(2, 'Вкажіть місто'),
  jobLocationCountry: valid.string().min(2, 'Вкажіть країну'),
  description: valid.string().min(2, 'Вкажіть опис'),
});

export const experienceArraySchema = valid.array(experienceSchema);
