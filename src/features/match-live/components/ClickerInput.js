"use client";
import { useEffect, useRef, useState } from 'react';

export default function ClickerInput({ onAction }) {
  const [debugLog, setDebugLog] = useState("Ready for Padel...");
  const clickCount = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    const handleGlobalKey = (e) => {
      // Normalize different browser/OS naming conventions
      const keyName = e.key;
      setDebugLog(`Key: ${keyName}`);

      // List of keys to hijack (including your specific 'AudioVolumeUp')
      const targetKeys = [
        "AudioVolumeUp", 
        "AudioVolumeDown", 
        "VolumeUp", 
        "VolumeDown", 
        "Enter", 
        " "
      ];

      if (targetKeys.includes(keyName)) {
        // CRITICAL: This stops the Android volume slider from appearing
        e.preventDefault();
        
        clickCount.current++;
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
          if (clickCount.current === 1) onAction('POINT_A');
          else if (clickCount.current === 2) onAction('POINT_B');
          else if (clickCount.current === 3) onAction('UNDO');
          clickCount.current = 0;
        }, 350);
      }
    };

    // Use 'keydown' with capture phase (true) to intercept before the OS does
    window.addEventListener('keydown', handleGlobalKey, true);
    return () => window.removeEventListener('keydown', handleGlobalKey, true);
  }, [onAction]);

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
      <div className="bg-black/80 border border-brand px-3 py-1 rounded-full text-[10px] text-brand font-mono animate-pulse">
        ● {debugLog}
      </div>
    </div>
  );
}
