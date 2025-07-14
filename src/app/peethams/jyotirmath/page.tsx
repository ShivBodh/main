
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import JyotirmathClient from '@/components/peethams/JyotirmathClient';

const peethamInfo = peethams.find(p => p.name.includes('Jyotirmath'))!;

export async function generateMetadata(): Promise<Metadata> {
  if (!peethamInfo) {
    return { title: 'Peetham Not Found' };
  }

  return {
    title: peethamInfo.name,
    description: `Learn about the ${peethamInfo.name}, the Northern Āmnāya Pīṭham. Explore its history, core teachings based on the Atharva Veda, and the sacred lineage of Acharyas.`,
  };
}

export default function JyotirmathPage() {
  return <JyotirmathClient />;
}
