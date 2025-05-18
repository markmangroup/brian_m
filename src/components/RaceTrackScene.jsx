import React from 'react';

export default function RaceTrackScene({ crew }) {
  return (
    <div className="relative w-full space-y-8 mb-4 mt-2 px-2">
      {crew.map((member, idx) => {
        const leftPos = `calc(${Math.min(member.position / 15, 1) * 100}% - 20px)`;
        const trackColor = 'bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500';
        const bgGlow = 'bg-white/10 backdrop-blur-md';

        return (
          <div key={member.name} className="relative h-20 rounded-xl overflow-hidden shadow-inner">
            {/* Track background */}
            <div className={`absolute inset-0 ${bgGlow} rounded-xl`} />

            {/* Track line */}
            <div className={`absolute top-1/2 left-4 right-4 h-3 ${trackColor} rounded-full`} />

            {/* Start / Finish icons */}
            {idx === 0 && (
              <>
                <div className="absolute left-2 top-1 text-xl">🚩</div>
                <div className="absolute right-2 top-1 text-xl animate-bounce">🎯</div>
              </>
            )}

            {/* Racer Avatar */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ${member.fx || ''}`}
              style={{ left: leftPos }}
            >
              <div className="text-3xl select-none">{member.lastEmoji || '🙂'}</div>
              <div className="text-xs text-center text-white font-medium">{member.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
