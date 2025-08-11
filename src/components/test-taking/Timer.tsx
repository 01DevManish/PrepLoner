// src/components/test-taking/Timer.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

interface TimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
}

export default function Timer({ initialMinutes, onTimeUp }: TimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 font-semibold text-lg">
      <FiClock />
      <span>Time Left: {formatTime()}</span>
    </div>
  );
}