"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { parseUnits } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI, USDC_ADDRESS } from "../constants";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

const TMDB_IDS: Record<number, number> = {
  0: 672,    // Harry Potter
  1: 120,    // Lord of the Rings
  2: 438631, // Dune 2021
  3: 550,    // Fight Club
  4: 694,    // The Shining
  5: 424,    // Schindler's List
  6: 6977,   // No Country for Old Men
  7: 238,    // The Godfather
  8: 185,    // A Clockwork Orange
  9: 11362,  // The Count of Monte Cristo 2002
  10: 27260, // Brave New World 1998
  11: 1427,  // Perfume: Story of a Murderer
  12: 23488, // Dorian Gray 2009
  13: 96724, // Anna Karenina 2012
  14: 64682, // The Great Gatsby 2013
  15: 8055,  // The Reader 2008
  16: 770,   // Gone with the Wind
  17: 49046,// All Quiet on the Western Front 2022
  18: 13,    // Forrest Gump
  19: 20815, // The Handmaid's Tale 1990
};

const BOOK_ISBN: Record<number, string> = {
  0: "9780747532699", 1: "9780618640157", 2: "9780441013593",
  3: "9780393339764", 4: "9780385121675", 5: "9780671880316",
  6: "9780375706677", 7: "9780451205766", 8: "9780393312836",
  9: "9780140449266", 10: "9780060850524", 11: "9780375725845",
  12: "9780141439570", 13: "9780143035008", 14: "9780743273565",
  15: "9780375700668", 16: "9780446675536", 17: "9780449213940",
  18: "9780671727284", 19: "9780385490818",
};

interface WorkCardProps {
  workId: number;
  name: string;
}

export default function WorkCard({ workId, name }: WorkCardProps) {
  const { address, isConnected } = useAccount();
  const [moviePoster, setMoviePoster] = useState<string | null>(null);
  const [bookCover, setBookCover] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);

  const { writeContract } = useWriteContract();

  const { data: results, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getResults",
    args: [workId],
  });

  const { data: hasVotedData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "hasVoted",
    args: [address, workId],
    query: { enabled: !!address },
  });

  useEffect(() => {
    fetchMoviePoster();
    fetchBookCover();
  }, [workId]);

  async function fetchMoviePoster() {
    try {
      const id = TMDB_IDS[workId];
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      if (data.poster_path) setMoviePoster(TMDB_IMAGE_BASE + data.poster_path);
    } catch (e) {}
  }

  async function fetchBookCover() {
    const isbn = BOOK_ISBN[workId];
    setBookCover(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
  }

  async function handleVote(isFilm: boolean) {
    if (!isConnected) return alert("Please connect your wallet first!");
    setVoting(true);
    try {
      await writeContract({
        address: USDC_ADDRESS as `0x${string}`,
        abi: ["function approve(address spender, uint256 amount) external returns (bool)"],
        functionName: "approve",
        args: [CONTRACT_ADDRESS, parseUnits("0.001", 6)],
      });
      await new Promise(r => setTimeout(r, 2000));
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "vote",
        args: [workId, isFilm],
      });
      await refetch();
    } catch (e: any) {
      alert(e.message || "Vote failed");
    }
    setVoting(false);
  }

  const bookVotes = results ? Number((results as any)[1]) : 0;
  const filmVotes = results ? Number((results as any)[2]) : 0;
  const total = bookVotes + filmVotes;
  const bookPct = total > 0 ? Math.round((bookVotes / total) * 100) : 50;

  return (
    <div className="bg-[#0d0d18] border border-[#1e1e3a] rounded-xl overflow-hidden hover:border-purple-600 transition-colors">
      <div className="flex gap-px">
        <div className="flex-1 aspect-[2/3] relative overflow-hidden bg-[#1a1a2e]">
          <span className="absolute top-2 left-2 z-10 text-[10px] px-2 py-1 rounded bg-indigo-900 text-indigo-300 font-medium">Book</span>
          {bookCover ? (
            <img src={bookCover} alt={`${name} book`} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">📖</div>
          )}
        </div>
        <div className="flex-1 aspect-[2/3] relative overflow-hidden bg-[#1a2a1a]">
          <span className="absolute top-2 left-2 z-10 text-[10px] px-2 py-1 rounded bg-green-900 text-green-300 font-medium">Movie</span>
          {moviePoster ? (
            <img src={moviePoster} alt={`${name} movie`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">🎬</div>
          )}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-200 mb-2 truncate">{name}</h3>
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => handleVote(false)}
            disabled={voting || !!hasVotedData}
            className="flex-1 py-1.5 text-xs font-medium rounded-md bg-indigo-950 border border-indigo-700 text-indigo-300 hover:bg-indigo-900 disabled:opacity-50 transition-colors"
          >
            {hasVotedData ? "✓ Voted" : voting ? "..." : "Vote Book"}
          </button>
          <button
            onClick={() => handleVote(true)}
            disabled={voting || !!hasVotedData}
            className="flex-1 py-1.5 text-xs font-medium rounded-md bg-green-950 border border-green-700 text-green-300 hover:bg-green-900 disabled:opacity-50 transition-colors"
          >
            {hasVotedData ? "✓ Voted" : voting ? "..." : "Vote Movie"}
          </button>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{bookVotes} book</span>
          <span>{filmVotes} movie</span>
        </div>
        <div className="h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all" style={{ width: `${bookPct}%` }} />
        </div>
      </div>
    </div>
  );
}