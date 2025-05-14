import React, { useState, useEffect } from 'react';

const TOTAL_DAYS = 15;

export default function SnackTrail() {
  const [crew, setCrew] = useState([
    { name: "Brian", snacks: 20, lastEmoji: "" },
    { name: "Chris", snacks: 20, lastEmoji: "" },
    { name: "Mel",   snacks: 20, lastEmoji: "" }
  ]);
  const [day, setDay] = useState(0);
  const [log, setLog] = useState([]);
  const [title, setTitle] = useState("");
  const [arcadeMode, setArcadeMode] = useState(false);
  const [sparkleMember, setSparkleMember] = useState(null);
  const [journeyComplete, setJourneyComplete] = useState(false);

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
    { msg: 'You sneak a snack from the pantry 🥷🍪', snack: +1 },
    { msg: 'Oops! You sat on a snack 😅', snack: -1 },
    { msg: 'You traded a snack for a toy 🤖', snack: -1 },
    { msg: 'Lucky day! You get an extra snack 🍀', snack: +1 }
  ];

  const titlesByDay = [
    { day: 5, title: "Trail Scout" },
    { day: 10, title: "Snack Survivor" }
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
      if (Math.random() < 0.6) eventTargets.push(idx);
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
      logsForThisDay.unshift(`🏅 Unlocked title: ${achievedTitle.title}!`);
    }

    if (!arcadeMode && nextDay === 10) {
      setArcadeMode(true);
      logsForThisDay.unshift(`✨ You’ve reached the Outpost! Neon lights flicker... ✨`);
    }

    if (nextDay === TOTAL_DAYS) {
      setJourneyComplete(true);
      logsForThisDay.unshift(`🕹️ You made it to the Arcade! Ultimate snack victory!`);
    }

    setCrew(newCrew);
    setLog(prev => [...logsForThisDay, ...prev]);
  };

  const progressPercent = Math.min((day / TOTAL_DAYS) * 100, 100);

  return (
    <div className={`${arcadeMode ? 'bg-purple-900 text-green-300 border-pink-500' : 'bg-gray-900 text-yellow-400'} p-4 pt-2 rounded-xl max-w-md mx-auto mt-2`}>

      <h2 className="text-xl font-bold flex items-center justify-center mb-1">🍔 Snack Trail</h2>
      <p className="text-center text-sm mb-3">Day {day} of {TOTAL_DAYS}</p>

      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-3 relative">
        <div className="bg-green-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        <div className="absolute left-[33%] -top-4 text-sm">🏕️</div>
        <div className="absolute left-[66%] -top-4 text-sm">⛺</div>
        <div className="absolute right-0 -top-4 text-sm">🕹️</div>
      </div>

      {title && (
        <div className="text-center mb-2">
          <span className="inline-block bg-yellow-500 text-gray-900 px-3 py-0.5 rounded-full text-xs font-semibold">
            🏅 {title}
          </span>
        </div>
      )}

      <div className="space-y-1.5 mb-3">
        {crew.map((member, index) => (
          <div key={index} className="relative flex items-center bg-gray-800/60 rounded-lg px-3 py-1.5">
            <div className="w-1/2 flex items-center text-sm font-medium">
              {member.name}
              {member.lastEmoji && <span className="ml-1">{member.lastEmoji}</span>}
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                <div className={`${arcadeMode ? 'bg-pink-500' : 'bg-yellow-500'} h-3`} style={{ width: `${Math.min(member.snacks, 100)}%` }}></div>
              </div>
              <span className="ml-2 text-xs">{member.snacks}</span>
              {member.snacks >= 50 && <span className="ml-1">🌟</span>}
            </div>
            {sparkleMember === index && (
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <span className="text-yellow-400 text-2xl animate-ping">✨</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {journeyComplete ? (
        <div className="text-center text-lg font-bold mt-4 mb-2 text-pink-300">🎉 You reached the Arcade!</div>
      ) : (
        <button 
          onClick={handleNextDay} 
          className={`w-full py-2 rounded-md font-bold text-sm ${arcadeMode ? 'bg-pink-500 text-white animate-pulse' : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'}`}>
          Next Day
        </button>
      )}

      <div className="mt-4 max-h-36 overflow-y-auto text-sm space-y-1 text-gray-300 leading-snug">
        {log.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
}