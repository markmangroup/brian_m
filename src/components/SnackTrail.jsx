import React, { useState, useEffect } from 'react';
import RaceTrackScene from './RaceTrackScene';
import { PRESET_EVENTS } from '../data/presetEvents';
import { DAY_FEATURES } from '../data/dayFeatures';

const TOTAL_DAYS = 15;
const DEFAULT_AVATARS = ['🧢', '🎧', '🐱'];

export default function SnackTrail() {
  const initialCrew = [
    { name: "Brian", snacks: 0, position: 0, lastEmoji: '', fx: '' },
    { name: "Chris", snacks: 0, position: 0, lastEmoji: '', fx: '' },
    { name: "Mel", snacks: 0, position: 0, lastEmoji: '', fx: '' }
  ];

  const [timeline, setTimeline] = useState([{ crew: initialCrew, log: [] }]);
  const [currentDay, setCurrentDay] = useState(0);
  const [title, setTitle] = useState("");
  const [arcadeMode, setArcadeMode] = useState(false);
  const [winner, setWinner] = useState(null);
  const [featurePopup, setFeaturePopup] = useState(null);

  const crew = timeline[currentDay].crew;
  const log = timeline.flatMap(day => day.log).slice(0, 8);

  useEffect(() => {
    if (winner) setArcadeMode(true);
  }, [winner]);

  useEffect(() => {
    if (featurePopup) {
      const timer = setTimeout(() => setFeaturePopup(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [featurePopup]);

  const extractEmoji = (text) => {
    const emojiRegex = /([\u231A-\uD83E\uDDFF])/;
    const match = text.match(emojiRegex);
    return match ? match[0] : "";
  };

  const handleNextDay = () => {
    const day = currentDay + 1;
    const prevCrew = timeline[currentDay].crew;
    const newCrew = prevCrew.map(member => ({ ...member }));
    const logsForThisDay = [];

    newCrew.forEach((member, idx) => {
      const event = PRESET_EVENTS[(day + idx) % PRESET_EVENTS.length];
      member.snacks = Math.max(member.snacks + event.snack, 0);
      member.position = Math.min(member.position + 1 + (Math.random() < 0.3 ? 1 : 0), TOTAL_DAYS);
      member.lastEmoji = event.emoji || DEFAULT_AVATARS[idx];
      member.fx = event.fx || '';
      logsForThisDay.push(`Day ${day}: ${member.name}: ${event.text} (Position: ${member.position}, Snacks: ${member.snacks})`);
    });

    const featureTag = DAY_FEATURES[day];
    if (featureTag) {
      setFeaturePopup(`⭐ ${featureTag.replace(/-/g, ' ').toUpperCase()}!`);
    }

    const reached = newCrew.find(m => m.position >= TOTAL_DAYS);
    if (reached && !winner) {
      setWinner(reached.name);
      logsForThisDay.unshift(`🏁 ${reached.name} has reached the Arcade Temple!`);
    }

    const achievedTitle = [
      { day: 5, title: "Trail Scout" },
      { day: 10, title: "Snack Survivor" }
    ].slice().reverse().find(t => day >= t.day);

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

  return (
    <div className={`${arcadeMode ? 'bg-purple-900 text-green-300 border-pink-500' : 'bg-gray-900 text-yellow-400'} p-4 pt-2 rounded-xl max-w-md mx-auto mt-2`}>

      {featurePopup && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-yellow-300 text-black px-4 py-2 rounded-full shadow-xl z-50 animate-pulse text-sm font-bold">
          {featurePopup}
        </div>
      )}

      <h2 className="text-xl font-bold flex items-center justify-center mb-1">🍔 Snack Trail</h2>
      <p className="text-center text-sm mb-3">Day {currentDay} of {TOTAL_DAYS}</p>

      <RaceTrackScene crew={crew} />

      {winner && (
        <div className="text-center text-lg font-bold text-pink-300 my-3">
          🎉 {winner} wins the race to the Arcade!
        </div>
      )}

      {title && (
        <div className="text-center mb-2">
          <span className="inline-block bg-yellow-500 text-gray-900 px-3 py-0.5 rounded-full text-xs font-semibold">
            🏅 {title}
          </span>
        </div>
      )}

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
          disabled={winner !== null || currentDay >= TOTAL_DAYS}
        >
          Next Day
        </button>
      </div>
    </div>
  );
}