'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BillingCardProps {
  isPro: boolean;
  stripeCustomerId?: string;
  currentPeriodEnd?: string;
}

export function BillingCard({ isPro, stripeCustomerId, currentPeriodEnd }: BillingCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const endpoint = isPro && stripeCustomerId ? '/api/stripe/portal' : '/api/stripe/checkout';
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to initialize payment');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = currentPeriodEnd 
    ? new Date(currentPeriodEnd).toLocaleDateString()
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          Manage your billing and subscription status.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-lg">{isPro ? 'Pro Plan' : 'Free Plan'}</span>
              <Badge variant={isPro ? 'default' : 'secondary'}>
                {isPro ? 'Active' : 'Basic'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {isPro 
                ? `Your subscription is active until ${formattedDate}.`
                : 'Upgrade to Pro to unlock advanced CRM features and limits.'}
            </p>
          </div>
          <div className="hidden sm:block">
            <CreditCard className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
        </div>
        
        {!isPro && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Pro Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Unlimited WhatsApp Messages</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Team Collaboration</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Advanced Automations</li>
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4 bg-muted/20">
        <Button onClick={handleCheckout} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
        </Button>
      </CardFooter>
    </Card>
  );
}
