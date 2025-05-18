import React, { useState } from 'react';
import { FaCube, FaUndo, FaRedo, FaSave, FaTrash } from 'react-icons/fa';

const LegoBuildMode = () => {
  const [selectedPiece, setSelectedPiece] = useState('2x4');
  const [selectedColor, setSelectedColor] = useState('#ff0000');

  const pieces = [
    { id: '2x4', name: '2x4 Brick', width: 4 },
    { id: '2x2', name: '2x2 Brick', width: 2 },
    { id: '1x4', name: '1x4 Plate', width: 4 },
    { id: '1x2', name: '1x2 Plate', width: 2 },
    { id: '1x1', name: '1x1 Round', width: 1 },
  ];

  const colors = [
    { id: 'red', value: '#ff0000', name: 'Red' },
    { id: 'green', value: '#00ff00', name: 'Green' },
    { id: 'blue', value: '#0000ff', name: 'Blue' },
    { id: 'yellow', value: '#ffff00', name: 'Yellow' },
    { id: 'black', value: '#000000', name: 'Black' },
  ];

  const turtleInstructions = [
    { step: 1, text: 'Start with a 6x8 green baseplate', pieces: ['2x4 green (3)'] },
    { step: 2, text: 'Add shell dome using 2x2 bricks', pieces: ['2x2 green (4)'] },
    { step: 3, text: 'Create legs with 1x2 plates', pieces: ['1x2 green (4)'] },
    { step: 4, text: 'Add head using 2x2 brick', pieces: ['2x2 green (1)'] },
    { step: 5, text: 'Finish with 1x1 round eyes', pieces: ['1x1 black (2)'] },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-400 flex items-center gap-3">
          <FaCube /> LEGO Build Mode
        </h1>
        <div className="flex gap-3">
          <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <FaUndo />
          </button>
          <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <FaRedo />
          </button>
          <button className="p-2 bg-green-600 rounded-lg hover:bg-green-500">
            <FaSave />
          </button>
          <button className="p-2 bg-red-600 rounded-lg hover:bg-red-500">
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Build Tools */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Build Tools</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">LEGO Pieces</h3>
              <div className="grid grid-cols-2 gap-2">
                {pieces.map(piece => (
                  <button
                    key={piece.id}
                    className={`p-2 rounded-lg text-sm ${
                      selectedPiece === piece.id
                        ? 'bg-green-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedPiece(piece.id)}
                  >
                    {piece.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2">Colors</h3>
              <div className="grid grid-cols-5 gap-2">
                {colors.map(color => (
                  <button
                    key={color.id}
                    className={`w-8 h-8 rounded-lg ${
                      selectedColor === color.value
                        ? 'ring-2 ring-white'
                        : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Build Area */}
        <div className="bg-gray-800 p-4 rounded-xl col-span-2">
          <h2 className="text-xl font-bold mb-4">Turtle Building Guide</h2>
          <div className="space-y-4">
            {turtleInstructions.map((instruction) => (
              <div 
                key={instruction.step}
                className="bg-gray-700 p-3 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-green-600 w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    {instruction.step}
                  </div>
                  <p>{instruction.text}</p>
                </div>
                <div className="text-sm text-gray-400">
                  Pieces needed: {instruction.pieces.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Building Grid */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Building Area</h2>
        <div className="grid grid-cols-12 gap-1 bg-gray-900 p-4 rounded-xl aspect-square">
          {Array(144).fill(null).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-800 rounded-sm hover:bg-gray-700 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegoBuildMode; 
