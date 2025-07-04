
import type { Metadata } from 'next';
import SocialClient from './SocialClient';

export const metadata: Metadata = {
  title: 'Sanatan Social | Hub',
  description: 'Your central hub for community and personal features. Connect with fellow Sanatanis, manage your profile, write in your diary, and support campaigns.',
  robots: {
    index: false,
    follow: false,
  }
};


export default function SocialPage() {
  return <SocialClient />;
}
