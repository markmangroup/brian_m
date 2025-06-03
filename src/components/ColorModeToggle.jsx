import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useColorMode } from '../theme/ColorModeContext';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button
      onClick={toggleColorMode}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full border border-gray-300 bg-white text-gray-800 shadow"
    >
      {colorMode === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ColorModeToggle;
