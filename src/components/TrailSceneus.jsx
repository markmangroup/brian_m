import React from 'react';

export default function TrailScenePlus({ crew, day, arcadeMode }) {
  const maxSnacks = 50;
  const zone = day < 5 ? 'zone-start' : day < 10 ? 'zone-mid' : day < 15 ? 'zone-outpost' : 'zone-arcade';

  return (
    <div className={`relative h-24 w-full mb-4 mt-2 transition-colors duration-500 ${zone}`}>
      {/* Background trail */}
      <div className="absolute top-1/2 left-4 right-4 h-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" />

      {/* Milestone icons */}
      <div className="absolute top-[38%] left-[33%] text-xl animate-pulse">🏕️</div>
      <div className="absolute top-[38%] left-[66%] text-xl animate-pulse">⛺</div>
      <div className="absolute top-[38%] right-4 text-xl animate-bounce">🕹️</div>

      {/* Avatars */}
      {crew.map((member, idx) => {
        const percent = Math.min(member.snacks / maxSnacks, 1);
        const leftPos = `calc(${percent * 100}% - ${idx * 18}px)`;
        const offsetY = idx === 0 ? '-translate-y-4' : idx === 1 ? 'translate-y-1' : 'translate-y-4';
        const animateClass = member.snacks > 30 ? 'animate-bounce' : member.snacks < 10 ? 'animate-ping' : '';

        return (
          <div
            key={member.name}
            className={`absolute top-1/2 ${offsetY} -translate-x-1/2 transition-all duration-500 ${animateClass}`}
            style={{ left: leftPos }}
          >
            <div className="text-2xl select-none">
              {member.lastEmoji || '🙂'}
            </div>
            <div className="text-xs text-center text-white font-medium">
              {member.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}