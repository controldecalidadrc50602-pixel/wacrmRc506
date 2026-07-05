import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-sm sm:prose-base dark:prose-invert text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          
          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using VCRo Hub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. WhatsApp Business API Usage</h2>
          <p>VCRo Hub acts as a platform to interact with the Meta Cloud API. You are strictly bound by the <a href="https://www.whatsapp.com/legal/business-policy/" target="_blank" rel="noreferrer" className="text-primary hover:underline">WhatsApp Business Policy</a>. Any violation of Meta's terms (such as sending unsolicited spam) will result in immediate termination of your account without refund.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Subscriptions and Payments</h2>
          <p>We offer both free and paid subscription plans. Paid plans are billed on a recurring basis. You may cancel your subscription at any time, but we do not provide refunds for partial billing periods.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Limitation of Liability</h2>
          <p>VCRo Hub is provided "as is". We are not responsible for any messages lost, numbers banned by Meta, or business losses resulting from the use of our platform.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Contact</h2>
          <p>If you have any questions regarding these terms, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
}
