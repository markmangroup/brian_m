import React from 'react';
import SnackTrail from './components/SnackTrail';
import SnackTrailHUD from './components/SnackTrailHUD';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SnackTrailHUD>
        <SnackTrail />
      </SnackTrailHUD>
    </div>
  );
}