"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const inputRef = useRef(null);
  const clickCount = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    const focusInput = () => {
      if (inputRef.current) inputRef.current.focus();
    };
    
    // Tap the screen anywhere to "activate" the bluetooth listener
    window.addEventListener('touchstart', focusInput);
    window.addEventListener('click', focusInput);
    
    focusInput();

    return () => {
      window.removeEventListener('touchstart', focusInput);
      window.removeEventListener('click', focusInput);
    };
  }, []);

  const handleKeyDown = (e) => {
    // Bluetooth shutters often send 'Enter' or 'VolumeUp'
    // We prevent default to stop the page from jumping or showing volume HUD
    e.preventDefault();
    clickCount.current++;

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (clickCount.current === 1) onAction('POINT_A');
      else if (clickCount.current === 2) onAction('POINT_B');
      else if (clickCount.current === 3) onAction('UNDO');
      
      clickCount.current = 0;
    }, 300); 
  };

  return (
    <input
      ref={inputRef}
      onKeyDown={handleKeyDown}
      // Fixed: changed from absolute to fixed and added a z-index
      className="fixed opacity-0 pointer-events-none z-50 top-0 left-0"
      aria-hidden="true"
      autoFocus
      readOnly
    />
  );
}
