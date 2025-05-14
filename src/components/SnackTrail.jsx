import React, { useState } from 'react';
import { FaHamburger, FaLaugh } from 'react-icons/fa';

/* tiny event pool – add more lines whenever the kids think of them */
const events = [
  { msg: "A seagull steals your fries!", snack: -5 },
  { msg: "Grandma hands you cookies ❤", snack: +8 },
  { msg: "You dropped your slushie 😱", snack: -4 },
  { msg: "Found pizza samples at the mall 🍕", snack: +6 },
  { msg: "Sibling tax! You share some chips.", snack: -3 },
];

export default function SnackTrail() {
  /* initial crew of three */
  const [crew, setCrew] = useState([
    { name: "Brian", snacks: 20 },
    { name: "Chris", snacks: 20 },
    { name: "Kid-You", snacks: 20 },
  ]);
  const [day, setDay] = useState(1);
  const [log, setLog] = useState([]);

  const tick = () => {
    /* pick random event per kid */
    setCrew(prev =>
      prev.map(kid => {
        const ev = events[Math.floor(Math.random() * events.length)];
        const s = Math.max(kid.snacks + ev.snack, 0);
        /* add to log */
        setLog(l => [
          { text: `${kid.name}: ${ev.msg} (${s} snacks left)`, day },
          ...l.slice(0, 5), // keep last 5 lines
        ]);
        return { ...kid, snacks: s };
      })
    );
    setDay(d => d + 1);
  };

  const everyoneHungry = crew.every(k => k.snacks === 0);
  const goalReached   = day > 5 && !everyoneHungry;

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold text-yellow-400 flex items-center">
        <FaHamburger className="mr-2" /> Snack Trail
      </h1>

      <div className="w-full max-w-sm bg-gray-800/60 p-4 rounded-xl space-y-3">
        {crew.map(kid => (
          <div key={kid.name} className="flex items-center">
            <span className="w-24 text-gray-300">{kid.name}</span>
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${kid.snacks * 5}%` }}
              />
            </div>
            <span className="ml-3 text-yellow-300">{kid.snacks}</span>
          </div>
        ))}
      </div>

      {!goalReached && !everyoneHungry && (
        <button
          onClick={tick}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-black font-semibold shadow-lg"
        >
          Next Day
        </button>
      )}

      {(goalReached || everyoneHungry) && (
        <div className="text-center">
          <FaLaugh className="text-4xl mx-auto mb-2 text-yellow-300" />
          <p className="text-xl font-bold text-yellow-300">
            {goalReached
              ? "🎉 You made it to the arcade—snacks intact!"
              : "💀 Everyone ran out of snacks! Try again?"}
          </p>
          <button
            onClick={() => {
              setCrew(crew.map(k => ({ ...k, snacks: 20 })));
              setDay(1);
              setLog([]);
            }}
            className="mt-3 px-4 py-1 bg-gray-700 rounded text-gray-200"
          >
            Restart
          </button>
        </div>
      )}

      {/* mini scrolling log */}
      <div className="w-full max-w-sm h-24 overflow-y-auto bg-gray-900/50 p-2 rounded">
        {log.map((l, i) => (
          <p key={i} className="text-xs text-gray-400">
            Day {l.day}: {l.text}
          </p>
        ))}
      </div>
    </div>
  );
}