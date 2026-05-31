"use client";

import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";

const WORKS = [
  "Harry Potter Series", "The Lord of the Rings", "Dune", "Fight Club",
  "The Shining", "Schindler's List", "No Country for Old Men", "The Godfather",
  "A Clockwork Orange", "The Count of Monte Cristo", "Brave New World",
  "Perfume: The Story of a Murderer", "The Picture of Dorian Gray",
  "Anna Karenina", "The Great Gatsby", "The Reader", "Gone with the Wind",
  "All Quiet on the Western Front", "Forrest Gump", "The Handmaid's Tale",
];

const medals = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const { data, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getAllResults",
  });

  useEffect(() => {
    const interval = setInterval(() => refetch(), 10000);
    return () => clearInterval(interval);
  }, []);

  const books: { name: string; votes: number }[] = [];
  const movies: { name: string; votes: number }[] = [];

  if (data) {
    const [, bookVotes, filmVotes] = data as any;
    WORKS.forEach((name, i) => {
      books.push({ name, votes: Number(bookVotes[i]) });
      movies.push({ name, votes: Number(filmVotes[i]) });
    });
    books.sort((a, b) => b.votes - a.votes);
    movies.sort((a, b) => b.votes - a.votes);
  }

  return (
    <div className="w-64 flex-shrink-0 space-y-4 sticky top-6 self-start">
      <div className="bg-[#0d0d18] border border-[#1e1e3a] rounded-xl p-4">
        <h3 className="text-xs font-medium text-purple-400 mb-3">🎬 Top Movies</h3>
        {movies.slice(0, 3).map((item, i) => (
          <div key={i} className="flex items-center gap-2 py-2 border-b border-[#1a1a2e] last:border-0">
            <span className="text-sm">{medals[i]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-200 truncate">{item.name}</p>
            </div>
            <span className="text-sm font-medium text-purple-400">{item.votes}</span>
          </div>
        ))}
        {movies.length === 0 && (
          <p className="text-xs text-gray-500">No votes yet</p>
        )}
      </div>

      <div className="bg-[#0d0d18] border border-[#1e1e3a] rounded-xl p-4">
        <h3 className="text-xs font-medium text-indigo-400 mb-3">📖 Top Books</h3>
        {books.slice(0, 3).map((item, i) => (
          <div key={i} className="flex items-center gap-2 py-2 border-b border-[#1a1a2e] last:border-0">
            <span className="text-sm">{medals[i]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-200 truncate">{item.name}</p>
            </div>
            <span className="text-sm font-medium text-indigo-400">{item.votes}</span>
          </div>
        ))}
        {books.length === 0 && (
          <p className="text-xs text-gray-500">No votes yet</p>
        )}
      </div>
    </div>
  );
}