
import GalleryClient from '@/components/gallery/GalleryClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'A rich, chronological gallery of photos from the events, festivals, and daily life of the four cardinal Shankaracharya Peethams: Sringeri, Dwaraka, Puri, and Jyotirmath.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
