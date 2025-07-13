
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Play Pasha | Sanatan Social',
  description: 'Play a game of Pasha against Bodhi AI.',
  robots: {
    index: false,
    follow: false,
  }
};

const LudoClient = dynamic(() => import('@/components/games/LudoClient'), {
  ssr: false,
  loading: () => (
     <div className="container mx-auto max-w-7xl py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <main className="lg:col-span-2">
                <Skeleton className="h-[80vh] w-full" />
            </main>
            <aside className="lg:col-span-1 space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-96 w-full" />
            </aside>
        </div>
    </div>
  ),
});


export default function LudoPage() {
  return <LudoClient />;
}
