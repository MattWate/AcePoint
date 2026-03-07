"use client";
import { useState } from 'react';
import { PADEL_POINTS, getInitialState, updateScore } from '@/core/padel-logic/scoring';
import ClickerInput from '@/features/match-live/components/ClickerInput';

export default function MatchPage() {
  const [match, setMatch] = useState(getInitialState());

  const handleAction = (type) => {
    if (type === 'POINT_A') setMatch(s => updateScore(s, 'A'));
    if (type === 'POINT_B') setMatch(s => updateScore(s, 'B'));
    if (type === 'UNDO') {
      // Undo logic will be implemented in the next step with a state history stack
      console.log("Undo requested");
    }
  };

  return (
    <main className="fixed inset-0 bg-black flex flex-col uppercase font-black overflow-hidden">
      <ClickerInput onAction={handleAction} />

      {/* TEAM A TOUCH AREA */}
      <button 
        onClick={() => handleAction('POINT_A')}
        className="flex-1 flex flex-col items-center justify-center w-full active:bg-white/10 transition-colors pt-8"
      >
        <p className="text-brand text-2xl mb-2">Team A</p>
        <h1 className="text-court-score leading-none text-brand drop-shadow-[0_0_30px_rgba(204,255,0,0.5)]">
          {PADEL_POINTS[match.scoreA]}
        </h1>
        <div className="text-4xl text-white opacity-50">Games: {match.gamesA}</div>
      </button>

      {/* DIVIDER / UNDO ZONE */}
      <div className="relative h-px w-full bg-white/20">
         <button 
          onClick={(e) => { e.stopPropagation(); handleAction('UNDO'); }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 border border-white/20 px-6 py-2 rounded-full text-white text-sm z-10 active:scale-95 transition-transform"
         >
           UNDO
         </button>
      </div>

      {/* TEAM B TOUCH AREA */}
      <button 
        onClick={() => handleAction('POINT_B')}
        className="flex-1 flex flex-col items-center justify-center w-full active:bg-white/10 transition-colors pb-8"
      >
        <div className="text-4xl text-white opacity-50">Games: {match.gamesB}</div>
        <h1 className="text-court-score leading-none text-cyan-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]">
          {PADEL_POINTS[match.scoreB]}
        </h1>
        <p className="text-cyan-400 text-2xl mt-2">Team B</p>
      </button>
    </main>
  );
}
