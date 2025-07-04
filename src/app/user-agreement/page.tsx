import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Agreement | Sanatana Peethams Portal',
  description: 'The terms and conditions for using the Sanatana Peethams Portal.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function UserAgreementPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">User Agreement & Terms of Service</CardTitle>
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </CardHeader>
        <CardContent className="prose max-w-none text-foreground/90">
            <p>Welcome to the Sanatana Peethams Portal. By accessing or using our Service, you agree to be bound by these terms.</p>
            
            <h2>1. Use of the Service</h2>
            <p>This portal is intended to be a respectful and supportive environment for all devotees and seekers. You agree not to use the Service to:</p>
            <ul>
                <li>Post any content that is unlawful, harmful, hateful, or discriminatory.</li>
                <li>Impersonate any person or entity.</li>
                <li>Violate the privacy of others.</li>
                <li>Distribute spam or unauthorized advertising.</li>
            </ul>

            <h2>2. Your Content</h2>
            <p>You retain ownership of the content you create on the platform (such as posts and campaigns). By posting content publicly, you grant us a worldwide, non-exclusive, royalty-free license to display that content on the Service.</p>
            <p>You are solely responsible for the content you post and the consequences of sharing it. We reserve the right, but not the obligation, to remove any content that violates these terms or our community standards.</p>

            <h2>3. Community Guidelines</h2>
            <p>Our community is built on mutual respect and a shared reverence for Sanatana Dharma. We expect all users to engage in civil, constructive, and respectful discourse. Harassment, personal attacks, and hate speech will not be tolerated.</p>
        
            <h2>4. Disclaimer of Warranties</h2>
            <p>The Service is provided on an "as is" and "as available" basis. While we strive for accuracy, we do not warrant that the information provided is always complete, reliable, or current.</p>

            <h2>5. Limitation of Liability</h2>
            <p>In no event shall the Sanatana Peethams Portal or its volunteers be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service.</p>

            <h2>6. Changes to These Terms</h2>
            <p>We may modify these terms at any time. We will provide notice of significant changes. Your continued use of the Service after such changes constitutes your acceptance of the new terms.</p>
            
            <h2>7. Contact Us</h2>
            <p>If you have any questions about these terms, please contact us via our <a href="/contact">Contact Page</a>.</p>
        </CardContent>
      </Card>
    </div>
  );
}
