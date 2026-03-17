"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const inputRef = useRef(null);
  const clickCount = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    // 1. Force Focus on every interaction
    const lockFocus = () => {
      setTimeout(() => inputRef.current?.focus(), 50);
    };

    // 2. The Robust Interceptor (Capture Phase)
    const handleCapture = (e) => {
      const keys = ["AudioVolumeUp", "AudioVolumeDown", "VolumeUp", "VolumeDown", "Enter", " "];
      
      if (keys.includes(e.key)) {
        // e.stopImmediatePropagation() prevents other scripts from seeing this
        e.stopImmediatePropagation();
        e.preventDefault(); 
        
        registerAction();
      }
    };

    const registerAction = () => {
      clickCount.current++;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (clickCount.current === 1) onAction('POINT_A');
        else if (clickCount.current === 2) onAction('POINT_B');
        else if (clickCount.current === 3) onAction('UNDO');
        clickCount.current = 0;
      }, 350);
    };

    // Use 'true' for the capture phase to grab the event first
    window.addEventListener('keydown', handleCapture, true);
    window.addEventListener('touchstart', lockFocus);
    
    lockFocus();

    return () => {
      window.removeEventListener('keydown', handleCapture, true);
      window.removeEventListener('touchstart', lockFocus);
    };
  }, [onAction]);

  useEffect(() => {
  const handleVolume = () => {
    // If we haven't received a keydown event in 50ms, assume it was blocked
    // and trigger a fallback Point A
    onAction('POINT_A');
  };

  window.addEventListener('volumechange', handleVolume);
  return () => window.removeEventListener('volumechange', handleVolume);
}, [onAction]);

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="none"
      className="fixed opacity-0 pointer-events-none inset-0 z-[9999]"
      readOnly
    />
  );
}
