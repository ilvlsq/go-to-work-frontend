'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileEditForm from './ProfileEditForm';
import { useUser } from '@/context/UserContext';
import {
  getAppliedJobs,
  getCurrentUserInfo,
  updateCurrentUserInfo,
  getJob,
} from '@/services/api/api';
import type { SeekerProfile } from '@/types/seekerProfile';
import Button from '../ui/Button';
import UserResponsesCard from './UserResponsesCard';
import type { UserResponse } from './UserResponsesCard';
import { toSlug } from '@/utils/toSlug';

export default function UserProfile() {
  const router = useRouter();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<SeekerProfile | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<{
    content: UserResponse[];
    number: number;
    totalPages: number;
  }>({ content: [], number: 0, totalPages: 1 });
  const [lastViewedJobId, setLastViewedJobId] = useState<number | null>(null);

  const fetchAppliedJobs = async (page = 0) => {
    const data = await getAppliedJobs();
    setAppliedJobs({
      content: data.content,
      number: data.number,
      totalPages: data.totalPages,
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          router.push('/');
          return;
        }
        const userInfo = await getCurrentUserInfo();
        setProfile(userInfo.data);
        await fetchAppliedJobs();
        setError(null);
      } catch (err) {
        setError('Не вдалося завантажити профіль');
        console.error('Profile fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const updateProfile = async (updatedProfile: SeekerProfile) => {
    try {
      const response = await updateCurrentUserInfo(updatedProfile);
      setProfile(response.data);
    } catch (err) {
      console.error('Profile update error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/');
  };

  const handlePageChange = (page: number) => {
    fetchAppliedJobs();
  };

  const handleVacancyClick = (jobPostId: number, title: string) => {
    setLastViewedJobId(jobPostId);
    const vacancyUrl = `/vacancy/${toSlug(title)}-${jobPostId}`;
    window.open(vacancyUrl, '_blank');
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
      <div className="mx-auto flex h-96 w-full max-w-md flex-col items-center justify-center gap-4">
        <div className="text-lg text-red-600">{error}</div>
        <Button variant="outline" onClick={handleLogout} className="w-full">
          Вийти
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-8 md:flex-row">
      <div className="flex-1">
        <div className="rounded-xl bg-white p-2 shadow-md">
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleLogout} className="w-fit">
              Вийти
            </Button>
          </div>
          <ProfileEditForm profile={profile} onProfileUpdate={updateProfile} />
        </div>
      </div>
      <div className="w-full flex-shrink-0 md:w-[420px]">
        <UserResponsesCard
          responses={appliedJobs.content}
          page={appliedJobs.number}
          totalPages={appliedJobs.totalPages}
          onPageChange={handlePageChange}
          onVacancyClick={handleVacancyClick}
          lastViewedJobId={lastViewedJobId}
        />
      </div>
    </div>
  );
}
