
import type { Metadata } from 'next';
import SevaClient from '@/components/seva/SevaClient';

export const metadata: Metadata = {
  title: 'Seva & Community Hub | Sanatana Peethams Portal',
  description: 'Find meaningful volunteer opportunities (Seva) to contribute your skills and time to the mission of preserving and propagating Dharma. Connect with our community.',
};

export default function SevaPage() {
    return <SevaClient />;
}
