import React, { useState } from 'react';
import { FaPaintBrush, FaEraser, FaSave } from 'react-icons/fa';

const PixelArtMaker = () => {
  const [selectedColor, setSelectedColor] = useState('#00ff00');
  const [tool, setTool] = useState('brush');
  
  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00',
    '#ff00ff', '#00ffff', '#ffffff', '#000000'
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8 flex items-center">
        <FaPaintBrush className="mr-4" /> Pixel Artist
      </h1>

      <div className="bg-gray-800/50 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
        <div className="flex space-x-4 mb-6">
          <div className="flex space-x-2">
            {colors.map(color => (
              <button
                key={color}
                className={`w-8 h-8 rounded-lg transition-transform ${
                  selectedColor === color ? 'transform scale-110 ring-2 ring-white' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <div className="border-l border-gray-600 mx-4" />

          <button
            className={`p-2 rounded-lg ${
              tool === 'brush' ? 'bg-cyan-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setTool('brush')}
          >
            <FaPaintBrush className="text-white" />
          </button>

          <button
            className={`p-2 rounded-lg ${
              tool === 'eraser' ? 'bg-cyan-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setTool('eraser')}
          >
            <FaEraser className="text-white" />
          </button>
        </div>

        <div className="grid grid-cols-16 gap-1 bg-gray-900 p-4 rounded-xl">
          {Array(256).fill(null).map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 bg-gray-800 rounded-sm hover:opacity-75 cursor-pointer"
              onClick={(e) => {
                e.target.style.backgroundColor = tool === 'eraser' ? '#1f2937' : selectedColor;
              }}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg">
            <FaSave />
            <span>Save Masterpiece</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PixelArtMaker; 