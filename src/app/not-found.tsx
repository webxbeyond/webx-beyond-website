"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [score, setScore] = useState(0);
  const [bugPos, setBugPos] = useState({ top: '60%', left: '70%' });

  function moveBug() {
    const top = Math.floor(Math.random() * 70 + 10) + '%';
    const left = Math.floor(Math.random() * 80 + 5) + '%';
    setBugPos({ top, left });
    setScore((s) => s + 1);
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-700 text-white overflow-hidden">
      {/* Animated floating emojis */}
      <span className="animate-bounce text-7xl mb-4" role="img" aria-label="404 robot">🤖</span>
      <span className="absolute left-10 top-20 animate-bounce text-4xl" role="img" aria-label="alien">👽</span>
      <span className="absolute left-1/2 top-3/4 animate-bounce text-3xl" role="img" aria-label="cog">⚙️</span>
      {/* Bug game */}
      <span
        className="absolute text-4xl cursor-pointer transition-all duration-300 z-10 animate-bounce"
        role="img"
        aria-label="bug"
        style={{ top: bugPos.top, left: bugPos.left }}
        onClick={moveBug}
        title="Catch the bug!"
      >🐛</span>
      <div className="absolute right-8 top-8 bg-zinc-900 text-yellow-400 px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
        Score: {score}
      </div>
      <h1 className="text-4xl font-extrabold mb-4 mt-8">404: Page Not Found</h1>
      <p className="text-2xl mb-6">
        <span className="font-semibold">Oops!</span> Our robot lost your page in the quantum realm.<br />
        <span className="text-yellow-400 text-lg">&quot;If at first you don&apos;t succeed, call IT!&quot;</span>
      </p>
      <p className="text-lg mb-8">
  Maybe the page was abducted by aliens, or it&apos;s just hiding from bugs.<br />
  Meanwhile, our robot is debugging the matrix...
      </p>
      <Link href="/">
        <button className="px-6 py-3 rounded-lg bg-yellow-400 text-zinc-900 font-semibold shadow hover:bg-yellow-300 transition">
          Beam Me Home 🚀
        </button>
      </Link>
    </div>
  );
}
