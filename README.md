# ArcBookVsMovie

A fully on-chain voting app built on Arc Network. Vote for your favorite book or movie adaptation using USDC on Arc Testnet.

## Live Demo
👉 [arcbookvsmovie.vercel.app](https://arcbookvsmovie.vercel.app)

## Tech Stack
- Next.js 16 (App Router)
- TypeScript + Tailwind CSS
- Solidity ^0.8.20
- wagmi v2 + viem v2 + RainbowKit v2
- Arc Network Testnet (Chain ID: 5042002)
- TMDB API + Open Library API

## How It Works
1. Connect your MetaMask wallet to Arc Testnet
2. Browse 20 iconic book/film adaptations
3. Vote Book or Movie — 0.001 USDC per vote
4. Every vote is recorded on-chain
5. Live leaderboard updates in real time

## Smart Contract
- Network: Arc Network Testnet
- Address: `0x68f64B8c0c01b559A669AD57eA450457c543EE8e`
- USDC is the native token on Arc — votes are paid via `msg.value`

## Getting Started

```bash
git clone https://github.com/consumeobeydie/arcbookvsmovie.git
cd arcbookvsmovie
npm install
npm run dev
```

## Environment Variables
## License
MIT