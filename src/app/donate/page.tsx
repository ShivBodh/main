
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartHandshake, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate & Support | Sanatana Peethams Portal',
  description: 'Support our mission to preserve and share the timeless wisdom of Sanatana Dharma. Your contribution helps maintain this portal and supports our Seva initiatives.',
};

const donationTiers = [
    { amount: '₹1,001', description: 'Supports one day of server costs.' },
    { amount: '₹5,001', description: 'Funds transcription of one discourse.' },
    { amount: '₹11,001', description: 'Aids in digitizing a rare manuscript.' },
];

const howYourDonationHelps = [
    'Maintaining and improving this digital portal.',
    'Preserving and digitizing sacred texts and manuscripts.',
    'Supporting our volunteer-driven Seva projects.',
    'Expanding our library of discourses and media.',
    'Ensuring this resource remains free and accessible to all.',
];

export default function DonatePage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <HeartHandshake className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Support Our Sacred Mission
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          This portal is a volunteer-driven Seva, a selfless service to Dharma. Your generous contribution helps us preserve this timeless wisdom and share it with the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Make a Contribution</CardTitle>
            <CardDescription>
                Choose an amount or contact us for other ways to give. Every contribution, big or small, makes a significant impact.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {donationTiers.map(tier => (
                 <div key={tier.amount} className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div>
                        <p className="font-bold text-lg text-primary">{tier.amount}</p>
                        <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                 </div>
            ))}
             <Button asChild className="w-full mt-4" size="lg">
                <Link href="/contact">
                  Donate Now
                </Link>
             </Button>
             <p className="text-xs text-center text-muted-foreground pt-2">
                You will be redirected to our contact page to arrange the donation. We are working on direct payment integration.
             </p>
          </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
            <CardTitle className="font-headline text-2xl">How Your Support Helps</CardTitle>
            <CardDescription>
                Your donation is an offering that directly fuels our mission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
                {howYourDonationHelps.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/90">{item}</span>
                    </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
