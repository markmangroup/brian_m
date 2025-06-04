import React from 'react';
import { Link } from 'react-router-dom';

export default function FoDataTerminal() {
  return (
    <div className="p-4 space-y-4 text-center">
      <h1 className="text-2xl font-bold">Abandoned Data Terminal</h1>
      <p>
        A flicker of static bursts from the dusty monitor. You decipher
        coordinates to an untouched vault hidden beyond the mountains.
      </p>
      <Link to="/matrix-v1/fallout/main-quest" className="text-blue-300 underline">
        Download the data
      </Link>
    </div>
  );
}
