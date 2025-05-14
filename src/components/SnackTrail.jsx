import React, { useState, useEffect } from 'react';
import TrailScenePlus from './TrailScenePlus';
import { PRESET_EVENTS } from '../data/presetEvents';
import RaceTrackScene from './RaceTrackScene';

const TOTAL_DAYS = 15;
const DEFAULT_AVATARS = ['🧢', '🎧', '🐱'];

export default function SnackTrail() {
  const initialCrew = [
    { name: "Brian", snacks: 20, lastEmoji: '' },
    { name: "Chris", snacks: 20, lastEmoji: '' },
    { name: "Mel", snacks: 20, lastEmoji: '' }
  ];

  const [timeline, setTimeline] = useState([{ crew: initialCrew, log: [] }]);
  const [currentDay, setCurrentDay] = useState(0);
  const [title, setTitle] = useState("");
  const [arcadeMode, setArcadeMode] = useState(false);
  const [sparkleMember, setSparkleMember] = useState(null);
  const [journeyComplete, setJourneyComplete] = useState(false);

  const crew = timeline[currentDay].crew;
  const log = timeline.flatMap(day => day.log).slice(0, 8);

  useEffect(() => {
    if (sparkleMember !== null) {
      const timer = setTimeout(() => setSparkleMember(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [sparkleMember]);

  const extractEmoji = (text) => {
    const emojiRegex = /([\u231A-\uD83E\uDDFF])/;
    const match = text.match(emojiRegex);
    return match ? match[0] : "";
  };

  const triggerSparkle = (index) => {
    setSparkleMember(index);
  };

  const handleNextDay = () => {
    const day = currentDay + 1;
    const prevCrew = timeline[currentDay].crew;
    const newCrew = prevCrew.map(member => ({ ...member }));
    const logsForThisDay = [];

    newCrew.forEach((member, idx) => {
      const event = PRESET_EVENTS[(day + idx) % PRESET_EVENTS.length];
      const oldSnacks = member.snacks;
      const newSnacks = Math.max(oldSnacks + event.snack, 0);
      member.snacks = newSnacks;
      member.lastEmoji = event.emoji || DEFAULT_AVATARS[idx];
      logsForThisDay.push(`Day ${day}: ${member.name}: ${event.text} (${newSnacks} snacks left)`);
      if (oldSnacks < 50 && newSnacks >= 50) {
        triggerSparkle(idx);
      }
    });

    if (!arcadeMode && day >= 10) setArcadeMode(true);
    if (day === TOTAL_DAYS) setJourneyComplete(true);

    const achievedTitle = titlesByDay.slice().reverse().find(t => day >= t.day);
    if (achievedTitle && achievedTitle.title !== title) {
      setTitle(achievedTitle.title);
      logsForThisDay.unshift(`🏅 Unlocked title: ${achievedTitle.title}!`);
    }

    setTimeline(prev => [...prev.slice(0, currentDay + 1), { crew: newCrew, log: logsForThisDay }]);
    setCurrentDay(day);
  };

  const handlePrevDay = () => {
    if (currentDay > 0) setCurrentDay(currentDay - 1);
  };

  const progressPercent = Math.min((currentDay / TOTAL_DAYS) * 100, 100);

  const titlesByDay = [
    { day: 5, title: "Trail Scout" },
    { day: 10, title: "Snack Survivor" }
  ];

  return (
    <div className={`${arcadeMode ? 'bg-purple-900 text-green-300 border-pink-500' : 'bg-gray-900 text-yellow-400'} p-4 pt-2 rounded-xl max-w-md mx-auto mt-2`}>

      <h2 className="text-xl font-bold flex items-center justify-center mb-1">🍔 Snack Trail</h2>
      <p className="text-center text-sm mb-3">Day {currentDay} of {TOTAL_DAYS}</p>

<RaceTrackScene crew={crew} />

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
              <span className="ml-1">{member.lastEmoji || DEFAULT_AVATARS[index]}</span>
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

      <div className="flex justify-between gap-2">
        <button
          onClick={handlePrevDay}
          className="w-1/2 py-2 rounded-md font-bold text-sm bg-gray-700 text-white disabled:opacity-50"
          disabled={currentDay === 0}
        >
          Previous Day
        </button>
        <button
          onClick={handleNextDay}
          className={`w-1/2 py-2 rounded-md font-bold text-sm ${arcadeMode ? 'bg-pink-500 text-white animate-pulse' : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'}`}
          disabled={journeyComplete || currentDay >= TOTAL_DAYS}
        >
          Next Day
        </button>
      </div>

      <div className="mt-4 max-h-36 overflow-y-auto text-sm space-y-1 text-gray-300 leading-snug">
        {log.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
}