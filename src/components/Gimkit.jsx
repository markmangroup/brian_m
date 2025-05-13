import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  FaCoins, FaHeart, FaStore, FaBolt, FaShieldAlt, 
  FaMoneyBill, FaClock, FaPercent, FaTimesCircle,
  FaFire, FaStar, FaUser, FaCrown, FaGem, FaDragon,
  FaGhost, FaRobot, FaTrophy, FaSpinner, FaRocket,
  FaChartLine, FaShieldVirus, FaInfinity, FaPencilAlt, 
  FaTimes, FaUsers, FaBomb, FaUserNinja, FaHatWizard, 
  FaFeather, FaAngellist, FaSkull, FaBug, FaSpaceShuttle,
  FaUserAstronaut
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Game modes with descriptions
const GAME_MODES = {
  CLASSIC: {
    name: 'Classic',
    description: 'Answer questions to earn money and buy upgrades',
    icon: FaCoins
  },
  TRUST_NO_ONE: {
    name: 'Trust No One',
    description: 'Some players are impostors trying to sabotage others',
    icon: FaGhost
  },
  TEAM_MODE: {
    name: 'Team Mode',
    description: 'Work together to reach a collective goal',
    icon: FaUsers
  },
  DRAW_THAT: {
    name: 'Draw That!',
    description: 'Draw and guess pictures to earn points',
    icon: FaPencilAlt
  }
};

// Shop categories
const SHOP_CATEGORIES = {
  UPGRADES: 'upgrades',
  POWERUPS: 'powerups',
  COSMETICS: 'cosmetics',
  CONSUMABLES: 'consumables'
};

// Add this before the UPGRADES constant
const existingUpgrades = {
  moneyPerQuestion: {
    name: "Money Per Question",
    levels: [
      { cost: 0, value: 1, color: 'gray' },
      { cost: 10, value: 5, color: 'green' },
      { cost: 100, value: 50, color: 'blue' },
      { cost: 1000, value: 100, color: 'purple' },
      { cost: 10000, value: 500, color: 'orange' },
      { cost: 75000, value: 2000, color: 'red' },
      { cost: 300000, value: 10000, color: 'pink' },
      { cost: 1000000, value: 50000, color: 'yellow' }
    ],
    icon: FaMoneyBill,
    description: "Earn more money for each correct answer"
  },
  streakBonus: {
    name: "Streak Bonus",
    levels: [
      { cost: 0, value: 1, color: 'gray' },
      { cost: 50, value: 1.5, color: 'green' },
      { cost: 500, value: 2, color: 'blue' },
      { cost: 5000, value: 3, color: 'purple' },
      { cost: 50000, value: 4, color: 'orange' },
      { cost: 250000, value: 5, color: 'red' }
    ],
    icon: FaFire,
    description: "Multiply earnings on answer streaks"
  },
  multiplier: {
    name: "Multiplier",
    levels: [
      { cost: 0, value: 1, color: 'gray' },
      { cost: 100, value: 2, color: 'green' },
      { cost: 1000, value: 5, color: 'blue' },
      { cost: 10000, value: 10, color: 'purple' },
      { cost: 100000, value: 25, color: 'orange' },
      { cost: 1000000, value: 50, color: 'red' }
    ],
    icon: FaBolt,
    description: "Multiply all your earnings"
  },
  insurance: {
    name: "Insurance",
    levels: [
      { cost: 0, value: 0, color: 'gray' },
      { cost: 10, value: 0.5, color: 'green' },
      { cost: 250, value: 0.75, color: 'blue' },
      { cost: 1000, value: 0.9, color: 'purple' },
      { cost: 10000, value: 1, color: 'orange' }
    ],
    icon: FaShieldAlt,
    description: "Keep more money when answering incorrectly"
  }
};

// Update UPGRADES definition
const UPGRADES = {
  ...existingUpgrades,
  interestRate: {
    name: "Interest Rate",
    levels: [
      { cost: 0, value: 0, color: 'gray' },
      { cost: 1000, value: 0.1, color: 'green' },
      { cost: 10000, value: 0.2, color: 'blue' },
      { cost: 100000, value: 0.3, color: 'purple' },
      { cost: 1000000, value: 0.5, color: 'orange' }
    ],
    icon: FaPercent,
    description: "Earn passive income based on your current balance"
  },
  moneyPerSecond: {
    name: "Money Per Second",
    levels: [
      { cost: 0, value: 0, color: 'gray' },
      { cost: 500, value: 1, color: 'green' },
      { cost: 5000, value: 5, color: 'blue' },
      { cost: 50000, value: 25, color: 'purple' },
      { cost: 500000, value: 100, color: 'orange' }
    ],
    icon: FaClock,
    description: "Earn money automatically every second"
  },
  streakProtection: {
    name: "Streak Protection",
    levels: [
      { cost: 0, value: 0, color: 'gray' },
      { cost: 2000, value: 1, color: 'green' },
      { cost: 20000, value: 2, color: 'blue' },
      { cost: 200000, value: 3, color: 'purple' }
    ],
    icon: FaShieldAlt,
    description: "Keep your streak on wrong answers"
  }
};

// Power-ups that appear during gameplay
const POWER_UPS = [
  { 
    name: "Speed Boost",
    duration: 15,
    effect: "2x answer speed points",
    icon: FaRocket,
    color: 'yellow',
    cost: 5000
  },
  {
    name: "Money Rain",
    duration: 10,
    effect: "3x money per question",
    icon: FaCoins,
    color: 'green',
    cost: 7500
  },
  {
    name: "Shield",
    duration: 20,
    effect: "No money loss on wrong answers",
    icon: FaShieldVirus,
    color: 'blue',
    cost: 10000
  },
  {
    name: "Infinite Streak",
    duration: 8,
    effect: "Streak doesn't reset on wrong answers",
    icon: FaInfinity,
    color: 'purple',
    cost: 15000
  },
  {
    name: "Double XP",
    duration: 30,
    effect: "Earn double XP for all actions",
    icon: FaStar,
    color: 'yellow',
    cost: 20000
  },
  {
    name: "Time Freeze",
    duration: 10,
    effect: "Extra time to answer questions",
    icon: FaClock,
    color: 'cyan',
    cost: 25000
  }
];

// Add consumable items
const CONSUMABLES = [
  {
    name: "Extra Life",
    effect: "Restore 1 life",
    icon: FaHeart,
    color: 'red',
    cost: 50000
  },
  {
    name: "Money Bomb",
    effect: "Instantly earn 50% of your current money",
    icon: FaBomb,
    color: 'yellow',
    cost: 100000
  },
  {
    name: "Streak Saver",
    effect: "Save your streak once",
    icon: FaShieldAlt,
    color: 'blue',
    cost: 75000
  }
];

// Add character skins with animations
const CHARACTER_SKINS = {
  default: {
    name: "Student",
    icon: FaUser,
    color: 'gray',
    cost: 0,
    animation: 'none',
    description: "Basic student character"
  },
  premium: {
    name: "King",
    icon: FaCrown,
    color: 'yellow',
    cost: 100000,
    animation: 'float',
    description: "Royal character with floating crown"
  },
  robot: {
    name: "Robot",
    icon: FaRobot,
    color: 'blue',
    cost: 250000,
    animation: 'blink',
    description: "Mechanical character with blinking lights"
  },
  ghost: {
    name: "Ghost",
    icon: FaGhost,
    color: 'purple',
    cost: 500000,
    animation: 'fade',
    description: "Spooky character that fades in and out"
  },
  gem: {
    name: "Crystal",
    icon: FaGem,
    color: 'cyan',
    cost: 1000000,
    animation: 'shine',
    description: "Shimmering crystal character"
  },
  dragon: {
    name: "Dragon",
    icon: FaDragon,
    color: 'red',
    cost: 2000000,
    animation: 'flame',
    description: "Legendary dragon with flame effects"
  },
  ninja: {
    name: "Ninja",
    icon: FaUserNinja,
    color: 'gray',
    cost: 5000000,
    animation: 'dash',
    description: "Stealthy character with dash effects"
  },
  wizard: {
    name: "Wizard",
    icon: FaHatWizard,
    color: 'indigo',
    cost: 7500000,
    animation: 'sparkle',
    description: "Magical character with sparkle effects"
  },
  alien: {
    name: "Alien",
    icon: FaUserAstronaut,
    color: 'green',
    cost: 10000000,
    animation: 'hover',
    description: "Extraterrestrial with hover effects"
  },
  phoenix: {
    name: "Phoenix",
    icon: FaFeather,
    color: 'orange',
    cost: 25000000,
    animation: 'burn',
    description: "Mythical bird with burning effects"
  },
  angel: {
    name: "Angel",
    icon: FaAngellist,
    color: 'white',
    cost: 50000000,
    animation: 'glow',
    description: "Divine character with glowing aura"
  },
  demon: {
    name: "Demon",
    icon: FaSkull,
    color: 'red',
    cost: 75000000,
    animation: 'dark-aura',
    description: "Infernal character with dark aura"
  },
  glitch: {
    name: "Glitch",
    icon: FaBug,
    color: 'purple',
    cost: 100000000,
    animation: 'glitch',
    description: "Glitched character with matrix effects"
  },
  rainbow: {
    name: "Rainbow",
    icon: FaStar,
    color: 'yellow',
    cost: 250000000,
    animation: 'rainbow',
    description: "Color-shifting rainbow character"
  },
  galaxy: {
    name: "Galaxy",
    icon: FaSpaceShuttle,
    color: 'blue',
    cost: 500000000,
    animation: 'space',
    description: "Cosmic character with galaxy effects"
  }
};

// Add achievement system
const ACHIEVEMENTS = [
  {
    id: 'first_million',
    name: "First Million",
    description: "Earn 1,000,000 money",
    icon: FaCoins,
    reward: 10000,
    xp: 5000
  },
  {
    id: 'streak_master',
    name: "Streak Master",
    description: "Get a 25x streak",
    icon: FaFire,
    reward: 25000,
    xp: 10000
  },
  {
    id: 'upgrade_king',
    name: "Upgrade King",
    description: "Max out any upgrade",
    icon: FaCrown,
    reward: 50000,
    xp: 15000
  }
];

// Add more question types
const QUESTION_TYPES = {
  MATH: 'math',
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  SHORT_ANSWER: 'short_answer'
};

// Add more question generators
const generateQuestion = (type = QUESTION_TYPES.MATH) => {
  switch (type) {
    case QUESTION_TYPES.MATH:
      return generateMathQuestion();
    case QUESTION_TYPES.MULTIPLE_CHOICE:
      return generateMultipleChoiceQuestion();
    case QUESTION_TYPES.TRUE_FALSE:
      return generateTrueFalseQuestion();
    case QUESTION_TYPES.SHORT_ANSWER:
      return generateShortAnswerQuestion();
    default:
      return generateMathQuestion();
  }
};

// Add more question generators
const generateMultipleChoiceQuestion = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correct: 0
    },
    {
      question: "Which planet is closest to the Sun?",
      answers: ["Mercury", "Venus", "Earth", "Mars"],
      correct: 0
    }
    // Add more questions...
  ];
  return questions[Math.floor(Math.random() * questions.length)];
};

const generateTrueFalseQuestion = () => {
  const questions = [
    {
      question: "The Earth is flat",
      answers: ["True", "False"],
      correct: 1
    },
    {
      question: "Water boils at 100°C at sea level",
      answers: ["True", "False"],
      correct: 0
    }
    // Add more questions...
  ];
  return questions[Math.floor(Math.random() * questions.length)];
};

const generateShortAnswerQuestion = () => {
  const questions = [
    {
      question: "What is the chemical symbol for Gold?",
      answer: "Au"
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter"
    }
    // Add more questions...
  ];
  return questions[Math.floor(Math.random() * questions.length)];
};

// Add XP levels before the function component
const XP_LEVELS = [
  { level: 1, xp: 0, reward: 'default' },
  { level: 2, xp: 1000, reward: 'premium' },
  { level: 3, xp: 5000, reward: 'robot' },
  { level: 4, xp: 15000, reward: 'ghost' },
  { level: 5, xp: 50000, reward: 'gem' },
  { level: 6, xp: 100000, reward: 'dragon' }
];

// Add math question generator
const generateMathQuestion = () => {
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let num1, num2, answer;

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 50) + 26;
      num2 = Math.floor(Math.random() * 25) + 1;
      answer = num1 - num2;
      break;
    case '*':
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = num1 * num2;
      break;
    default:
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      operation = '+';
  }

  const question = `${num1} ${operation} ${num2}`;
  
  // Generate wrong answers that are close to the correct answer
  const wrongAnswers = new Set();
  while (wrongAnswers.size < 3) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrongAnswer = answer + offset;
    if (wrongAnswer !== answer && wrongAnswer > 0) {
      wrongAnswers.add(wrongAnswer);
    }
  }

  return {
    question,
    answers: [...wrongAnswers, answer].sort(() => Math.random() - 0.5),
    correct: answer
  };
};

function Gimkit() {
  const { currentUser } = useAuth();
  
  // Update loadState function
  const loadState = async (key, defaultValue) => {
    if (!currentUser) return defaultValue;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return data[key] !== undefined ? data[key] : defaultValue;
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
    return defaultValue;
  };

  // Update saveState function
  const saveState = async (key, value) => {
    if (!currentUser) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, { [key]: value }, { merge: true });
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };

  // Update initial state loading
  const [money, setMoney] = useState(() => loadState('gimkitMoney', 23));
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(() => loadState('gimkitLives', 2));
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [insurance, setInsurance] = useState(() => loadState('gimkitInsurance', false));
  const [powerUp, setPowerUp] = useState(null);
  const [powerUpTimer, setPowerUpTimer] = useState(0);
  const [streakMultiplier, setStreakMultiplier] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [upgradeLevels, setUpgradeLevels] = useState(() => 
    Object.keys(UPGRADES).reduce((acc, key) => ({
      ...acc,
      [key]: loadState(`gimkit_upgrade_${key}`, 0)
    }), {})
  );
  const [activePowerUps, setActivePowerUps] = useState([]);
  const [leaderboard, setLeaderboard] = useState([
    { name: "Player 1", money: 1500 },
    { name: "Player 2", money: 1200 },
    { name: "Player 3", money: 800 }
  ]);
  const [shopCategory, setShopCategory] = useState(SHOP_CATEGORIES.UPGRADES);
  const [isImpostor, setIsImpostor] = useState(false);
  const [teamGoal, setTeamGoal] = useState(1000000);
  const [teamProgress, setTeamProgress] = useState(0);
  const [drawingPrompt, setDrawingPrompt] = useState('');
  const [passiveIncome, setPassiveIncome] = useState(0);
  
  // Add XP and level state
  const [xp, setXp] = useState(() => loadState('gimkitXp', 0));
  const [level, setLevel] = useState(() => loadState('gimkitLevel', 1));
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpReward, setLevelUpReward] = useState(null);
  const [unlockedSkins, setUnlockedSkins] = useState(() => loadState('unlockedSkins', ['default']));
  const [questionType, setQuestionType] = useState(QUESTION_TYPES.MATH);
  const [achievements, setAchievements] = useState(() => loadState('gimkitAchievements', []));
  const [currentSkin, setCurrentSkin] = useState(() => loadState('gimkitCurrentSkin', 'default'));
  const [powerUpsOwned, setPowerUpsOwned] = useState(() => loadState('gimkitPowerUps', {}));
  const [consumablesOwned, setConsumablesOwned] = useState(() => loadState('gimkitConsumables', {}));
  const [showAchievement, setShowAchievement] = useState(false);
  const [lastAchievement, setLastAchievement] = useState(null);

  // Initialize first question
  useEffect(() => {
    if (!currentQuestion) {
      const mathQ = generateMathQuestion();
      setCurrentQuestion({
        question: mathQ.question,
        answers: mathQ.answers,
        correct: mathQ.answers.indexOf(mathQ.correct)
      });
    }
  }, []);

  // Sound effects
  const playSound = (type) => {
    if (!soundEnabled) return;
    
    const sounds = {
      correct: new Audio('/correct.mp3'),
      wrong: new Audio('/wrong.mp3'),
      purchase: new Audio('/purchase.mp3'),
      powerup: new Audio('/powerup.mp3'),
      levelup: new Audio('/levelup.mp3'),
      collect: new Audio('/collect.mp3'),
      achievement: new Audio('/achievement.mp3')
    };
    
    sounds[type]?.play().catch(() => {});
  };

  // Calculate rewards with all bonuses
  const calculateReward = (baseAmount) => {
    let reward = baseAmount;
    
    // Apply upgrade bonuses
    reward *= UPGRADES.moneyPerQuestion.levels[upgradeLevels.moneyPerQuestion].value;
    reward *= UPGRADES.multiplier.levels[upgradeLevels.multiplier].value;
    
    // Apply streak bonus
    if (streak > 0) {
      const streakMultiplier = UPGRADES.streakBonus.levels[upgradeLevels.streakBonus].value;
      reward *= Math.min(streakMultiplier * Math.floor(streak / 3), 5);
    }

    // Apply active power-ups
    activePowerUps.forEach(powerUp => {
      if (powerUp.name === "Money Rain") reward *= 3;
    });

    return Math.floor(reward);
  };

  // Calculate money loss on wrong answers
  const calculateLoss = () => {
    const insuranceLevel = UPGRADES.insurance.levels[upgradeLevels.insurance].value;
    const hasShieldPowerUp = activePowerUps.some(p => p.name === "Shield");
    
    if (hasShieldPowerUp) return 0;
    return Math.floor(money * (1 - insuranceLevel));
  };

  // Handle power-up spawning
  useEffect(() => {
    const spawnPowerUp = () => {
      if (Math.random() < 0.1 && activePowerUps.length < 2) {
        const newPowerUp = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)];
        setActivePowerUps(prev => [...prev, {
          ...newPowerUp,
          id: Date.now(),
          endTime: Date.now() + newPowerUp.duration * 1000
        }]);
        playSound('powerup');
      }
    };

    const interval = setInterval(spawnPowerUp, 10000);
    return () => clearInterval(interval);
  }, [activePowerUps]);

  // Handle power-up expiration
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActivePowerUps(prev => prev.filter(p => p.endTime > now));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle answer with improved mechanics
  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correct;
    
    setTimeout(() => {
      if (isCorrect) {
        playSound('correct');
        const baseReward = 100000000000;
        const totalReward = baseReward;
        setMoney(prev => prev + totalReward);
        setXp(prev => prev + 50);
        
        const shouldKeepStreak = activePowerUps.some(p => p.name === "Infinite Streak");
        if (shouldKeepStreak || streak < 25) {
          setStreak(prev => prev + 1);
        }
      } else {
        playSound('wrong');
        const moneyLoss = 0;
        setMoney(prev => Math.max(0, prev - moneyLoss));
        
        const shouldKeepStreak = activePowerUps.some(p => p.name === "Infinite Streak");
        if (!shouldKeepStreak) {
          setStreak(0);
        }
      }
      setShowResult(true);

      // Update leaderboard
      setLeaderboard(prev => {
        const newBoard = [...prev];
        newBoard[0].money = money;
        return newBoard.sort((a, b) => b.money - a.money);
      });

      setTimeout(() => {
        if (lives > 0) {
          const mathQ = generateMathQuestion();
          setCurrentQuestion({
            question: mathQ.question,
            answers: mathQ.answers,
            correct: mathQ.answers.indexOf(mathQ.correct)
          });
          setSelectedAnswer(null);
          setShowResult(false);
        }
      }, 1500);
    }, 500);
  };

  // Buy upgrade
  const buyUpgrade = (upgradeKey) => {
    const upgrade = UPGRADES[upgradeKey];
    const currentLevel = upgradeLevels[upgradeKey];
    const nextLevel = currentLevel + 1;
    
    if (nextLevel < upgrade.levels.length) {
      const cost = upgrade.levels[nextLevel].cost;
      if (money >= cost) {
        playSound('purchase');
        setMoney(prev => prev - cost);
        setUpgradeLevels(prev => ({
          ...prev,
          [upgradeKey]: nextLevel
        }));
        localStorage.setItem(`gimkit_upgrade_${upgradeKey}`, nextLevel);
      }
    }
  };

  // Save state
  useEffect(() => {
    if (currentUser) {
      saveState('gimkitMoney', money);
      saveState('gimkitLives', lives);
      saveState('gimkitInsurance', insurance);
      saveState('gimkitXp', xp);
      saveState('gimkitLevel', level);
      saveState('unlockedSkins', unlockedSkins);
      saveState('gimkitAchievements', achievements);
      saveState('gimkitCurrentSkin', currentSkin);
      saveState('gimkitPowerUps', powerUpsOwned);
      saveState('gimkitConsumables', consumablesOwned);
    }
  }, [
    currentUser,
    money,
    lives,
    insurance,
    xp,
    level,
    unlockedSkins,
    achievements,
    currentSkin,
    powerUpsOwned,
    consumablesOwned
  ]);

  // Check for level up
  useEffect(() => {
    const nextLevel = XP_LEVELS.find(l => l.level === level + 1);
    if (nextLevel && xp >= nextLevel.xp) {
      setLevel(prev => prev + 1);
      setShowLevelUp(true);
      setLevelUpReward(nextLevel.reward);
      playSound('levelup');
      if (nextLevel.reward && !unlockedSkins.includes(nextLevel.reward)) {
        setUnlockedSkins(prev => [...prev, nextLevel.reward]);
      }
    }
  }, [xp, level, unlockedSkins]);

  // Handle passive income
  useEffect(() => {
    const interval = setInterval(() => {
      const interestRate = UPGRADES.interestRate.levels[upgradeLevels.interestRate].value;
      const moneyPerSecond = UPGRADES.moneyPerSecond.levels[upgradeLevels.moneyPerSecond].value;
      const totalPassive = Math.floor(money * interestRate + moneyPerSecond);
      
      if (totalPassive > 0) {
        setMoney(prev => prev + totalPassive);
        setPassiveIncome(totalPassive);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [money, upgradeLevels.interestRate, upgradeLevels.moneyPerSecond]);

  // Check achievements
  useEffect(() => {
    ACHIEVEMENTS.forEach(achievement => {
      if (!achievements.includes(achievement.id)) {
        let earned = false;
        
        switch (achievement.id) {
          case 'first_million':
            earned = money >= 1000000;
            break;
          case 'streak_master':
            earned = streak >= 25;
            break;
          case 'upgrade_king':
            earned = Object.values(upgradeLevels).some(level => 
              level === UPGRADES[Object.keys(UPGRADES)[0]].levels.length - 1
            );
            break;
        }
        
        if (earned) {
          setAchievements(prev => [...prev, achievement.id]);
          setMoney(prev => prev + achievement.reward);
          setXp(prev => prev + achievement.xp);
          setLastAchievement(achievement);
          setShowAchievement(true);
          playSound('achievement');
          
          setTimeout(() => {
            setShowAchievement(false);
          }, 3000);
        }
      }
    });
  }, [money, streak, upgradeLevels, achievements]);

  // Enhanced shop UI with categories
  const ShopUI = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-400">Shop</h2>
          <div className="flex items-center gap-4">
            <div className="text-yellow-400">
              <FaCoins className="inline mr-2" />
              ${money.toLocaleString()}
            </div>
            <button onClick={() => setShowShop(false)} className="text-gray-400 hover:text-white">
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          {Object.entries(SHOP_CATEGORIES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setShopCategory(value)}
              className={`px-4 py-2 rounded-lg ${
                shopCategory === value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {shopCategory === SHOP_CATEGORIES.UPGRADES && 
            Object.entries(UPGRADES).map(([key, upgrade]) => {
              const currentLevel = upgradeLevels[key];
              const nextLevel = upgrade.levels[currentLevel + 1];
              
              return (
                <div key={key} className="bg-gray-800 p-4 rounded-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <upgrade.icon className={`text-2xl text-${upgrade.levels[currentLevel].color}-400`} />
                    <div>
                      <h3 className="font-bold text-white">{upgrade.name}</h3>
                      <p className="text-sm text-gray-400">{upgrade.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm">
                      <span className="text-gray-400">Current: </span>
                      <span className="text-white">{upgrade.levels[currentLevel].value}x</span>
                    </div>
                    {nextLevel ? (
                      <button
                        onClick={() => buyUpgrade(key)}
                        disabled={money < nextLevel.cost}
                        className={`px-4 py-2 rounded-lg ${
                          money >= nextLevel.cost
                            ? 'bg-green-600 hover:bg-green-500'
                            : 'bg-gray-700 cursor-not-allowed'
                        }`}
                      >
                        Upgrade (${nextLevel.cost.toLocaleString()})
                      </button>
                    ) : (
                      <span className="text-purple-400">MAX LEVEL</span>
                    )}
                  </div>
                </div>
              );
            })
          }

          {shopCategory === SHOP_CATEGORIES.POWERUPS && 
            POWER_UPS.map(powerUp => (
              <div key={powerUp.name} className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-4">
                  <powerUp.icon className={`text-2xl text-${powerUp.color}-400`} />
                  <div>
                    <h3 className="font-bold text-white">{powerUp.name}</h3>
                    <p className="text-sm text-gray-400">{powerUp.effect}</p>
                    <p className="text-xs text-gray-500">Duration: {powerUp.duration}s</p>
                  </div>
                  <button
                    onClick={() => buyPowerUp(powerUp.name)}
                    disabled={money < powerUp.cost}
                    className={`ml-auto px-4 py-2 rounded-lg ${
                      money >= powerUp.cost
                        ? 'bg-green-600 hover:bg-green-500'
                        : 'bg-gray-700 cursor-not-allowed'
                    }`}
                  >
                    Buy (${powerUp.cost.toLocaleString()})
                  </button>
                </div>
              </div>
            ))
          }

          {shopCategory === SHOP_CATEGORIES.COSMETICS && 
            Object.entries(CHARACTER_SKINS).map(([key, skin]) => (
              <div key={key} className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-4">
                  <skin.icon className={`text-2xl text-${skin.color}-400 ${skin.animation}`} />
                  <div>
                    <h3 className="font-bold text-white">{skin.name}</h3>
                    <p className="text-sm text-gray-400">Special Animation: {skin.animation}</p>
                  </div>
                  {unlockedSkins.includes(key) ? (
                    <button
                      onClick={() => setCurrentSkin(key)}
                      className={`ml-auto px-4 py-2 rounded-lg ${
                        currentSkin === key
                          ? 'bg-purple-600'
                          : 'bg-blue-600 hover:bg-blue-500'
                      }`}
                    >
                      {currentSkin === key ? 'Selected' : 'Select'}
                    </button>
                  ) : (
                    <button
                      onClick={() => buySkin(key)}
                      disabled={money < skin.cost}
                      className={`ml-auto px-4 py-2 rounded-lg ${
                        money >= skin.cost
                          ? 'bg-green-600 hover:bg-green-500'
                          : 'bg-gray-700 cursor-not-allowed'
                      }`}
                    >
                      Buy (${skin.cost.toLocaleString()})
                    </button>
                  )}
                </div>
              </div>
            ))
          }

          {shopCategory === SHOP_CATEGORIES.CONSUMABLES && 
            CONSUMABLES.map(item => (
              <div key={item.name} className="bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-4">
                  <item.icon className={`text-2xl text-${item.color}-400`} />
                  <div>
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.effect}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-gray-400">
                      Owned: {consumablesOwned[item.name] || 0}
                    </span>
                    <button
                      onClick={() => buyConsumable(item.name)}
                      disabled={money < item.cost}
                      className={`px-4 py-2 rounded-lg ${
                        money >= item.cost
                          ? 'bg-green-600 hover:bg-green-500'
                          : 'bg-gray-700 cursor-not-allowed'
                      }`}
                    >
                      Buy (${item.cost.toLocaleString()})
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );

  // Achievement notification
  const AchievementNotification = () => (
    <div className="fixed top-4 right-4 bg-yellow-600/90 p-4 rounded-xl backdrop-blur-sm animate-slide-in">
      <div className="flex items-center gap-4">
        <lastAchievement.icon className="text-3xl text-yellow-300" />
        <div>
          <h3 className="font-bold text-white">{lastAchievement.name}</h3>
          <p className="text-sm text-yellow-200">{lastAchievement.description}</p>
          <p className="text-xs text-yellow-100">
            +${lastAchievement.reward.toLocaleString()} • +{lastAchievement.xp}XP
          </p>
        </div>
      </div>
    </div>
  );

  // Game mode specific UI
  const GameModeUI = () => {
    switch (gameMode) {
      case 'TRUST_NO_ONE':
        return (
          <div className="absolute top-4 right-4 bg-red-900/50 p-2 rounded-lg">
            {isImpostor ? (
              <span className="text-red-400">🕵️ You are an Impostor</span>
            ) : (
              <span className="text-green-400">👨‍🚀 You are a Crewmate</span>
            )}
          </div>
        );
      
      case 'TEAM_MODE':
        return (
          <div className="absolute bottom-4 left-4 right-4 bg-blue-900/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-400">Team Goal: ${teamGoal.toLocaleString()}</span>
              <span className="text-blue-400">
                Progress: ${teamProgress.toLocaleString()} (
                {Math.floor((teamProgress / teamGoal) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 rounded-full h-2 transition-all"
                style={{ width: `${(teamProgress / teamGoal) * 100}%` }}
              />
            </div>
          </div>
        );
      
      case 'DRAW_THAT':
        return (
          <div className="absolute inset-4 bg-gray-900/90 rounded-lg flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">Draw: {drawingPrompt}</h3>
            </div>
            <div className="flex-1 p-4">
              {/* Canvas would go here */}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Add power-up purchase function
  const buyPowerUp = (powerUpName) => {
    const powerUp = POWER_UPS.find(p => p.name === powerUpName);
    if (!powerUp || money < powerUp.cost) return;

    playSound('purchase');
    setMoney(prev => prev - powerUp.cost);
    setPowerUpsOwned(prev => ({
      ...prev,
      [powerUpName]: (prev[powerUpName] || 0) + 1
    }));
    
    // Activate the power-up immediately
    setActivePowerUps(prev => [...prev, {
      ...powerUp,
      id: Date.now(),
      endTime: Date.now() + powerUp.duration * 1000
    }]);
  };

  // Add skin purchase function
  const buySkin = (skinKey) => {
    const skin = CHARACTER_SKINS[skinKey];
    if (!skin || money < skin.cost || unlockedSkins.includes(skinKey)) return;

    playSound('purchase');
    setMoney(prev => prev - skin.cost);
    setUnlockedSkins(prev => [...prev, skinKey]);
    setCurrentSkin(skinKey);
  };

  // Add consumable purchase function
  const buyConsumable = (itemName) => {
    const item = CONSUMABLES.find(c => c.name === itemName);
    if (!item || money < item.cost) return;

    playSound('purchase');
    setMoney(prev => prev - item.cost);
    setConsumablesOwned(prev => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1
    }));

    // Apply immediate effects
    switch (itemName) {
      case "Extra Life":
        setLives(prev => prev + 1);
        break;
      case "Money Bomb":
        setMoney(prev => prev + Math.floor(prev * 0.5));
        break;
      case "Streak Saver":
        setInsurance(true);
        break;
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-b from-gray-900 via-purple-900 to-pink-900">
      <div className="relative p-4">
        {/* Header with stats - Fixed at top */}
        <div className="sticky top-0 z-30 mb-8 bg-gray-900/80 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaCoins className="text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">${money.toLocaleString()}</span>
                {passiveIncome > 0 && (
                  <span className="text-sm text-green-400">+${passiveIncome}/s</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <FaFire className="text-orange-400" />
                <span className="text-xl font-bold text-orange-400">
                  x{UPGRADES.streakBonus.levels[upgradeLevels.streakBonus].value}
                </span>
                <span className="text-sm text-gray-400">({streak})</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {insurance && (
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-cyan-400" />
                  <span className="text-sm text-cyan-400">Insurance Active</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                <span className="text-xl font-bold text-red-500">{lives}</span>
              </div>
              <button
                onClick={() => setShowShop(!showShop)}
                className="p-2 bg-purple-600 rounded-lg hover:bg-purple-500"
              >
                <FaStore className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Game Mode Selector - Scrollable with content */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-2">
            {Object.entries(GAME_MODES).map(([key, mode]) => (
              <button
                key={key}
                onClick={() => {
                  setGameMode(key);
                  if (key === 'TRUST_NO_ONE') {
                    setIsImpostor(Math.random() < 0.3);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                  gameMode === key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <mode.icon />
                {mode.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Game Area */}
          <div className="lg:col-span-3 bg-gray-900/80 p-8 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Question {currentQuestion?.question}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion?.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-xl text-left text-lg font-semibold transition-all transform hover:scale-105 ${
                    !showResult || selectedAnswer !== index
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : index === currentQuestion.correct
                      ? 'bg-green-600'
                      : 'bg-red-600'
                  }`}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard - Sticky on desktop */}
          <div className="lg:sticky lg:top-32 h-fit bg-gray-900/80 p-4 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-purple-400">Leaderboard</h3>
            {leaderboard.map((player, index) => (
              <div key={player.name} className="flex items-center gap-2 mb-2">
                <span className="text-gray-400">{index + 1}.</span>
                <span className="text-white">{player.name}</span>
                <span className="ml-auto text-yellow-400">${player.money.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mode-specific UI */}
        <GameModeUI />

        {/* Shop Modal */}
        {showShop && <ShopUI />}

        {/* Achievement Notification */}
        {showAchievement && <AchievementNotification />}
      </div>
    </div>
  );
}

export default Gimkit; 