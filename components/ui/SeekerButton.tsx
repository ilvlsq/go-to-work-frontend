'use client';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function SeekerButton() {
  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <Button variant="primary" size="medium" onClick={handleClick}>
      {user ? 'Заповнити профіль' : 'Створити акаунт'}
    </Button>
  );
}
