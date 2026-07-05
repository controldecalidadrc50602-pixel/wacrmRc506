import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-sm sm:prose-base dark:prose-invert text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when creating an account, including your name, email address, and billing information. We also temporarily process the contents of your WhatsApp messages in order to route them to your agents.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to operate, maintain, and improve our platform. Your WhatsApp message data is strictly used to facilitate the chat interface and auto-reply features you configure.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Sharing and Third Parties</h2>
          <p>We do not sell your personal data. We share information only with trusted third-party service providers (like Stripe for payments and Meta for WhatsApp delivery) strictly for the purpose of operating VCRo Hub.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Data Retention</h2>
          <p>You can delete your account and all associated data at any time from your settings panel. Once deleted, chat histories cannot be recovered.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Contact</h2>
          <p>If you have any questions about this Privacy Policy, please contact our privacy team.</p>
        </div>
      </div>
    </div>
  );
}
