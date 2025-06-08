'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/api/api';

const mockProfile = {
  fullName: 'Джон Смит',
  city: 'Київ',
  email: 'john.smith2000@gmail.com',
  phone: '+380950093334',
  position: 'Fullstack Developer',
  experience: '5+ років',
  company: 'DataArt',
  about:
    'Welcome to Insiders, your destination for transformative project solutions. As a global entity located in Ukraine, we transcend traditional expectations. Our fast-growing company based in Lviv is seeking an in-office Trainee/Junior and Junior+/Middle Full Stack Developer...',
  languages: [
    { name: 'Англійська', level: 'B1' },
    { name: 'Українська', level: 'C2' },
    { name: 'Німецька', level: 'A2' },
  ],
  education: [
    {
      university: 'Херсонський національний технічний університет',
      degree: 'Вища',
      specialty: 'Інженер-програміст',
      start: '2021 р.',
      end: '2025 р.',
    },
  ],
  courses: [
    {
      name: 'Повний курс по JavaScript + React - с нуля до результата',
      end: '2023 р.',
      certificate: true,
      about:
        'Welcome to Insiders, your destination for transformative project solutions. As a global entity located in Ukraine, we transcend traditional expectations. Our fast-growing company based in Lviv is seeking an in-office Trainee/Junior and Junior+/Middle Full Stack Developer...',
    },
  ],
};

export default function UserProfile() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          router.push('/');
          return;
        }

        await getCurrentUser();
        setError(null);
      } catch (err) {
        setError('Не вдалося завантажити профіль');
        console.error('Profile fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router, setUser]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg">Завантаження...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-8 rounded-xl bg-white p-8 shadow-md">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">Профіль користувача</h1>
        <Button variant="primary" onClick={handleLogout}>
          Вийти
        </Button>
      </div>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-2 font-semibold">Особиста інформація</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="font-medium">Ім'я та прізвище:</span> {mockProfile.fullName}
            </li>
            <li>
              <span className="font-medium">Місце проживання:</span> {mockProfile.city}
            </li>
            <li>
              <span className="font-medium">Ел. пошта:</span> {mockProfile.email}
            </li>
            <li>
              <span className="font-medium">Телефон:</span> {mockProfile.phone}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Досвід роботи</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="font-medium">Посада:</span> {mockProfile.position}
            </li>
            <li>
              <span className="font-medium">Досвід:</span> {mockProfile.experience}
            </li>
            <li>
              <span className="font-medium">Назва компанії:</span> {mockProfile.company}
            </li>
            <li>
              <span className="font-medium">Опис досвіду:</span>{' '}
              <span className="mt-1 block text-gray-500">{mockProfile.about}</span>
            </li>
          </ul>
        </div>
      </section>
      {/* Знання мов */}
      <section>
        <h2 className="mb-2 font-semibold">Знання мов</h2>
        <ul className="flex flex-wrap gap-4">
          {mockProfile.languages.map((lang) => (
            <li
              key={lang.name}
              className="flex items-center gap-2 rounded bg-gray-100 px-3 py-1 text-sm"
            >
              <span>{lang.name}</span>
              <span className="text-xs text-gray-500">{lang.level}</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Освіта */}
      <section>
        <h2 className="mb-2 font-semibold">Освіта</h2>
        <ul className="space-y-2">
          {mockProfile.education.map((edu, idx) => (
            <li key={idx} className="rounded bg-gray-50 p-3">
              <div className="font-medium">{edu.university}</div>
              <div className="text-sm">
                {edu.degree}, {edu.specialty}
              </div>
              <div className="text-xs text-gray-500">
                {edu.start} — {edu.end}
              </div>
            </li>
          ))}
        </ul>
      </section>
      {/* Курси, тренінги, сертифікати */}
      <section>
        <h2 className="mb-2 font-semibold">Курси, тренінги, сертифікати</h2>
        <ul className="space-y-2">
          {mockProfile.courses.map((course, idx) => (
            <li key={idx} className="rounded bg-gray-50 p-3">
              <div className="font-medium">{course.name}</div>
              <div className="text-xs text-gray-500">Закінчення: {course.end}</div>
              {course.certificate && (
                <div className="text-xs font-semibold text-green-600">Отриманий сертифікат</div>
              )}
              <div className="mt-1 text-sm">{course.about}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
