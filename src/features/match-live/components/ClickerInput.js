"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const clickCount = useRef(0);
  const timer = useRef(0);

  useEffect(() => {
    // 1. HID Keyboard Listener (Standard)
    const handleKeyDown = (e) => {
      if (["Enter", " ", "ArrowUp", "VolumeUp"].includes(e.key)) {
        e.preventDefault();
        registerClick();
      }
    };

    // 2. Volume Event Listener (Android/iOS Fallback)
    const handleVolume = () => {
      // Any volume change is treated as a single click
      onAction('POINT_A');
    };

    const registerClick = () => {
      clickCount.current++;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (clickCount.current === 1) onAction('POINT_A');
        else if (clickCount.current === 2) onAction('POINT_B');
        else if (clickCount.current === 3) onAction('UNDO');
        clickCount.current = 0;
      }, 350);
    };

    window.addEventListener('keydown', handleKeyDown);
    // Note: volumechange requires an active media element on some browsers
    window.addEventListener('volumechange', handleVolume);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('volumechange', handleVolume);
    };
  }, [onAction]);

  return (
    <div className="hidden">
      <input ref={inputRef} readOnly autoFocus />
      {/* Silent audio to 'prime' the volume listener */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=" loop />
    </div>
  );
}
