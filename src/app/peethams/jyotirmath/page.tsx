
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import JyotirmathClient from '@/components/peethams/JyotirmathClient';
import Image from 'next/image';

const peethamInfo = peethams.find(p => p.name.includes('Jyotirmath'))!;

export async function generateMetadata(): Promise<Metadata> {
  if (!peethamInfo) {
    return { title: 'Peetham Not Found' };
  }

  return {
    title: peethamInfo.name,
    description: `Learn about the ${peethamInfo.name}, the Northern Āmnāya Pīṭham. Explore its history, core teachings based on the Atharva Veda, and the sacred lineage of Acharyas.`,
    openGraph: {
        images: [
            {
                url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHU2a2w2Z3RtamhxcjQ2ZDE0djMybDVxZ3h5d3J0aXh4aWViOTZqMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs7SYIm3aJeA_i6Y/giphy.gif',
                width: 480,
                height: 480,
                alt: 'Abstract light GIF',
            },
        ],
    }
  };
}

export default function JyotirmathPage() {
  return <JyotirmathClient />;
}
