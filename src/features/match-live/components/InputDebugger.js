"use client";
import { useEffect, useState } from 'react';

export default function InputDebugger() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const handleAnyInput = (e) => {
      // Create a log entry for every keydown
      const newEntry = {
        key: e.key,
        code: e.code,
        timeStamp: Math.round(e.timeStamp),
        type: e.type
      };

      setLogs(prev => [newEntry, ...prev].slice(0, 5));
      
      // If we detect a volume key, try to highlight it
      if (e.key.includes('Volume')) {
        console.log("🚀 Hardware Volume Detected:", e.key);
      }
    };

    // 'true' triggers the capture phase, which is more robust on mobile
    window.addEventListener('keydown', handleAnyInput, true);
    return () => window.removeEventListener('keydown', handleAnyInput, true);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none flex flex-col gap-2">
      <div className="bg-black/80 border border-brand p-3 rounded-lg backdrop-blur-md">
        <p className="text-brand text-[10px] font-mono mb-2 uppercase tracking-widest">Input Monitor</p>
        <div className="space-y-1">
          {logs.length === 0 ? (
            <p className="text-white/40 text-[10px]">Waiting for clicks...</p>
          ) : (
            logs.map((log, i) => (
              <div key={log.timeStamp} className={`text-[10px] font-mono ${i === 0 ? 'text-white' : 'text-white/40'}`}>
                [{log.type}] Key: <span className="text-brand">{log.key}</span> | Code: {log.code}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
