'use client';

import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import {
  uintCV,
  stringAsciiCV,
  principalCV,
  callReadOnlyFunction,
} from '@stacks/transactions';
import { atom, useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSessionAtom = atom(new UserSession({ appConfig }));
export const userDataAtom = atom<any>(null);
export const isConnectedAtom = atom(false);


export function useStacks() {
  const [userSession, setUserSession] = useAtom(userSessionAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);

  const authOptions = {
    appDetails: {
      name: 'BallotChain',
      icon: '/icon.png',
    },
    redirectTo: '/',
    onFinish: () => {
      setUserData(userSession.loadUserData());
      setIsConnected(userSession.isUserSignedIn());
    },
    userSession,
  };

  const doOpenAuth = () => {
    showConnect(authOptions);
  };

  const doSignOut = () => {
    userSession.signUserOut('/');
    setUserData(null);
    setIsConnected(false);
  };

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      setIsConnected(true);
    } else if(userSession.isSignInPending()) {
        userSession.handlePendingSignIn().then(u => {
            setUserData(u);
            setIsConnected(true);
        })
    }
  }, [userSession, setUserData, setIsConnected]);
  
  const user = useMemo(() => {
    if (!userData) return null;
    return {
      stxAddress: {
        mainnet: userData.profile.stxAddress.mainnet,
        testnet: userData.profile.stxAddress.testnet,
      },
      ...userData
    }
  }, [userData]);


  return { doOpenAuth, doSignOut, user, isConnected, authOptions };
}
