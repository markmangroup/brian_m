import React, { useState } from 'react';
import { FaRobot, FaWrench, FaCog, FaBolt, FaMicrochip, FaMemory } from 'react-icons/fa';

const RobotLab = () => {
  const [activeBot, setActiveBot] = useState(0);
  const robots = [
    { 
      name: 'Beep-Boop',
      color: 'emerald',
      icon: FaBolt,
      stats: { power: 85, speed: 70, intelligence: 90 }
    },
    { 
      name: 'Pixel-8',
      color: 'blue',
      icon: FaMicrochip,
      stats: { power: 75, speed: 95, intelligence: 80 }
    },
    { 
      name: 'Circuit',
      color: 'purple',
      icon: FaMemory,
      stats: { power: 90, speed: 85, intelligence: 95 }
    }
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8 flex items-center">
        <FaRobot className="mr-4" /> Robot Laboratory
      </h1>
      
      <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-emerald-500/20 w-full max-w-2xl">
        <div className="grid grid-cols-3 gap-6">
          {robots.map((robot, index) => (
            <div
              key={robot.name}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                activeBot === index 
                  ? `bg-${robot.color}-500/20 border-2 border-${robot.color}-500 shadow-lg shadow-${robot.color}-500/20` 
                  : 'bg-gray-700/30 hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveBot(index)}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`text-${robot.color}-400 text-5xl relative`}>
                  <FaCog className="animate-spin-slow absolute -left-4 -top-4 opacity-30" />
                  <robot.icon />
                  <FaCog className="animate-spin-slow absolute -right-4 -bottom-4 opacity-30" />
                </div>
                <h3 className={`text-${robot.color}-400 font-bold text-xl`}>{robot.name}</h3>
                <div className="flex items-center space-x-2">
                  <FaWrench className={`text-${robot.color}-400`} />
                  <span className="text-gray-400">Level {index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeBot !== null && (
          <div className={`mt-8 p-6 rounded-xl bg-${robots[activeBot].color}-500/10 border border-${robots[activeBot].color}-500/30`}>
            <h4 className={`text-${robots[activeBot].color}-400 font-bold mb-4`}>Robot Stats</h4>
            <div className="space-y-3">
              {Object.entries(robots[activeBot].stats).map(([stat, value]) => (
                <div key={stat} className="flex items-center">
                  <span className="text-gray-400 capitalize w-24">{stat}</span>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${robots[activeBot].color}-400 transition-all duration-500`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className={`text-${robots[activeBot].color}-400 ml-3 w-8`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RobotLab; 