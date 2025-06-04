import React from 'react';
import { Link } from 'react-router-dom';

export default function FoWastelandScout() {
  return (
    <div className="p-4 space-y-4 text-center">
      <h1 className="text-2xl font-bold">Wasteland Scout</h1>
      <p>
        You spend days combing ruined buildings and dusty roads, gathering what
        supplies and rumors you can for your faction.
      </p>
      <Link to="/matrix-v1/fallout/data-terminal" className="text-blue-300 underline">
        Report your findings
      </Link>
    </div>
  );
}
