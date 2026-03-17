"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const inputRef = useRef(null);
  const clickCount = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    const keepFocus = () => {
      // Small delay ensures focus happens AFTER the tap event finishes
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    };

    // Re-focus whenever the user interacts with the app
    window.addEventListener('touchstart', keepFocus);
    window.addEventListener('click', keepFocus);
    keepFocus();

    return () => {
      window.removeEventListener('touchstart', keepFocus);
      window.removeEventListener('click', keepFocus);
    };
  }, []);

  const handleKeyDown = (e) => {
    // These are the common keys sent by Android/iOS clickers
    const validKeys = ["Enter", " ", "ArrowUp", "ArrowDown", "VolumeUp", "VolumeDown"];
    
    if (validKeys.includes(e.key)) {
      e.preventDefault(); // This is what stops the Volume Bar from appearing
      
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

  return (
    <input
      ref={inputRef}
      onKeyDown={handleKeyDown}
      type="text"
      inputMode="none" 
      // Removed aria-hidden to fix the console error
      className="fixed opacity-0 pointer-events-none inset-0 w-full h-full z-[9999]"
      autoFocus
      readOnly
    />
  );
}
