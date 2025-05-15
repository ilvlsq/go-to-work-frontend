'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import HeaderSkeleton from '@/components/ui/HeaderSkeleton';
import { getCurrentUser } from '@/services/api/api';

export default function Header() {
  const { user, setUser } = useUser();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (user === null) {
      getCurrentUser()
        .then(setUser)
        .catch(() => setUser(null));
    }
    console.log(user);
  }, [user, setUser]);

  if (!hydrated) return <HeaderSkeleton />;

  return (
    <header className="fixed left-0 right-0 top-0 z-10 bg-white p-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={'/'} className="text-lg text-black">
          <Image src={'/images/logo_1 1.png'} alt="DevFusion Logo" width={147} height={41} />
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href={'/'} className="group relative">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
              Вакансії
            </span>
          </Link>
          <Link href={'/'} className="group relative">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
              Для роботодавців
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            {user ? (
              <Link href="/profile" className="group relative">
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
                  Профіль
                </span>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="group relative">
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
                    Увійти
                  </span>
                </Link>
                <Link href="/auth/register" className="group relative">
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
                    Реєстрація
                  </span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
