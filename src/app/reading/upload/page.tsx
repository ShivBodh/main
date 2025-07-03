
import type { Metadata } from 'next';
import UploadBookClient from '@/components/reading/UploadBookClient';

export const metadata: Metadata = {
  title: 'Upload a Book | Sanatana Peethams Portal',
  description: 'Contribute to our community library by uploading a book by an Acharya of the Shankara lineage. All submissions are reviewed by our team.',
};

export default function UploadBookPage() {
  return <UploadBookClient />;
}
