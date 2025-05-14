import React, { useState, useEffect } from 'react';

export default function SnackTrail() {
  const [crew, setCrew] = useState([
    { name: "Brian", snacks: 20, lastEmoji: "" },
    { name: "Chris", snacks: 20, lastEmoji: "" },
    { name: "Mel",   snacks: 15, lastEmoji: "" } // ← updated name
  ]);
  const [day, setDay] = useState(0);
  const [log, setLog] = useState([]);
  const [title, setTitle] = useState("");
  const [arcadeMode, setArcadeMode] = useState(false);
  const [sparkleMember, setSparkleMember] = useState(null);

  useEffect(() => {
    if (sparkleMember !== null) {
      const timer = setTimeout(() => setSparkleMember(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [sparkleMember]);

  const events = [
    { msg: 'You dropped your slushie 😱', snack: -3 },
    { msg: 'Grandma hands you cookies ❤️', snack: +4 },
    { msg: 'Sibling tax! You share some chips 😓', snack: -2 },
    { msg: 'Found candy on the ground 🍬', snack: +1 },
    { msg: 'Your ice cream melted 🍦😢', snack: -1 },
    { msg: 'A friend gave you snacks 🤗', snack: +2 },
    { msg: 'Your pet stole a snack 🐶', snack: -1 },
    { msg: 'You found a hidden stash of snacks 🎉', snack: +3 },
    { msg: 'You had to share with your sibling 🤝', snack: -2 },
    { msg: 'You sneak a snack from the pantry 🥷🍪', snack: +1 },
    { msg: 'Oops! You sat on a snack 😅', snack: -1 },
    { msg: 'You traded a snack for a toy 🤖', snack: -1 },
    { msg: 'Lucky day! You get an extra snack 🍀', snack: +1 }
  ];

  const titlesByDay = [
    { day: 5, title: "Trail Scout" },
    { day: 10, title: "Snack Survivor" },
    { day: 20, title: "Master Forager" }
  ];

  const extractEmoji = (message) => {
    const match = message.match(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}]/u);
    return match ? match[0] : "";
  };

  const triggerSparkle = (index) => {
    setSparkleMember(index);
  };

  const handleNextDay = () => {
    const nextDay = day + 1;
    setDay(nextDay);

    const logsForThisDay = [];
    let newCrew = crew.map(member => ({ ...member }));

    let eventTargets = [];
    newCrew.forEach((_, idx) => {
      if (Math.random() < 0.6) {
        eventTargets.push(idx);
      }
    });
    if (eventTargets.length === 0) {
      eventTargets.push(Math.floor(Math.random() * newCrew.length));
    }

    eventTargets.forEach(idx => {
      const member = newCrew[idx];
      const event = events[Math.floor(Math.random() * events.length)];
      const oldSnacks = member.snacks;
      const change = event.snack;
      let newSnacks = Math.max(oldSnacks + change, 0);
      newCrew[idx].snacks = newSnacks;
      newCrew[idx].lastEmoji = extractEmoji(event.msg);
      logsForThisDay.push(`Day ${nextDay}: ${member.name}: ${event.msg} (${newSnacks} snacks left)`);
      if (oldSnacks < 50 && newSnacks >= 50) {
        triggerSparkle(idx);
      }
    });

    const achievedTitle = titlesByDay.slice().reverse().find(t => nextDay >= t.day);
    if (achievedTitle && achievedTitle.title !== title) {
      setTitle(achievedTitle.title);
      logsForThisDay.unshift(`Day ${nextDay}: 🏅 Unlocked title: ${achievedTitle.title}!`);
    }

    if (!arcadeMode && nextDay >= 10) {
      setArcadeMode(true);
      logsForThisDay.unshift(`Day ${nextDay}: ✨ You've reached the Arcade! The world shifts into neon colors! ✨`);
    }

    setCrew(newCrew);
    setLog(prev => [...logsForThisDay, ...prev]); // ← newest on top
  };

  return (
    <div className={`${arcadeMode ? 'bg-purple-900 text-green-400 border-4 border-pink-500' : 'bg-gray-900 text-yellow-500'} p-4 rounded-xl max-w-md mx-auto mt-4`}>
      <h2 className="text-2xl font-bold flex items-center justify-center mb-4">
        <span className="mr-2">🍔</span> Snack Trail
      </h2>

      {title && (
        <div className="text-center mb-4">
          <span className="inline-block bg-yellow-500 text-gray-900 text-base px-3 py-1 rounded-full">
            🏅 {title}
          </span>
        </div>
      )}

      <div className="space-y-2 mb-4">
        {crew.map((member, index) => (
          <div key={index} className="relative flex items-center bg-gray-800 bg-opacity-50 rounded-lg px-3 py-2">
            <div className="w-1/2 flex items-center">
              <span className="font-semibold">{member.name}</span>
              {member.lastEmoji && <span className="ml-1">{member.lastEmoji}</span>}
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                <div className={`${arcadeMode ? 'bg-pink-500' : 'bg-yellow-500'} h-4`} style={{ width: `${Math.min(member.snacks, 100)}%` }}></div>
              </div>
              <span className="ml-3 text-sm font-medium">{member.snacks}</span>
              {member.snacks >= 50 && <span className="ml-1">🌟</span>}
            </div>
            {sparkleMember === index && (
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <span className="text-yellow-400 text-3xl animate-ping">✨</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={handleNextDay} 
        className={`w-full py-2 rounded-lg font-bold ${arcadeMode ? 'bg-pink-500 text-white animate-pulse' : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'}`}>
        Next Day
      </button>

      <div className="mt-4 max-h-40 overflow-y-auto text-sm space-y-1 text-gray-300">
        {log.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
}