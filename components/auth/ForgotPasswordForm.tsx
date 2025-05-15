'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log('Password reset attempt:', { email });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="sr-only">
          Email адреса
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="focus:ring-primary focus:border-primary relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm"
          placeholder="Email адреса"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark focus:ring-primary group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Надіслати інструкції
        </button>
      </div>

      <div className="text-center text-sm">
        <Link href="/auth/login" className="text-primary hover:text-primary-dark font-medium">
          Повернутися до входу
        </Link>
      </div>
    </form>
  );
}
