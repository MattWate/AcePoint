"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const clickCount = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    // Force focus every time the user touches the screen
    window.addEventListener('touchstart', focusInput);
    window.addEventListener('click', focusInput);
    
    // Initial focus
    focusInput();

    return () => {
      window.removeEventListener('touchstart', focusInput);
      window.removeEventListener('click', focusInput);
    };
  }, []);

  const handleKeyDown = (e) => {
    // Android Clickers often send 'Enter', 'VolumeUp', or 'ArrowUp'
    if (["Enter", " ", "ArrowUp", "VolumeUp", "VolumeDown"].includes(e.key)) {
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

  return (
    <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        type="text"
        inputMode="none" // Prevents the software keyboard from popping up
        autoFocus
        className="opacity-0"
      />
      {/* This silent audio helps "keep alive" the hardware button bridge on some Android versions */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=" loop />
    </div>
  );
}
