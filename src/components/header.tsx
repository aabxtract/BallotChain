import { Vote } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center h-16 px-6 border-b bg-card shrink-0">
      <div className="flex items-center gap-2 text-xl font-semibold text-primary">
        <Vote className="w-6 h-6" />
        <h1 className="font-headline">BallotChain</h1>
      </div>
    </header>
  );
}
