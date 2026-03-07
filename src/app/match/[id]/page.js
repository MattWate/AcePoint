"use client";
import { useState } from 'react';
import { PADEL_POINTS, getInitialState, updateScore } from '@/core/padel-logic/scoring';
import ClickerInput from '@/features/match-live/components/ClickerInput';

export default function MatchPage() {
  const [match, setMatch] = useState(getInitialState());

  const handleAction = (type) => {
    if (type === 'POINT_A') setMatch(s => updateScore(s, 'A'));
    if (type === 'POINT_B') setMatch(s => updateScore(s, 'B'));
    if (type === 'UNDO') alert("Undo logic pending!"); // We'll add a history stack next
  };

  return (
    <main className="fixed inset-0 bg-black flex flex-col items-center justify-around p-4 uppercase font-black">
      <ClickerInput onAction={handleAction} />

      {/* TEAM A */}
      <div className="text-center w-full">
        <p className="text-brand text-2xl mb-2">Team A</p>
        <h1 className="text-[15rem] leading-none text-brand drop-shadow-[0_0_30px_rgba(204,255,0,0.5)]">
          {PADEL_POINTS[match.scoreA]}
        </h1>
        <div className="text-4xl text-white opacity-50">Games: {match.gamesA}</div>
      </div>

      <div className="h-px w-2/3 bg-white/20" />

      {/* TEAM B */}
      <div className="text-center w-full">
        <h1 className="text-[15rem] leading-none text-cyan-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]">
          {PADEL_POINTS[match.scoreB]}
        </h1>
        <div className="text-4xl text-white opacity-50">Games: {match.gamesB}</div>
        <p className="text-cyan-400 text-2xl mt-2">Team B</p>
      </div>
    </main>
  );
}
