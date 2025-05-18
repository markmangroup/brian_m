import React from 'react';

export default function GameOverScreen({ crew, reason, onRestart }) {
  const message = reason === 'outOfSnacks'
    ? 'Everyone ran out of snacks!'
    : 'The 15-day journey ended before anyone reached the Arcade Temple.';

  return (
    <div className="text-center p-6 space-y-6">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">Game Over</h2>
      <p className="text-lg text-white">{message}</p>

      <div className="bg-gray-800/70 p-4 rounded-lg shadow-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Final Standings</h3>
        <ul className="space-y-3">
          {crew.map((member, i) => (
            <li key={i} className="text-sm text-white flex justify-between items-center">
              <span>{member.name}</span>
              <span>Snacks: {member.snacks}</span>
              <span>Position: {member.position}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="mt-6 bg-yellow-400 text-black px-6 py-2 rounded-full font-bold shadow hover:bg-yellow-300"
      >
        Try Again
      </button>
    </div>
  );
}
