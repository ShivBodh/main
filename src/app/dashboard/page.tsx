
import type { Metadata } from 'next';
import DashboardClient from '@/components/dashboard/DashboardClient';

// This page is not for public consumption and should not be indexed.
export const metadata: Metadata = {
  title: 'Dashboard | Sanatana Peethams Portal',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
