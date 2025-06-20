'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser, getCurrentUser } from '@/services/api/api';
import { useUser } from '@/context/UserContext';
import { Input } from '@/components/ui/Input';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.replace('/');
      }, 500);
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await loginUser({ email, password });
      const userData = await getCurrentUser();

      setUser(userData);
      setSuccess(true);
    } catch (err: unknown) {
      let message = 'Сталася помилка';
      const error = err as Error & { status?: number };
      switch (error.status) {
        case 401:
        case 403:
          message = 'Не вдалося увійти. Перевірте дані або спробуйте пізніше.';
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
        <h1 className="mb-2 text-center text-3xl font-bold">Вхід</h1>
        <p className="mb-6 text-center text-lg">Увійдіть у свій обліковий запис</p>
        {error && <div className="mb-2 w-full text-center text-red-600">{error}</div>}
        {success && <div className="mb-2 w-full text-center text-green-600">Вхід успішний!</div>}
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Електронна пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>
        <div className="mt-4 w-full text-center text-base">
          <Link href="/auth/register" className="text-black underline hover:text-gray-600">
            Створити новий обліковий запис
          </Link>
        </div>
      </div>
    </div>
  );
}
