import React, { useState } from 'react';
import { FaHamburger, FaLaugh } from 'react-icons/fa';

const events = [
  { msg: 'A seagull steals your fries!', snack: -5 },
  { msg: 'Grandma hands you cookies ❤', snack: +8 },
  { msg: 'You dropped your slushie 😱', snack: -4 },
  { msg: 'Found pizza samples at the mall 🍕', snack: +6 },
  { msg: 'Sibling tax! You share some chips.', snack: -3 },
];

export default function SnackTrail() {
  const [crew, setCrew] = useState([
    { name: 'Brian', snacks: 20 },
    { name: 'Chris', snacks: 20 },
    { name: 'Mel',   snacks: 20 },          // renamed third player
  ]);
  const [day, setDay]   = useState(1);
  const [log, setLog]   = useState([]);

  const tick = () => {
    setCrew(prev =>
      prev.map(kid => {
        const ev = events[Math.floor(Math.random() * events.length)];
        const s  = Math.max(kid.snacks + ev.snack, 0);

        setLog(l => [
          { text: `${kid.name}: ${ev.msg} (${s} snacks left)`, day },
          ...l.slice(0, 5),
        ]);

        return { ...kid, snacks: s };
      })
    );
    setDay(d => d + 1);
  };

  const everyoneHungry = crew.every(k => k.snacks === 0);
  const goalReached    = day > 5 && !everyoneHungry;

  /* ---------- UI ---------- */
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-4xl font-extrabold text-yellow-400 flex items-center mb-6">
        <FaHamburger className="mr-3" /> Snack Trail
      </h1>

      <p className="text-yellow-300 mb-4">Day {day}</p>

      <div className="w-full max-w-md bg-gray-800/60 p-6 rounded-2xl space-y-4">
        {crew.map(kid => (
          <div key={kid.name} className="flex items-center">
            <span className="w-24 text-gray-300">{kid.name}</span>
            <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${kid.snacks * 5}%` }}
              />
            </div>
            <span className="ml-3 text-yellow-300 w-8 text-right">{kid.snacks}</span>
          </div>
        ))}
      </div>

      {!goalReached && !everyoneHungry && (
        <button
          onClick={tick}
          className="mt-6 w-40 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-lg"
        >
          Next Day
        </button>
      )}

      {(goalReached || everyoneHungry) && (
        <div className="text-center mt-6">
          <FaLaugh className="text-4xl mx-auto mb-2 text-yellow-300" />
          <p className="text-xl font-bold text-yellow-300">
            {goalReached
              ? '🎉 You made it to the arcade—snacks intact!'
              : '💀 Everyone ran out of snacks! Try again?'}
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

      <div className="w-full max-w-md h-28 overflow-y-auto bg-gray-900/50 p-3 rounded mt-6">
        {log.map((l, i) => (
          <p key={i} className="text-xs text-gray-400">
            Day {l.day}: {l.text}
          </p>
        ))}
      </div>
    </div>
  );
}