import React, { useEffect } from 'react';
import { useTheme } from '../../theme/ThemeContext';

export default function TrialOfReflection() {
  const { setWorld } = useTheme();

  useEffect(() => {
    setWorld('witcher');
  }, [setWorld]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Trial of Reflection</h1>
        <p>This page is a placeholder for future content.</p>
      </div>
    </div>
  );
}
