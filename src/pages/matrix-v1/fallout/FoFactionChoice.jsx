import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FoFactionChoice() {
  const navigate = useNavigate();

  const goNext = () => navigate('/matrix-v1/fallout/wasteland-scout');

  return (
    <div className="p-4 space-y-4 text-center">
      <h1 className="text-2xl font-bold">Choose Your Allegiance</h1>
      <p>Three groups vie for your skills. Whose banner will you carry?</p>

      <div className="space-y-2">
        <button onClick={goNext} className="px-4 py-2 bg-gray-700 rounded">Brotherhood of Steel</button>
        <button onClick={goNext} className="px-4 py-2 bg-gray-700 rounded">Raiders</button>
        <button onClick={goNext} className="px-4 py-2 bg-gray-700 rounded">Stay Independent</button>
      </div>
    </div>
  );
}
