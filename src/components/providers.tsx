'use client';

import { Connect } from '@stacks/connect-react';
import { useStacks } from '@/hooks/use-stacks';

export function Providers({ children }: { children: React.ReactNode }) {
  const { authOptions } = useStacks();
  return (
    <Connect
      authOptions={authOptions}
    >
      {children}
    </Connect>
  );
}
