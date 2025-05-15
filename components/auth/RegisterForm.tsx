'use client';

import { useState } from 'react';
import { registerUser } from '@/services/api/api';
import { Input } from '@/components/ui/Input';
import { registerSchema } from '@/validation/registerSchema';

const USER_TYPES = [
  { value: 'SEEKER ', label: 'Я шукаю роботу' },
  { value: 'COMPANY', label: 'Я компанія' },
];

export default function RegisterForm() {
  const [userType, setUserType] = useState('SEEKER');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    // seeker
    firstName: '',
    lastName: '',
    // company
    companyName: '',
    companyDirection: '',
    companyDescription: '',
    companyFoundation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await registerSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof Error && 'errors' in validationError) {
        // @ts-ignore
        setError(validationError.errors[0]);
      } else {
        setError('Сталася помилка валідації');
      }
      return;
    }

    setLoading(true);
    try {
      const userPayload = {
        email: formData.email,
        contactNumber: formData.contactNumber,
        password: formData.password,
      };
      let payload: unknown;
      if (userType === 'SEEKER') {
        payload = {
          user: userPayload,
          seeker: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        };
      } else {
        payload = {
          user: userPayload,
          company: {
            name: formData.companyName,
            businessStreamName: formData.companyDirection,
            companyDescription: formData.companyDescription,
          },
        };
      }
      await registerUser(payload);
      setSuccess(true);
    } catch (err: unknown) {
      let message = 'Сталася помилка';
      const error = err as Error & { status?: number };
      switch (error.status) {
        case 409:
          message = 'Не вдалося створити акаунт. Перевірте дані або спробуйте пізніше.';
          break;
        case 500:
          message = 'Сервер тимчасово недоступний, спробуйте пізніше';
          break;
        default:
          message = error.message || message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-8">
      <div className="flex w-full max-w-lg flex-col items-center rounded-2xl bg-secondary p-8 shadow-xl">
        {/* select user type */}
        <div className="mb-8 flex w-full justify-center gap-4">
          {USER_TYPES.map((type) => (
            <label
              key={type.value}
              className={`cursor-pointer rounded-full border px-6 py-2 text-base font-semibold shadow-sm transition-all duration-200 ${
                userType === type.value
                  ? 'border-gray-400 bg-white text-gray-700 shadow-md'
                  : 'border-gray-300 bg-gray-100 text-gray-500'
              } `}
            >
              <input
                type="radio"
                name="userType"
                value={type.value}
                checked={userType === type.value}
                onChange={() => setUserType(type.value)}
                className="sr-only"
              />
              {type.label}
            </label>
          ))}
        </div>
        <h1 className="mb-2 text-center text-3xl font-bold">Register</h1>
        <p className="mb-6 text-center text-lg">Створіть обліковий запис</p>
        {error && <div className="mb-2 w-full text-center text-red-600">{error}</div>}
        {success && (
          <div className="mb-2 w-full text-center text-green-600">Реєстрація успішна!</div>
        )}
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Електронна пошта"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {userType === 'SEEKER' && (
            <>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Ім'я"
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Прізвище"
                value={formData.lastName}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                required
                placeholder="Контактний номер"
                value={formData.contactNumber}
                onChange={handleChange}
                disabled={loading}
              />
            </>
          )}
          {userType === 'COMPANY' && (
            <>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                required
                placeholder="Назва компанії"
                value={formData.companyName}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                id="companyDirection"
                name="companyDirection"
                type="text"
                required
                placeholder="Напрямок компанії"
                value={formData.companyDirection}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                id="companyFoundation"
                name="companyFoundation"
                type="date"
                required
                placeholder="Дата заснування"
                value={formData.companyFoundation}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                required
                placeholder="Контактний номер"
                value={formData.contactNumber}
                onChange={handleChange}
                disabled={loading}
              />
              <textarea
                id="companyDescription"
                name="companyDescription"
                required
                rows={3}
                className="block w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-6 py-3 text-base placeholder-gray-400 shadow-sm placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#38b48e]"
                placeholder="Короткий опис компанії"
                value={formData.companyDescription}
                onChange={handleChange}
                disabled={loading}
              />
            </>
          )}
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="pr-12"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.1-2.727A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              placeholder="Підтвердження паролю"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className="pr-12"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.1-2.727A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-white py-3 text-lg font-bold text-gray-700 shadow-md transition hover:bg-gray-100"
            style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.08)' }}
            disabled={loading}
          >
            {loading ? 'Реєстрація...' : 'Створити'}
          </button>
        </form>
        <div className="mt-4 w-full text-center text-base">
          <a href="/auth/login" className="text-black underline hover:text-gray-600">
            У мене вже є акаунт
          </a>
        </div>
      </div>
    </div>
  );
}
