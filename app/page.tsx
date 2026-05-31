"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import WorkCard from "./components/WorkCard";
import Leaderboard from "./components/Leaderboard";

const WORKS = [
  "Harry Potter Series",
  "The Lord of the Rings",
  "Dune",
  "Fight Club",
  "The Shining",
  "Schindler's List",
  "No Country for Old Men",
  "The Godfather",
  "A Clockwork Orange",
  "The Count of Monte Cristo",
  "Brave New World",
  "Perfume: The Story of a Murderer",
  "The Picture of Dorian Gray",
  "Anna Karenina",
  "The Great Gatsby",
  "The Reader",
  "Gone with the Wind",
  "All Quiet on the Western Front",
  "Forrest Gump",
  "The Handmaid's Tale",
];

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="border-b border-[#2a2a4a] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            ArcBookVsMovie
          </h1>
          <p className="text-xs text-gray-500">Vote on Arc Network · 0.001 USDC per vote</p>
        </div>
        <ConnectButton />
      </header>

      <section className="text-center py-12 px-6">
        <h2 className="text-4xl font-bold mb-3">Book or Movie?</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Connect your wallet and vote for each adaptation on Arc Network.
        </p>
        {!isConnected && (
          <p className="mt-4 text-amber-400 text-sm">↑ Connect your wallet to start voting</p>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 flex gap-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKS.map((name, i) => (
            <WorkCard key={i} workId={i} name={name} />
          ))}
        </div>
        <Leaderboard />
      </section>
    </main>
  );
}