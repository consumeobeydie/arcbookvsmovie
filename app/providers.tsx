"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ARC_TESTNET } from "./constants";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "ArcBookVsMovie",
  733fefb7ef99b7d7264bba32048913f7
  chains: [ARC_TESTNET as any],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}