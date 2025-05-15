import React from 'react';
import { WORLD_LORE } from '../data/worldLore';

export default function LoreDrawer({ section = 'lore' }) {
  if (section === 'lore') {
    return (
      <div className="space-y-4">
        <div>
          <p className="mb-2">{WORLD_LORE.setting}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Factions</h3>
          <ul className="list-disc pl-5 text-sm">
            {WORLD_LORE.factions.map((f, i) => (
              <li key={i}><strong>{f.name}</strong>: {f.traits}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-1">How to Play</h3>
          <ol className="list-decimal pl-5 text-sm">
            {WORLD_LORE.rules.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  if (section === 'runners') {
    return (
      <div className="space-y-2 text-sm">
        <h3 className="font-semibold mb-2">Meet the Racers</h3>
        <p>🧢 <strong>Brian</strong> — The calculated lead-off strategist of the Crunch Crew.</p>
        <p>🎧 <strong>Chris</strong> — Cool-headed and analytical, repping the Sweet Scouts.</p>
        <p>🐱 <strong>Mel</strong> — The stealthy wildcard from the Fizz Force.</p>
      </div>
    );
  }

  if (section === 'log') {
    return (
      <div className="space-y-2 text-sm">
        <h3 className="font-semibold mb-2">What’s Happened So Far</h3>
        <p>This is where dynamic highlights will appear as you progress—milestones, turns of fortune, and emerging leaders.</p>
        <p>Coming soon: full recap and decision map here.</p>
      </div>
    );
  }

  return <p className="text-gray-500 text-sm">No content available yet.</p>;
}