'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useUser } from '@/context/UserContext';

export default function ResumeCreatorButton() {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <Button variant="primary" size="medium" className="mt-6" onClick={handleClick}>
      {user ? 'Завантажити CV' : 'Увійти/Зареєструватися'}
    </Button>
  );
}
