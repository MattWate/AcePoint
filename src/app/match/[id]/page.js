"use client";
import { useState, useCallback } from 'react';
import { PADEL_POINTS, getInitialState, updateScore } from '@/core/padel-logic/scoring';
import ClickerInput from '@/features/match-live/components/ClickerInput';

export default function MatchPage() {
  const [match, setMatch] = useState(getInitialState());
  const [history, setHistory] = useState([]);
  const [activeFlash, setActiveFlash] = useState(null); // Tracks which team just scored

  const triggerFlash = (team) => {
    setActiveFlash(team);
    setTimeout(() => setActiveFlash(null), 300); // Flash duration
  };

  const handleAction = useCallback((type) => {
    if (type === 'POINT_A' || type === 'POINT_B') {
      const winner = type === 'POINT_A' ? 'A' : 'B';
      
      // Save current state to history before updating
      setHistory(prev => [...prev, match]);
      
      // Update score and trigger visual feedback
      setMatch(prev => updateScore(prev, winner));
      triggerFlash(winner);
    } 
    
    if (type === 'UNDO') {
      if (history.length === 0) return;
      
      // Pop the last state from history
      const previousState = history[history.length - 1];
      setMatch(previousState);
      setHistory(prev => prev.slice(0, -1));
    }
  }, [match, history]);

  return (
    <main className="fixed inset-0 bg-black flex flex-col uppercase font-black overflow-hidden select-none">
      {/* Invisible Bluetooth listener bridge */}
      <ClickerInput onAction={handleAction} />

      {/* TEAM A TOUCH AREA */}
      <button 
        onClick={() => handleAction('POINT_A')}
        className={`flex-1 flex flex-col items-center justify-center w-full transition-all duration-150 pt-8 ${
          activeFlash === 'A' ? 'bg-brand/20 brightness-150' : 'active:bg-white/10'
        }`}
      >
        <p className="text-brand text-2xl mb-2">Team A</p>
        <h1 className={`text-court-score leading-none text-brand drop-shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-transform ${
          activeFlash === 'A' ? 'scale-110' : 'scale-100'
        }`}>
          {PADEL_POINTS[match.scoreA]}
        </h1>
        <div className="text-4xl text-white opacity-50">Games: {match.gamesA}</div>
        {match.setsA > 0 && <div className="text-brand text-xl">Sets: {match.setsA}</div>}
      </button>

      {/* DIVIDER / UNDO ZONE */}
      <div className="relative h-px w-full bg-white/20">
         <button 
          onClick={(e) => { e.stopPropagation(); handleAction('UNDO'); }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 border border-white/20 px-8 py-3 rounded-full text-white text-sm z-10 active:scale-95 transition-transform disabled:opacity-30"
          disabled={history.length === 0}
         >
           UNDO
         </button>
      </div>

      {/* TEAM B TOUCH AREA */}
      <button 
        onClick={() => handleAction('POINT_B')}
        className={`flex-1 flex flex-col items-center justify-center w-full transition-all duration-150 pb-8 ${
          activeFlash === 'B' ? 'bg-cyan-400/20 brightness-150' : 'active:bg-white/10'
        }`}
      >
        {match.setsB > 0 && <div className="text-cyan-400 text-xl">Sets: {match.setsB}</div>}
        <div className="text-4xl text-white opacity-50">Games: {match.gamesB}</div>
        <h1 className={`text-court-score leading-none text-cyan-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-transform ${
          activeFlash === 'B' ? 'scale-110' : 'scale-100'
        }`}>
          {PADEL_POINTS[match.scoreB]}
        </h1>
        <p className="text-cyan-400 text-2xl mt-2">Team B</p>
      </button>
    </main>
  );
}
