"use client";
import { useEffect, useRef } from 'react';

export default function ClickerInput({ onAction }) {
  const audioRef = useRef(null);
  const lastVolume = useRef(0.5);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVolumeChange = () => {
      const newVolume = audio.volume;
      
      // If the volume moved, the hardware button was likely pressed
      if (newVolume !== lastVolume.current) {
        // Map any volume movement to Point A for testing
        onAction('POINT_A');
        
        // Reset volume to middle to ensure we can detect the next move
        lastVolume.current = newVolume;
      }
    };

    // Chrome requires a user gesture (tap) to 'enable' audio monitoring
    const enableAudio = () => {
      audio.play().catch(() => {}); // Play silent pulse
      window.removeEventListener('touchstart', enableAudio);
    };

    window.addEventListener('touchstart', enableAudio);
    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      window.removeEventListener('touchstart', enableAudio);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [onAction]);

  return (
    <audio 
      ref={audioRef}
      className="hidden"
      src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="
      controls={false}
      loop
    />
  );
}
