
import GalleryClient from '@/components/gallery/GalleryClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Sanatana Peethams Portal',
  description: 'Explore a rich, chronological gallery of photos from the events and daily life of the four cardinal Peethams.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
