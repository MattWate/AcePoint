"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const inputRef = useRef(null);
  const clickCount = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    // Re-focus whenever the user interacts with the app
    window.addEventListener('touchstart', focusInput);
    window.addEventListener('mousedown', focusInput);
    focusInput();

    return () => {
      window.removeEventListener('touchstart', focusInput);
      window.removeEventListener('mousedown', focusInput);
    };
  }, []);

  const handleKeyDown = (e) => {
    // DIAGNOSTIC: This alert will tell you exactly what your button sends
    // alert(`Detected: ${e.key}`); 

    // Capture standard keys and the Volume keys used by Android clickers
    if (["Enter", " ", "ArrowUp", "VolumeUp", "VolumeDown"].includes(e.key)) {
      e.preventDefault(); // STOP the volume bar from appearing
      
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
      inputMode="none" // Hide software keyboard
      className="fixed opacity-0 pointer-events-none inset-0 w-full h-full z-[9999]"
      aria-hidden="true"
      autoFocus
    />
  );
}
