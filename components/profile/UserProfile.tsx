'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileEditForm from './ProfileEditForm';
import { useUser } from '@/context/UserContext';
import { getCurrentUserInfo, updateCurrentUserInfo } from '@/services/api/api';
import type { SeekerProfile } from '@/types/seekerProfile';

export default function UserProfile() {
  const router = useRouter();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<SeekerProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          router.push('/');
          return;
        }
        const response = await getCurrentUserInfo();
        setProfile(response.data);
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

  return <ProfileEditForm profile={profile} onProfileUpdate={updateProfile} />;
}
