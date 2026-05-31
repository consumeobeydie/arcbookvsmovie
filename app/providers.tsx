"use client";

import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ARC_TESTNET } from "./constants";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "ArcBookVsMovie",
  projectId: "2f4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
  chains: [ARC_TESTNET as any],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}