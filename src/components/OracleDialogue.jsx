import React from 'react';
import { CharacterDialogue } from './CharacterSystem';
import { useOracleDialogue } from '../hooks/useOracleDialogue';

/**
 * Display an oracle dialogue sequence from worlds.json.
 */
export default function OracleDialogue({ nodeId = 'matrix-oracle-seekers' }) {
  const { dialogue, options } = useOracleDialogue(nodeId);

  return (
    <div className="space-y-4">
      {dialogue.map((line, idx) => (
        <CharacterDialogue
          key={idx}
          characterKey="oracle"
          text={line.text}
          className={line.tone === 'cryptic' ? 'italic' : ''}
        />
      ))}
      {options.length > 0 && (
        <div className="mt-4 space-y-2 text-sm">
          {options.map((opt, i) => (
            <div key={i} className="text-blue-300">
              {opt.prompt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
