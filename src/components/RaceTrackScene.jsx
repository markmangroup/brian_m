import React from 'react';

export default function RaceTrackScene({ crew }) {
  return (
    <div className="relative w-full space-y-6 mb-4 mt-2">
      {crew.map((member, idx) => {
        const leftPos = `calc(${Math.min(member.position / 15, 1) * 100}% - 20px)`;
        const trackColor = 'bg-gradient-to-r from-gray-600 to-gray-800';

        return (
          <div key={member.name} className="relative h-12">
            {/* Track line */}
            <div className={`absolute top-1/2 left-4 right-4 h-2 ${trackColor} rounded-full`} />

            {/* Start / End markers */}
            {idx === 0 && (
              <>
                <div className="absolute left-2 top-0 text-sm">🚩</div>
                <div className="absolute right-2 top-0 text-sm animate-bounce">🎯</div>
              </>
            )}

            {/* Avatar */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ${member.fx || ''}`}
              style={{ left: leftPos }}
            >
              <div className="text-2xl select-none">{member.lastEmoji || '🙂'}</div>
              <div className="text-xs text-center text-white font-medium">{member.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}