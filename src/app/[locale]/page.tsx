import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, UsersRound, Zap, ShieldCheck, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/components/ui/language-switcher';

export default function LandingPage() {
  const t = useTranslations('Index');
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="px-6 lg:px-8 h-16 flex items-center justify-between border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="VCRo Hub Logo" className="h-8 w-8 object-contain rounded-md" />
          <span className="font-bold text-lg tracking-tight">VCRo Hub</span>
        </div>
        <nav className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Log in
          </Link>
          <Link href="/signup">
            <Button size="sm">{t('getStarted')}</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        
        {/* Hero Section */}
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            {t('title')}
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
            {t('title')} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              VCRo Hub
            </span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base shadow-lg shadow-primary/20">
                {t('getStarted')}
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                Enter CRM
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <UsersRound className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Agent Inbox</h3>
            <p className="text-muted-foreground leading-relaxed">
              Let your entire team reply from a single WhatsApp number. Assign chats and never miss a lead.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Zero Ban Risk</h3>
            <p className="text-muted-foreground leading-relaxed">
              We connect directly to the Official Meta Cloud API. Say goodbye to QR codes and random account bans.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Automations</h3>
            <p className="text-muted-foreground leading-relaxed">
              Build no-code flows to auto-reply 24/7. Filter leads automatically before your human agents step in.
            </p>
          </div>
        </div>
        {/* Pricing Section */}
        <div className="mt-32 w-full max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-lg">Start for free, upgrade when you need more power.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl border border-border bg-card shadow-sm flex flex-col">
              <h3 className="text-2xl font-semibold mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/ forever</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /> 1 Agent Seat</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /> 1 WhatsApp Number</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /> Basic Shared Inbox</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-green-500" /> Community Support</li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full h-12">Get Started</Button>
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="p-8 rounded-3xl border-2 border-primary bg-card shadow-md relative flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-semibold mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Unlimited Agent Seats</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> 5 WhatsApp Numbers</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Advanced AI Automations</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" /> Priority Email Support</li>
              </ul>
              <Link href="/signup">
                <Button className="w-full h-12">Upgrade to Pro</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 mb-20 w-full max-w-3xl mx-auto text-left">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h4 className="text-lg font-semibold mb-2">Do I need an official Meta Developer Account?</h4>
              <p className="text-muted-foreground">Yes. We connect to the official Meta Cloud API to ensure your number is never banned. You will need a valid Facebook Business Manager account.</p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h4 className="text-lg font-semibold mb-2">Can I use my existing WhatsApp number?</h4>
              <p className="text-muted-foreground">You can use any phone number that can receive an SMS or voice call for verification. However, it cannot be actively registered on the standard WhatsApp mobile app.</p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h4 className="text-lg font-semibold mb-2">Are there hidden fees per message?</h4>
              <p className="text-muted-foreground">We do not charge per message. However, Meta charges a small fee per conversation (24-hour window) depending on your region. The first 1,000 service conversations every month are free from Meta.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-10 mb-32 p-12 rounded-3xl bg-primary/5 border border-primary/20 w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to scale your sales?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join the platform built for serious WhatsApp operations.</p>
          <Link href="/signup">
            <Button size="lg" className="h-14 px-10 text-lg shadow-lg shadow-primary/20">
              Start your free trial
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
        </div>
        <p>© {new Date().getFullYear()} VCRo Hub. All rights reserved.</p>
        <p className="mt-2 text-xs opacity-60">Not affiliated with Meta Platforms Inc. or WhatsApp LLC.</p>
      </footer>
    </div>
  );
}
