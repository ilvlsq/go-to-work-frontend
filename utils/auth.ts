import { useUser } from '@/context/UserContext';

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

export function clearAuthData(): void {
  const { setUser } = useUser();

  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('chat_messages');
    setUser(null);
  }
}
