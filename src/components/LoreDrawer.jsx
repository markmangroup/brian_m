import React from 'react';
import { WORLD_LORE } from '../data/worldLore';

export default function LoreDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center">
      <div className="bg-white text-black max-w-sm w-full rounded-xl shadow-lg p-4 mx-4 relative overflow-y-auto max-h-[80vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-sm text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-2">{WORLD_LORE.title}</h2>
        <p className="text-sm mb-4">{WORLD_LORE.setting}</p>

        <h3 className="text-md font-semibold mb-1">Factions</h3>
        <ul className="list-disc pl-5 text-sm mb-3">
          {WORLD_LORE.factions.map((f, i) => (
            <li key={i}>
              <strong>{f.name}</strong>: {f.traits}
            </li>
          ))}
        </ul>

        <h3 className="text-md font-semibold mb-1">How to Play</h3>
        <ul className="list-decimal pl-5 text-sm">
          {WORLD_LORE.rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}