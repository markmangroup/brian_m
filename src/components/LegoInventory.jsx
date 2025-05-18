import React, { useState } from 'react';
import { FaBox, FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';

const LegoInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'bricks',
    'plates',
    'tiles',
    'special',
  ];

  const inventory = [
    { id: 1, name: '2x4 Brick', category: 'bricks', color: 'green', quantity: 24 },
    { id: 2, name: '2x2 Brick', category: 'bricks', color: 'green', quantity: 36 },
    { id: 3, name: '1x4 Plate', category: 'plates', color: 'green', quantity: 48 },
    { id: 4, name: '1x2 Plate', category: 'plates', color: 'green', quantity: 60 },
    { id: 5, name: '1x1 Round', category: 'special', color: 'black', quantity: 100 },
    { id: 6, name: '6x8 Baseplate', category: 'plates', color: 'green', quantity: 10 },
  ];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-400 flex items-center gap-3">
          <FaBox /> LEGO Inventory
        </h1>
        <div className="flex gap-3">
          <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <FaFilter />
          </button>
          <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
            <FaSortAmountDown />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Search and Filters */}
        <div className="md:col-span-4">
          <div className="bg-gray-800 p-4 rounded-xl">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pieces..."
                  className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      selectedCategory === category
                        ? 'bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Grid */}
        {filteredInventory.map(item => (
          <div
            key={item.id}
            className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-400 capitalize">{item.category}</p>
              </div>
              <div className={`w-6 h-6 rounded-lg bg-${item.color}-500`} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-400">{item.quantity}</span>
              <button className="px-3 py-1 bg-blue-600 rounded-lg text-sm hover:bg-blue-500">
                Use
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegoInventory; 
