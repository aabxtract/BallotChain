import { Vote } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Vote className="w-5 h-5 text-primary" />
          <span className="font-semibold">Ballotz</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ballotz. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/elections" className="text-sm hover:underline">
            Elections
          </Link>
          <Link href="/create-election" className="text-sm hover:underline">
            Create
          </Link>
        </div>
      </div>
    </footer>
  );
}
