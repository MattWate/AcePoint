"use client";
import { useEffect, useRef, useState } from 'react';

export default function ClickerInput({ onAction }) {
  const inputRef = useRef(null);
  const [debugLog, setDebugLog] = useState("Waiting for input...");

  useEffect(() => {
    const handleGlobalKey = (e) => {
      // Log EVERY key to find out what your button is actually sending
      setDebugLog(`Last Key: ${e.key} | Code: ${e.code}`);
      console.log("AcePoint Debug:", e.key, e.code);

      if (["VolumeUp", "VolumeDown", "Enter", " "].includes(e.key)) {
        // Only preventDefault if we successfully caught a Padel-relevant key
        e.preventDefault();
        // We'll map VolumeUp to Point A for now to test
        if (e.key === "VolumeUp" || e.key === "Enter") onAction('POINT_A');
      }
    };

    window.addEventListener('keydown', handleGlobalKey, true); // 'true' uses capture phase
    return () => window.removeEventListener('keydown', handleGlobalKey, true);
  }, [onAction]);

  return (
    <div className="fixed top-2 right-2 z-[10000] bg-black/80 p-2 rounded border border-brand text-[10px] text-brand font-mono">
      {debugLog}
      <input ref={inputRef} className="absolute opacity-0 pointer-events-none" autoFocus readOnly />
    </div>
  );
}
