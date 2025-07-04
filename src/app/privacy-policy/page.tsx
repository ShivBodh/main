import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sanatana Peethams Portal',
  description: 'Our commitment to your privacy on the Sanatana Peethams Portal.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl py-16 md:py-24 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </CardHeader>
        <CardContent className="prose max-w-none text-foreground/90">
          <p>This Privacy Policy describes how the Sanatana Peethams Portal ("we", "us", or "our") collects, uses, and discloses your information when you use our website (the "Service").</p>
          
          <h2>1. Information We Collect</h2>
          <ul>
            <li><strong>Account Information:</strong> When you create an account, we collect information you provide, such as your name and email address, through trusted third-party authentication providers like Google.</li>
            <li><strong>User-Generated Content:</strong> We collect the content you create on our platform, such as posts, comments, campaign details, and personal diary entries ("Dainandini"). You have control over the privacy settings (Public or Personal) for this content.</li>
            <li><strong>Usage Data:</strong> We may collect anonymous data about your interactions with the Service, such as pages visited and features used, to help us improve the platform.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain the Service.</li>
            <li>To manage your account and provide you with personalized features.</li>
            <li>To display your public content to other users as per your privacy settings.</li>
            <li>To improve the Service and develop new features.</li>
          </ul>

          <h2>3. Data Storage and Security</h2>
          <p>Your data is stored using secure, industry-standard cloud services (Firebase). While no method of transmission over the Internet or method of electronic storage is 100% secure, we strive to use commercially acceptable means to protect your Personal Information.</p>
          <ul>
              <li>**Authentication Data**: Managed securely by Google Firebase Authentication. We do not store your passwords.</li>
              <li>**Personal Diary (Dainandini) Data**: Stored exclusively in your browser's local storage. This data is private to you and is not transmitted to or stored on our servers.</li>
              <li>**Public Content (Posts, Campaigns)**: Stored in our database to be displayed on the platform according to the privacy settings you choose.</li>
          </ul>

          <h2>4. Your Choices and Rights</h2>
          <p>You have control over the content you create. You can set the privacy for your posts and campaigns to "Public" or "Personal". You can edit or delete your content at any time. Your Dainandini data is private by default and stored on your own device.</p>

          <h2>5. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

          <h2>6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, you can contact us through our <a href="/contact">Contact Page</a>.</p>
        </CardContent>
      </Card>
    </div>
  );
}
