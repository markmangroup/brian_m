import React from 'react';

export default function TrailScene({ crew, day }) {
  const maxSnacks = 50;

  return (
    <div className="relative h-24 w-full mb-4 mt-2">
      {/* Trail line */}
      <div className="absolute top-1/2 left-4 right-4 h-2 bg-gray-600 rounded-full" />

      {/* Milestones */}
      <div className="absolute top-[38%] left-[33%] text-xl">🏕</div>️</div></div></div>
      <div className="absolute top-[38%] left-[66%] text-xl">⛺</div>
      <div className="absolute top-[38%] right-4 text-xl">🕹</div>️</div></div>

      {/* Avatars based on snack performance */}
      {crew.map((member, idx) => {
        const percent = Math.min(member.snacks / maxSnacks, 1);
        const leftPos = `calc(${percent * 100}% - ${idx * 16}px)`;
        const offsetY = idx === 0 ? '-translate-y-4' : idx === 1 ? 'translate-y-1' : 'translate-y-4';

        return (
          <div
            key={member.name}
            className={`absolute top-1/2 ${offsetY} -translate-x-1/2 transition-all duration-500`}
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
