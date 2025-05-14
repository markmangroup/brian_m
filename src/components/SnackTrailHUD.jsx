import React from 'react';
import { WORLD_LORE } from '../data/worldLore';

export default function LoreDrawer({ section }) {
  if (section === 'lore') {
    return (
      <div>
        <p className="mb-2">{WORLD_LORE.setting}</p>
        <h3 className="font-semibold mb-1">Factions</h3>
        <ul className="list-disc pl-5 mb-4">
          {WORLD_LORE.factions.map((f, i) => (
            <li key={i}><strong>{f.name}</strong>: {f.traits}</li>
          ))}
        </ul>
        <h3 className="font-semibold mb-1">How to Play</h3>
        <ol className="list-decimal pl-5">
          {WORLD_LORE.rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </div>
    );
  }

  if (section === 'runners') {
    return (
      <div>
        <h3 className="font-semibold mb-2">Meet the Racers</h3>
        <ul className="space-y-2">
          <li>🧢 Brian — Leader of the Crunch Crew</li>
          <li>🎧 Chris — Tactician of the Sweet Scouts</li>
          <li>🐱 Mel — Underdog from the Fizz Force</li>
        </ul>
      </div>
    );
  }

  if (section === 'log') {
    return (
      <div>
        <h3 className="font-semibold mb-2">What’s Happened So Far</h3>
        <p>This section could show major game highlights, wins, losses, or event summaries.</p>
        <p>We can wire it to actual game data next.</p>
      </div>
    );
  }

  return null;
}