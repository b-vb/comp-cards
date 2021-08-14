import { useRouter } from 'next/router';
import { Session } from 'next-auth';

export default function useProtectedRoute(session: Session | null) {
  const router = useRouter();

  if (!session && typeof window !== 'undefined') {
    return router.push('/login');
  }
}
