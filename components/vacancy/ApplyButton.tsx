'use client';

import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { applyToJob, hasAppliedToJob } from '@/services/api/api';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { getAuthToken } from '@/utils/auth';

interface ApplyButtonProps {
  jobId: string;
  initialApplied?: boolean;
}

export default function ApplyButton({ jobId, initialApplied = false }: ApplyButtonProps) {
  const [isApplied, setIsApplied] = useState(initialApplied);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const checkApplied = async () => {
      try {
        const applied = await hasAppliedToJob(+jobId);
        setIsApplied(applied.hasApplied);
      } catch (error) {
        console.error('Error checking applied status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkApplied();
  }, [jobId]);

  const handleApply = async () => {
    if (!user || !getAuthToken()) {
      router.push('/auth/login');
      return;
    }

    try {
      setIsLoading(true);
      await applyToJob(+jobId);
      setIsApplied(true);
    } catch (error: any) {
      console.error('Error applying to job:', error);
      if (error.status === 401) {
        router.push('/auth/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="medium"
      onClick={handleApply}
      disabled={isApplied || isLoading}
    >
      {isLoading ? 'Завантаження...' : isApplied ? 'Відгукнувся' : 'Відгукнутися'}
    </Button>
  );
}
