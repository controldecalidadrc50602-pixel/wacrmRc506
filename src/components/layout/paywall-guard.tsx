'use client';

import { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaywallGuardProps {
  children: ReactNode;
  isPro?: boolean;
  featureName?: string;
  fallback?: ReactNode;
}

export function PaywallGuard({ 
  children, 
  isPro = false, 
  featureName = 'this feature',
  fallback 
}: PaywallGuardProps) {
  // We use our environment flag to bypass paywalls during testing/development
  const isPaywallEnabled = process.env.NEXT_PUBLIC_ENABLE_PAYWALLS === 'true';

  // If paywalls are disabled, or the user is already Pro, render normally
  if (!isPaywallEnabled || isPro) {
    return <>{children}</>;
  }

  // If the developer provided a custom fallback UI, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default Paywall UI (blurred/locked content)
  return (
    <div className="relative group overflow-hidden rounded-md">
      {/* The actual content, but heavily blurred and unclickable */}
      <div className="blur-sm opacity-50 pointer-events-none select-none transition-all">
        {children}
      </div>
      
      {/* The overlay lock */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/40 backdrop-blur-[1px]">
        <div className="flex flex-col items-center p-6 text-center bg-card shadow-lg rounded-xl border border-border max-w-sm mx-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Upgrade to Pro</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You need an active Pro subscription to unlock {featureName}.
          </p>
          <Button onClick={() => window.location.href = '/settings?upgrade=true'}>
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}
