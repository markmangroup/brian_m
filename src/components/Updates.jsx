import React, { useState } from 'react';
import { FaBug } from 'react-icons/fa';
import { ANNOUNCEMENTS } from '../data/announcements';

export default function Updates() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-indigo-400 flex items-center gap-3">
        <FaBug /> Updates
      </h1>
      <div className="space-y-3">
        {ANNOUNCEMENTS.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex justify-between items-center p-3 text-left font-semibold hover:bg-gray-700 focus:outline-none"
            >
              <span>{item.title}</span>
              <span className="text-xl">{openId === item.id ? '−' : '+'}</span>
            </button>
            {openId === item.id && (
              <div className="p-3 pt-0 text-sm text-gray-300 space-y-2">
                <p>{item.message}</p>
                {item.details && <p className="text-gray-400">{item.details}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
