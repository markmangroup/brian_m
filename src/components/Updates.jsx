import React from 'react';
import { FaBug } from 'react-icons/fa';
import { ANNOUNCEMENTS } from '../data/announcements';

export default function Updates() {
  return (
    <div className="p-6 flex flex-col space-y-6">
      <h1 className="text-3xl font-bold text-indigo-400 flex items-center gap-3">
        <FaBug /> Updates
      </h1>
      <div className="space-y-4">
        {ANNOUNCEMENTS.map((item) => (
          <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="font-bold mb-1">{item.title}</div>
            <p className="text-gray-300 text-sm">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
