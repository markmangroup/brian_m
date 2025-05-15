import React from 'react';

export default function VictoryScreen({ crew, winner, onRestart }) {
  return (
    <div className="text-center p-6 space-y-6">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">🏁 Race Complete!</h2>
      <p className="text-lg text-white">🎉 <strong>{winner}</strong> activated the Arcade Temple beacon first!</p>

      <div className="bg-gray-800/70 p-4 rounded-lg shadow-lg">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Final Standings</h3>
        <ul className="space-y-2">
          {crew.map((member, i) => (
            <li key={i} className="flex justify-between items-center text-sm text-white">
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
        Play Again
      </button>

      <p className="text-xs text-gray-400 italic mt-2">
        Will a new champion rise?
      </p>
    </div>
  );
}