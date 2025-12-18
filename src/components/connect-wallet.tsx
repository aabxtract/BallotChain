'use client';

import { Button } from './ui/button';
import { useStacks } from '@/hooks/use-stacks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function ConnectWallet() {
  const { doOpenAuth, doSignOut, isConnected, user } = useStacks();

  if (isConnected && user) {
    const shortenedAddress = `${user.stxAddress.mainnet.slice(
      0,
      6
    )}...${user.stxAddress.mainnet.slice(-4)}`;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {shortenedAddress}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {user.profile?.stxAddress.mainnet}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={doSignOut}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={doOpenAuth}>
      Connect Wallet
    </Button>
  );
}
