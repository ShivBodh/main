
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import PuriClient from '@/components/peethams/PuriClient';

const peethamInfo = peethams.find(p => p.name.includes('Puri'))!;

export async function generateMetadata(): Promise<Metadata> {
  if (!peethamInfo) {
    return { title: 'Peetham Not Found' };
  }

  return {
    title: peethamInfo.name,
    description: `Learn about the ${peethamInfo.name}, the Eastern Āmnāya Pīṭham. Explore its history, core teachings based on the Rig Veda, and the sacred lineage of Acharyas.`,
  };
}

export default function PuriPage() {
  return <PuriClient />;
}
