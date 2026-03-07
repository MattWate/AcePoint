"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const inputRef = useRef(null);
  let clickCount = 0;
  let timer = null;

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    
    // Crucial: iOS requires a user gesture to allow programmatic focus
    window.addEventListener('touchstart', focusInput);
    focusInput();

    return () => window.removeEventListener('touchstart', focusInput);
  }, []);

  const handleKeyDown = (e) => {
    // Most clickers send 'Enter', ' ', or 'ArrowUp'
    e.preventDefault();
    clickCount++;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      if (clickCount === 1) onAction('POINT_A');
      if (clickCount === 2) onAction('POINT_B');
      if (clickCount === 3) onAction('UNDO');
      clickCount = 0;
    }, 300); // 300ms window for multi-clicks
  };

  return (
    <input
      ref={inputRef}
      onKeyDown={handleKeyDown}
      className="absolute opacity-0 pointer-events-none"
      aria-hidden="true"
      autoFocus
    />
  );
}
