"use client";

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

// 1. Force casting as string taake red lines khatam hon
const projectId = (process.env.NEXT_PUBLIC_PROJECT_ID as string) || "";

const metadata = {
  name: 'WalletConnect Reputation',
  description: 'Web3 Reputation Score',
  url: 'https://walletconnect-reputation.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [base, mainnet, polygon, arbitrum] as const;
const config = defaultWagmiConfig({ chains, projectId, metadata });

// 2. Sirf tab initialize karein jab projectId mojood ho
if (projectId) {
  createWeb3Modal({ 
    wagmiConfig: config, 
    projectId,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#a855f7', // Aapka purple design
      '--w3m-color-mix': '#a855f7',
      '--w3m-color-mix-strength': 30,
      '--w3m-border-radius-master': '10px'
    }
  });
}

export function Web3Modal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null; // Hydration error fix

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}