'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Zap, CheckCircle2 } from 'lucide-react';

interface OnboardingWizardProps {
  onDismiss: () => void;
}

export function OnboardingWizard({ onDismiss }: OnboardingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleConnectWhatsApp = () => {
    router.push('/settings?tab=whatsapp');
    onDismiss();
  };

  const handleInviteTeam = () => {
    router.push('/settings?tab=members');
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-300">
        <Card className="border-2 border-primary/20 shadow-2xl">
          <CardHeader className="text-center pb-8 pt-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Welcome to VCRo Hub!</CardTitle>
            <CardDescription className="text-lg mt-2">
              Let&apos;s get your workspace set up in 2 quick steps.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 px-10">
            <div 
              className={`flex items-start gap-4 rounded-xl border p-5 transition-all ${step === 1 ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-card opacity-50'}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold leading-none">Step 1: Connect WhatsApp</h3>
                <p className="text-sm text-muted-foreground">
                  Link your official Meta API credentials so your team can start sending and receiving messages.
                </p>
                {step === 1 && (
                  <Button onClick={handleConnectWhatsApp} className="mt-4 w-full sm:w-auto">
                    Connect WhatsApp Now
                  </Button>
                )}
              </div>
            </div>

            <div 
              className={`flex items-start gap-4 rounded-xl border p-5 transition-all ${step === 2 ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-card opacity-50'}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold leading-none">Step 2: Invite your Team</h3>
                <p className="text-sm text-muted-foreground">
                  Bring your sales and support agents into the shared inbox.
                </p>
                {step === 2 && (
                  <Button onClick={handleInviteTeam} className="mt-4 w-full sm:w-auto">
                    Invite Teammates
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between px-10 pb-10 pt-4">
            <Button variant="ghost" onClick={onDismiss} className="text-muted-foreground">
              Skip for now
            </Button>
            {step === 1 && (
              <Button variant="secondary" onClick={() => setStep(2)}>
                Next Step
              </Button>
            )}
            {step === 2 && (
              <Button variant="secondary" onClick={() => setStep(1)}>
                Previous Step
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
