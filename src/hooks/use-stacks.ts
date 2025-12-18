'use client';

import { useConnect, StacksProvider } from '@stacks/connect-react';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import {
  uintCV,
  stringAsciiCV,
  principalCV,
  callReadOnlyFunction,
} from '@stacks/transactions';

export function useStacks() {
  const { auth, authOptions, user, isConnected, signOut } = useConnect();

  const doOpenAuth = () => {
    auth.authenticate(authOptions);
  };
  
  const doSignOut = () => {
    signOut();
  }

  return { doOpenAuth, doSignOut, user, isConnected };
}
