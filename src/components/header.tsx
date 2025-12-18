'use client';
import { Vote } from 'lucide-react';
import { ConnectWallet } from './connect-wallet';

export function Header() {
  return (
    <header className="flex items-center h-16 px-4 md:px-6 border-b bg-card shrink-0">
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