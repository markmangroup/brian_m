import React from 'react';

export default function TrailScenePlus({ crew, day, arcadeMode }) {
  const maxSnacks = 50;
  const zone = day < 5 ? 'zone-start' : day < 10 ? 'zone-mid' : day < 15 ? 'zone-outpost' : 'zone-arcade';

  return (
    <div className={`relative w-full mb-4 mt-2 space-y-6 transition-colors duration-500 ${zone}`}>
      {crew.map((member, idx) => {
        const percent = Math.min(member.snacks / maxSnacks, 1);
        const leftPos = `calc(${percent * 100}% - 20px)`;
        const lineOffset = idx * 48 + 16;
const animateClass = member.fx || '';

        return (
          <div key={member.name} className="relative h-12">
            {/* Track line */}
            <div className="absolute top-1/2 left-4 right-4 h-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full" />

            {/* Milestones */}
            {idx === 0 && <div className="absolute top-0 left-[33%] text-sm animate-pulse">🏕️</div>}
            {idx === 0 && <div className="absolute top-0 left-[66%] text-sm animate-pulse">⛺</div>}
            {idx === 0 && <div className="absolute top-0 right-4 text-sm animate-bounce">🕹️</div>}

            {/* Avatar */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ${animateClass}`}
              style={{ left: leftPos }}
            >
              <div className="text-2xl select-none">
                {member.lastEmoji || '🙂'}
              </div>
              <div className="text-xs text-center text-white font-medium">
                {member.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
