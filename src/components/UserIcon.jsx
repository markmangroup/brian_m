import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { FaUserCircle } from 'react-icons/fa';

export default function UserIcon({ className = '' }) {
  const { userName, setUserName } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userName || '');

  const save = () => {
    const trimmed = nameInput.trim();
    if (trimmed) setUserName(trimmed);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className={`fixed top-2 right-2 z-50 bg-white/90 rounded-full px-2 py-1 backdrop-blur-md flex items-center space-x-2 ${className}`}>
        <input
          autoFocus
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
          placeholder="Your name"
        />
        <button onClick={save} className="text-sm font-semibold text-blue-600">OK</button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className={`fixed top-2 right-2 z-50 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center text-gray-800 backdrop-blur-md ${className}`}
    >
      {userName ? (
        <span className="font-bold">{userName.charAt(0).toUpperCase()}</span>
      ) : (
        <FaUserCircle size={24} />
      )}
    </button>
  );
}
