"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const audioRef = useRef(null);
  const lastVolume = useRef(0.5);
  const clickCount = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    // 1. HID Keyboard Listener (Standard)
    const handleKeyDown = (e) => {
      // Catch standard keys OR the specific 'VolumeUp' key string
      if (["Enter", " ", "ArrowUp", "VolumeUp", "VolumeDown"].includes(e.key)) {
        e.preventDefault();
        registerClick();
      }
    };

    // 2. Volume Event Listener (The Android "Workaround")
    const handleVolumeChange = (e) => {
      const currentVolume = e.target.volume;
      // If volume changed, someone pressed a hardware button
      if (currentVolume !== lastVolume.current) {
        registerClick();
        lastVolume.current = currentVolume;
      }
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
    
    // Logic to keep the hidden audio "active" for the listener
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('volumechange', handleVolumeChange);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (audio) audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [onAction]);

  return (
    <div className="hidden" aria-hidden="true">
      {/* Hidden input for keyboard focus */}
      <input type="text" autoFocus readOnly />
      {/* Silent audio loop to enable volume event tracking on Android */}
      <audio 
        ref={audioRef} 
        src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=" 
        loop 
        muted={false}
      />
    </div>
  );
}
