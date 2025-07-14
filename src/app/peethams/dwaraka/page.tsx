
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import DwarakaClient from '@/components/peethams/DwarakaClient';

const peethamInfo = peethams.find(p => p.name.includes('Dwaraka'))!;

export async function generateMetadata(): Promise<Metadata> {
  if (!peethamInfo) {
    return { title: 'Peetham Not Found' };
  }

  return {
    title: peethamInfo.name,
    description: `Learn about the ${peethamInfo.name}, the Western Āmnāya Pīṭham. Explore its history, core teachings based on the Sama Veda, and the sacred lineage of Acharyas.`,
  };
}

export default function DwarakaPage() {
  return <DwarakaClient />;
}
