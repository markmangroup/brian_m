import React, { useState, useEffect } from 'react';
import { FaRobot, FaWrench, FaCog, FaBolt, FaMicrochip, FaMemory, FaHeart, FaShieldAlt } from 'react-icons/fa';

// Generate 800+ random robot parts
const PART_TYPES = ['Head', 'Arm', 'Leg', 'Sensor', 'Weapon', 'Booster', 'Core', 'Shield', 'Processor', 'Battery'];
const PART_ADJ = ['Mega', 'Ultra', 'Nano', 'Turbo', 'Quantum', 'Hyper', 'Stealth', 'Titan', 'Plasma', 'Cyber'];
const PART_NAMES = ['Blaster', 'Grip', 'Walker', 'Eye', 'Cannon', 'Jet', 'Shell', 'Brain', 'Pack', 'Guard'];

function randomStat() {
  return Math.floor(Math.random() * 21) + 10; // 10-30
}

function generateParts(n = 800) {
  const parts = [];
  for (let i = 0; i < n; i++) {
    const type = PART_TYPES[Math.floor(Math.random() * PART_TYPES.length)];
    const adj = PART_ADJ[Math.floor(Math.random() * PART_ADJ.length)];
    const name = PART_NAMES[Math.floor(Math.random() * PART_NAMES.length)];
    parts.push({
      id: i,
      name: `${adj} ${type} ${name}`,
      type,
      stats: {
        power: randomStat(),
        speed: randomStat(),
        intelligence: randomStat(),
        defense: randomStat(),
        health: randomStat() * 3
      }
    });
  }
  return parts;
}

const ALL_PARTS = generateParts(800);

const defaultRobots = [
  { name: 'Beep-Boop', color: 'emerald', icon: FaBolt,      stats: { power: 85, speed: 70, intelligence: 90, defense: 60, health: 100 }, parts: [] },
  { name: 'Pixel-8',   color: 'blue',    icon: FaMicrochip, stats: { power: 75, speed: 95, intelligence: 80, defense: 65, health: 100 }, parts: [] },
  { name: 'Circuit',   color: 'purple',  icon: FaMemory,    stats: { power: 90, speed: 85, intelligence: 95, defense: 70, health: 100 }, parts: [] }
];

const clamp = n => Math.min(n, 100);

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // log error if needed
  }
  render() {
    if (this.state.hasError) {
      return <div className="text-red-400 p-8 text-center">Robot Lab crashed: {this.state.error?.message || 'Unknown error'}</div>;
    }
    return this.props.children;
  }
}

const safeParse = (key, fallback) => {
  try {
    const saved = typeof window !== 'undefined' && localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const RobotLab = () => {
  const [robots, setRobots] = useState(() => safeParse('robots', defaultRobots));
  const [activeBot, setActiveBot] = useState(0);
  const [inventory, setInventory] = useState(() => safeParse('robotParts', ALL_PARTS.slice(0, 10)));
  const [level, setLevel] = useState(1);
  const [opponent, setOpponent] = useState(null);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [battleLog, setBattleLog] = useState([]);

  // Save robots and inventory to localStorage
  useEffect(() => {
    localStorage.setItem('robots', JSON.stringify(robots));
  }, [robots]);
  useEffect(() => {
    localStorage.setItem('robotParts', JSON.stringify(inventory));
  }, [inventory]);

  // Generate a new opponent for the current level
  useEffect(() => {
    const base = 70 + level * 5;
    setOpponent({
      name: `Level ${level} Bot`,
      color: 'red',
      icon: FaRobot,
      stats: {
        power: base + Math.floor(Math.random() * 10),
        speed: base + Math.floor(Math.random() * 10),
        intelligence: base + Math.floor(Math.random() * 10),
        defense: base + Math.floor(Math.random() * 10),
        health: 100 + level * 10
      },
      parts: []
    });
    setOpponentHealth(100 + level * 10);
    setPlayerHealth(robots[activeBot].stats.health);
    setBattleLog([]);
  }, [level, activeBot]);

  // Equip a part to the active robot
  const equipPart = (part) => {
    setRobots(prev => prev.map((bot, idx) => {
      if (idx !== activeBot) return bot;
      // Add part and boost stats
      const newParts = [...bot.parts, part];
      const newStats = { ...bot.stats };
      Object.keys(part.stats).forEach(stat => {
        newStats[stat] = clamp((newStats[stat] || 0) + part.stats[stat]);
      });
      return { ...bot, parts: newParts, stats: newStats };
    }));
    setInventory(inv => inv.filter(p => p.id !== part.id));
  };

  // Simulate a battle round
  const battleRound = () => {
    const player = robots[activeBot];
    const opp = opponent;
    // Simple damage formula
    const playerDmg = Math.max(5, player.stats.power + player.stats.intelligence - opp.stats.defense + Math.floor(Math.random() * 10));
    const oppDmg = Math.max(5, opp.stats.power + opp.stats.intelligence - player.stats.defense + Math.floor(Math.random() * 10));
    setOpponentHealth(h => Math.max(0, h - playerDmg));
    setPlayerHealth(h => Math.max(0, h - oppDmg));
    setBattleLog(log => [
      `You dealt ${playerDmg} damage!`,
      `Opponent dealt ${oppDmg} damage!`,
      ...log
    ]);
  };

  // Win/lose logic
  useEffect(() => {
    if (opponentHealth <= 0) {
      setBattleLog(log => [
        'You win! Advancing to next level... 🎉',
        ...log
      ]);
      setTimeout(() => setLevel(l => l + 1), 2000);
    } else if (playerHealth <= 0) {
      setBattleLog(log => [
        'You lost! Try again.',
        ...log
      ]);
      setTimeout(() => {
        setLevel(1);
        setPlayerHealth(robots[activeBot].stats.health);
        setOpponentHealth(100 + level * 10);
      }, 2000);
    }
  }, [opponentHealth, playerHealth, robots, activeBot, level]);

  // Add new parts to inventory after each win
  useEffect(() => {
    if (opponentHealth <= 0) {
      // Add 3 random new parts
      const newParts = [];
      for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * ALL_PARTS.length);
        newParts.push(ALL_PARTS[idx]);
      }
      setInventory(inv => [...newParts, ...inv]);
    }
  }, [opponentHealth]);

  /* +5 boost to all stats on active bot */
  const upgradeBot = () => {
    setRobots(prev =>
      prev.map((bot, idx) =>
        idx === activeBot
          ? {
              ...bot,
              stats: Object.fromEntries(
                Object.entries(bot.stats).map(([k, v]) => [k, clamp(v + 5)])
              )
            }
          : bot
      )
    );
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-emerald-400 mb-8 flex items-center">
          <FaRobot className="mr-4" /> Tank Evolution
        </h1>

        <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-emerald-500/20 w-full max-w-4xl">
          {/* Bot selector */}
          <div className="grid grid-cols-3 gap-6">
            {robots.length === 0 && <div className="col-span-3 text-gray-400">No robots found.</div>}
            {robots.map((robot, index) => {
              const color = robot.color || 'emerald';
              return (
                <div
                  key={robot.name}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    activeBot === index
                      ? `bg-${color}-500/20 border-2 border-${color}-500 shadow-lg shadow-${color}-500/20`
                      : 'bg-gray-700/30 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveBot(index)}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`text-${color}-400 text-5xl relative`}>
                      <FaCog className="animate-spin-slow absolute -left-4 -top-4 opacity-30" />
                      {robot.icon ? <robot.icon /> : <FaRobot />}
                      <FaCog className="animate-spin-slow absolute -right-4 -bottom-4 opacity-30" />
                    </div>
                    <h3 className={`text-${color}-400 font-bold text-xl`}>{robot.name}</h3>
                    <div className="flex items-center space-x-2">
                      <FaWrench className={`text-${color}-400`} />
                      <span className="text-gray-400">Level {index + 1}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inventory */}
          <div className="mt-8">
            <h4 className="text-emerald-400 font-bold mb-2">Inventory (Parts)</h4>
            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
              {inventory.length === 0 && <div className="text-gray-400 col-span-4">No parts in inventory.</div>}
              {inventory.map(part => (
                <div key={part.id} className="bg-gray-700 p-2 rounded-lg flex flex-col items-center">
                  <span className="text-xs text-gray-300 font-bold mb-1">{part.name}</span>
                  <span className="text-xs text-gray-400">{part.type}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Object.entries(part.stats).map(([k, v]) => (
                      <span key={k} className="text-emerald-300 text-xs">{k}: {v}</span>
                    ))}
                  </div>
                  <button
                    className="mt-2 px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded"
                    onClick={() => equipPart(part)}
                  >
                    Equip
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats panel and health bar */}
          {activeBot !== null && robots[activeBot] && (
            <div className={`mt-8 p-6 rounded-xl bg-${robots[activeBot].color || 'emerald'}-500/10 border border-${robots[activeBot].color || 'emerald'}-500/30`}>
              <h4 className={`text-${robots[activeBot].color || 'emerald'}-400 font-bold mb-4`}>Robot Stats</h4>
              <div className="flex items-center mb-4">
                <FaHeart className="text-red-400 mr-2" />
                <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-500"
                    style={{ width: `${playerHealth / (robots[activeBot].stats.health || 100) * 100}%` }}
                  />
                </div>
                <span className="ml-3 text-red-400">{playerHealth} / {robots[activeBot].stats.health || 100}</span>
              </div>
              <button
                onClick={upgradeBot}
                className={`mb-4 px-4 py-2 rounded-lg bg-${robots[activeBot].color || 'emerald'}-600 hover:bg-${robots[activeBot].color || 'emerald'}-700 text-white transition`}
              >
                Upgrade +
              </button>
              <div className="space-y-3">
                {Object.entries(robots[activeBot].stats).map(([stat, value]) => (
                  <div key={stat} className="flex items-center">
                    <span className="text-gray-400 capitalize w-24">{stat}</span>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${robots[activeBot].color || 'emerald'}-400 transition-all duration-500`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className={`text-${robots[activeBot].color || 'emerald'}-400 ml-3 w-8`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Opponent panel and health bar */}
          {opponent && (
            <div className="mt-8 p-6 rounded-xl bg-red-500/10 border border-red-500/30">
              <h4 className="text-red-400 font-bold mb-4">Opponent: {opponent.name}</h4>
              <div className="flex items-center mb-4">
                <FaHeart className="text-red-400 mr-2" />
                <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-500"
                    style={{ width: `${opponentHealth / (opponent.stats.health || 100) * 100}%` }}
                  />
                </div>
                <span className="ml-3 text-red-400">{opponentHealth} / {opponent.stats.health || 100}</span>
              </div>
              <div className="flex gap-2 mb-2">
                {opponent.icon ? <opponent.icon className="text-red-400" /> : <FaRobot className="text-red-400" />}
                <FaShieldAlt className="text-red-400" />
                <span className="text-gray-400">Level {level}</span>
              </div>
              <button
                onClick={battleRound}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
              >
                Battle!
              </button>
              <div className="mt-4 max-h-32 overflow-y-auto bg-gray-900/40 p-2 rounded text-xs text-gray-200">
                {battleLog.map((msg, i) => <div key={i}>{msg}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default RobotLab;