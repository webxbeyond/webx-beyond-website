"use client";
import { useState } from 'react';

export default function NotFoundGame() {
  const [score, setScore] = useState(0);
  const [bugPos, setBugPos] = useState({ top: '60%', left: '70%' });

  function moveBug() {
    const top = Math.floor(Math.random() * 70 + 10) + '%';
    const left = Math.floor(Math.random() * 80 + 5) + '%';
    setBugPos({ top, left });
    setScore((s) => s + 1);
  }

  return (
    <>
      <div className="absolute right-8 top-8 bg-zinc-900 text-yellow-400 px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
        স্কোর: {score}
      </div>

      <span
        className="absolute text-4xl cursor-pointer transition-all duration-300 z-10 animate-bounce"
        role="img"
        aria-label="bug"
        style={{ top: bugPos.top, left: bugPos.left }}
        onClick={moveBug}
        title="বাগ ধরুন!"
      >
        🐛
      </span>
    </>
  );
}
