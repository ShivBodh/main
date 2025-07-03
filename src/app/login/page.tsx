
import type { Metadata } from 'next';
import LoginClient from '@/components/auth/LoginClient';

export const metadata: Metadata = {
  title: 'Login | Sanatana Peethams Portal',
  description: 'Sign in to the Sanatana Peethams Portal to access your personal dashboard and community features.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
