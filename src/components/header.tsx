'use client';
import { Vote } from 'lucide-react';
import { ConnectWallet } from './connect-wallet';

export function Header() {
  return (
    <header className="sticky top-4 z-50 mx-auto flex w-[95%] items-center h-16 px-4 md:px-6 border rounded-lg bg-card/80 shrink-0 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Vote className="w-6 h-6" />
        <h1 className="font-bold">BallotChain</h1>
      </div>
      <div className="ml-auto">
        <ConnectWallet />
      </div>
    </header>
  );
}
