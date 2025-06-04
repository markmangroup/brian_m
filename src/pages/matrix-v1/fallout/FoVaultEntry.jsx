import React from 'react';
import { Link } from 'react-router-dom';

export default function FoVaultEntry() {
  return (
    <div className="p-4 space-y-4 text-center">
      <h1 className="text-2xl font-bold">Emerging from the Vault</h1>
      <p>
        The heavy door slides shut behind you. Sunlight burns your eyes as you
        take your first breath of the surface world. The wastes sprawl out in
        ruins and opportunity.
      </p>
      <Link to="/matrix-v1/fallout/faction-choice" className="text-blue-300 underline">
        Step into the wasteland
      </Link>
    </div>
  );
}
