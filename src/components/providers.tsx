'use client';

import { StacksProvider } from '@stacks/connect-react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StacksProvider
      appName="BallotChain"
      appIcon="/icon.png"
    >
      {children}
    </StacksProvider>
  );
}
