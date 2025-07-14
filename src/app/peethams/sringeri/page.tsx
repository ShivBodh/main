
import { peethams } from '@/lib/peethams-data';
import type { Metadata } from 'next';
import SringeriClient from '@/components/peethams/SringeriClient';

const peethamInfo = peethams.find(p => p.name.includes('Sringeri'))!;

export async function generateMetadata(): Promise<Metadata> {
  if (!peethamInfo) {
    return { title: 'Peetham Not Found' };
  }

  return {
    title: peethamInfo.name,
    description: `Learn about the ${peethamInfo.name}, the Southern Āmnāya Pīṭham. Explore its history, core teachings based on the Yajur Veda, and the sacred lineage of Acharyas.`,
  };
}

export default function SringeriPage() {
  return <SringeriClient />;
}
