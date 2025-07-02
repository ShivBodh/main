import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connect with Us | Sanatana Peethams Portal',
  description: 'Contact the Sanatana Peethams Portal team. We welcome your questions, feedback, and participation in this Seva.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">
          Connect with Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
          We welcome your questions, feedback, and participation in this Seva. Please feel free to reach out to us.
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <div className="flex items-center gap-4">
            <Phone className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground/90">फ़ोन: </span>
              <a href="tel:8858885319" className="text-foreground/90 hover:text-primary">
                88-5888-5319
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <span className="font-medium text-foreground/90">ई-मेल: </span>
              <a href="mailto:shivbodh@shivala.info" className="text-foreground/90 hover:text-primary">
                shivbodh@shivala.info
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-16 text-center max-w-3xl mx-auto p-8 bg-card rounded-lg border">
            <h2 className="text-2xl font-headline font-bold text-primary">A Note on Communication</h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
                This portal is managed by a team of dedicated volunteers. We strive to respond to all inquiries as promptly as possible. Your patience and understanding are greatly appreciated. Thank you for being a part of this sacred mission.
            </p>
        </div>

    </div>
  );
}
