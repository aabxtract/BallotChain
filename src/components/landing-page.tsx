import { Button } from '@/components/ui/button';
import { Vote } from 'lucide-react';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 rounded-full bg-primary/10">
          <div className="p-3 rounded-full bg-primary/20">
            <Vote className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          BallotChain
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Create and run transparent elections on Bitcoin via Stacks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button size="lg" variant="outline" asChild>
            <Link href="/elections">View Elections</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/create-election">Create Election</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
