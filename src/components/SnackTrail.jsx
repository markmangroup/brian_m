import React, { useState, useEffect } from 'react';

export default function SnackTrail() {
  // Initial crew of three with name, snacks, and an emoji placeholder for last event.
  const [crew, setCrew] = useState([
    { name: "Brian", snacks: 20, lastEmoji: "" },
    { name: "Chris", snacks: 20, lastEmoji: "" },
    { name: "Kid-You", snacks: 15, lastEmoji: "" }
  ]);
  const [day, setDay] = useState(0);
  const [log, setLog] = useState([]);
  const [title, setTitle] = useState("");
  const [arcadeMode, setArcadeMode] = useState(false);
  const [sparkleMember, setSparkleMember] = useState(null);

  // Effect to remove sparkle effect after a short duration
  useEffect(() => {
    if (sparkleMember !== null) {
      const timer = setTimeout(() => setSparkleMember(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [sparkleMember]);

  // List of possible random events (message and snack count change)
  const events = [
    { msg: "You dropped your slushie 😱", delta: -3 },
    { msg: "Grandma hands you cookies ❤️", delta: +4 },
    { msg: "Sibling tax! You share some chips 😓", delta: -2 },
    { msg: "Found candy on the ground 🍬", delta: +1 },
    { msg: "Your ice cream melted 🍦😢", delta: -1 },
    { msg: "A friend gave you snacks 🤗", delta: +2 },
    { msg: "Your pet stole a snack 🐶", delta: -1 },
    { msg: "You found a hidden stash of snacks 🎉", delta: +3 },
    { msg: "You had to share with your sibling 🤝", delta: -2 },
    { msg: "You sneak a snack from the pantry 🥷🍪", delta: +1 },
    { msg: "Oops! You sat on a snack 😅", delta: -1 },
    { msg: "You traded a snack for a toy 🤖", delta: -1 },
    { msg: "Lucky day! You get an extra snack 🍀", delta: +1 }
  ];

  // Title/badge thresholds by days survived
  const titlesByDay = [
    { day: 5, title: "Trail Scout" },
    { day: 10, title: "Snack Survivor" },
    { day: 20, title: "Master Forager" }
  ];

  // Helper to extract an emoji from an event message (returns first emoji found, or empty string if none)
  const extractEmoji = (message) => {
    const match = message.match(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}]/u);
    return match ? match[0] : "";
  };

  // Trigger a sparkle animation for a specific crew member index
  const triggerSparkle = (index) => {
    setSparkleMember(index);
  };

  // Handle advancing to the next day
  const handleNextDay = () => {
    const nextDay = day + 1;
    setDay(nextDay);

    // Prepare new log entries for this day
    const logsForThisDay = [];
    let newCrew = crew.map(member => ({ ...member })); // copy crew state

    // Determine which crew members have events this day
    let eventTargets = [];
    newCrew.forEach((member, idx) => {
      if (Math.random() < 0.6) {
        eventTargets.push(idx);
      }
    });
    // Ensure at least one event happens per day
    if (eventTargets.length === 0) {
      eventTargets.push(Math.floor(Math.random() * newCrew.length));
    }

    // Apply events to each chosen crew member
    eventTargets.forEach(idx => {
      const member = newCrew[idx];
      const event = events[Math.floor(Math.random() * events.length)];
      // Determine snack change
      const oldSnacks = member.snacks;
      const change = (typeof event.delta === "function") ? event.delta(member) : event.delta;
      let newSnacks = oldSnacks + change;
      if (newSnacks < 0) newSnacks = 0; // don't go below 0 snacks
      // Update the crew member's snacks and last event emoji
      newCrew[idx].snacks = newSnacks;
      newCrew[idx].lastEmoji = extractEmoji(event.msg);
      // Log the event
      logsForThisDay.push(`Day ${nextDay}: ${member.name}: ${event.msg} (${newSnacks} snacks left)`);
      // Check for snack milestone crossing (e.g., crossing 50 snacks)
      if (oldSnacks < 50 && newSnacks >= 50) {
        triggerSparkle(idx);
      }
    });

    // Check for title unlocks based on days survived
    const achievedTitle = titlesByDay.slice().reverse().find(t => nextDay >= t.day);
    if (achievedTitle && achievedTitle.title !== title) {
      setTitle(achievedTitle.title);
      logsForThisDay.push(`Day ${nextDay}: 🏅 Unlocked title: ${achievedTitle.title}!`);
    }

    // Check for Arcade mode activation (reached day 10)
    if (!arcadeMode && nextDay >= 10) {
      setArcadeMode(true);
      logsForThisDay.push(`Day ${nextDay}: ✨ You've reached the Arcade! The world shifts into neon colors! ✨`);
    }

    // Update state with new crew and appended log entries
    setCrew(newCrew);
    setLog(prevLog => [...prevLog, ...logsForThisDay]);
  };

  return (
    <div className={`${arcadeMode ? 'bg-purple-900 text-green-400 border-4 border-pink-500' : 'bg-gray-900 text-yellow-500'} p-4 rounded-xl max-w-md mx-auto mt-4`}>
      {/* Game Title */}
      <h2 className="text-2xl font-bold flex items-center justify-center mb-4">
        <span className="mr-2">🍔</span> Snack Trail
      </h2>

      {/* Unlocked Title/Badge Display */}
      {title && (
        <div className="text-center mb-4">
          <span className="inline-block bg-yellow-500 text-gray-900 text-base px-3 py-1 rounded-full">
            🏅 {title}
          </span>
        </div>
      )}

      {/* Crew Snack Status List */}
      <div className="space-y-2 mb-4">
        {crew.map((member, index) => (
          <div key={index} className="relative flex items-center bg-gray-800 bg-opacity-50 rounded-lg px-3 py-2">
            {/* Name and last event emoji */}
            <div className="w-1/2 flex items-center">
              <span className="font-semibold">{member.name}</span>
              {member.lastEmoji && <span className="ml-1">{member.lastEmoji}</span>}
            </div>
            {/* Snack count bar and number */}
            <div className="flex-1 flex items-center">
              <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                <div className={`${arcadeMode ? 'bg-pink-500' : 'bg-yellow-500'} h-4`} style={{ width: `${Math.min(member.snacks, 100)}%` }}></div>
              </div>
              <span className="ml-3 text-sm font-medium">{member.snacks}</span>
              {/* Badge icon for high snack count */}
              {member.snacks >= 50 && <span className="ml-1">🌟</span>}
            </div>
            {/* Sparkle animation overlay */}
            {sparkleMember === index && (
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <span className="text-yellow-400 text-3xl animate-ping">✨</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next Day button */}
      <button 
        onClick={handleNextDay} 
        className={`w-full py-2 rounded-lg font-bold ${arcadeMode ? 'bg-pink-500 text-white animate-pulse' : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'}`}>
        Next Day
      </button>

      {/* Event Log */}
      <div className="mt-4 max-h-40 overflow-y-auto text-sm space-y-1 text-gray-300">
        {log.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
}