import React, { useState, useEffect } from 'react';
import { 
  FaFire, FaWater, FaWind, FaMountain, FaLeaf, FaPlus, 
  FaCloud, FaSun, FaMoon, FaTree, FaStar, FaSpider,
  FaDragon, FaSnowflake, FaTimes, FaQuestionCircle, FaChevronDown
} from 'react-icons/fa';

const STORAGE_KEY = 'littleAlchemyDiscoveries';
const WORKSPACE_KEY = 'littleAlchemyWorkspace';

const CATEGORIES = [
  'Basic Combinations',
  'Atmospheric',
  'Plant Life',
  'Weather',
  'Life Forms',
  'Small Life',
  'Elements and Energy',
  'Time and Space',
  'Materials',
  'Abstract'
];

const LittleAlchemy = () => {
  const [workspace, setWorkspace] = useState(() => {
    const saved = localStorage.getItem(WORKSPACE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [discoveries, setDiscoveries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [notification, setNotification] = useState(null);
  const [showCheatList, setShowCheatList] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const baseElements = [
    { id: 'fire', name: 'Fire', icon: FaFire, color: 'text-red-500' },
    { id: 'water', name: 'Water', icon: FaWater, color: 'text-blue-500' },
    { id: 'air', name: 'Air', icon: FaWind, color: 'text-gray-300' },
    { id: 'earth', name: 'Earth', icon: FaMountain, color: 'text-green-700' },
    { id: 'energy', name: 'Energy', icon: FaStar, color: 'text-yellow-400' }
  ];

  const recipes = {
    // Basic Combinations
    'fire+water': { result: 'steam', color: 'text-gray-300' },
    'water+earth': { result: 'mud', color: 'text-yellow-800' },
    'fire+earth': { result: 'lava', color: 'text-orange-500' },
    'air+water': { result: 'rain', color: 'text-blue-400' },
    'fire+air': { result: 'smoke', color: 'text-gray-600' },
    'earth+air': { result: 'dust', color: 'text-yellow-600' },
    
    // Atmospheric
    'air+air': { result: 'pressure', color: 'text-blue-300' },
    'fire+dust': { result: 'ash', color: 'text-gray-500' },
    'air+pressure': { result: 'wind', icon: FaWind, color: 'text-blue-200' },
    'water+air': { result: 'cloud', icon: FaCloud, color: 'text-gray-400' },
    'energy+air': { result: 'sky', color: 'text-blue-400' },
    'fire+sky': { result: 'sun', icon: FaSun, color: 'text-yellow-500' },
    'earth+sky': { result: 'moon', icon: FaMoon, color: 'text-gray-200' },
    
    // Plant Life
    'mud+energy': { result: 'life', color: 'text-green-400' },
    'life+earth': { result: 'plant', icon: FaLeaf, color: 'text-green-500' },
    'plant+sun': { result: 'tree', icon: FaTree, color: 'text-green-600' },
    'plant+wind': { result: 'flower', icon: FaLeaf, color: 'text-pink-500' },
    'tree+wind': { result: 'leaf', icon: FaLeaf, color: 'text-green-400' },
    
    // Weather and Temperature
    'cloud+water': { result: 'rain', color: 'text-blue-400' },
    'air+water': { result: 'mist', color: 'text-gray-300' },
    'mist+energy': { result: 'cold', icon: FaSnowflake, color: 'text-blue-200' },
    'water+cold': { result: 'ice', color: 'text-blue-200' },
    'rain+cold': { result: 'snow', icon: FaSnowflake, color: 'text-blue-100' },
    'cloud+cold': { result: 'blizzard', color: 'text-blue-300' },
    'sun+rain': { result: 'rainbow', color: 'text-purple-400' },
    'fire+cold': { result: 'steam', color: 'text-gray-300' },
    
    // Life Forms
    'water+plant': { result: 'algae', color: 'text-green-300' },
    'water+life': { result: 'fish', color: 'text-blue-400' },
    'air+life': { result: 'bird', color: 'text-cyan-500' },
    'earth+life': { result: 'animal', color: 'text-yellow-700' },
    'fire+life': { result: 'dragon', icon: FaDragon, color: 'text-red-600' },
    
    // Small Life
    'life+mud': { result: 'worm', color: 'text-pink-300' },
    'life+plant': { result: 'bug', color: 'text-green-400' },
    'bug+air': { result: 'butterfly', color: 'text-pink-400' },
    'bug+earth': { result: 'spider', icon: FaSpider, color: 'text-gray-700' },
    
    // Elements and Energy
    'fire+pressure': { result: 'plasma', color: 'text-purple-500' },
    'water+energy': { result: 'steam', color: 'text-gray-300' },
    'earth+energy': { result: 'metal', color: 'text-gray-400' },
    'air+energy': { result: 'lightning', color: 'text-yellow-300' },
    'cold+energy': { result: 'frost', color: 'text-blue-100' },
    
    // Time and Space
    'sun+moon': { result: 'time', color: 'text-purple-300' },
    'sky+energy': { result: 'space', color: 'text-indigo-900' },
    'earth+space': { result: 'planet', color: 'text-blue-500' },
    
    // Materials
    'metal+fire': { result: 'tool', color: 'text-gray-500' },
    'mud+fire': { result: 'brick', color: 'text-red-700' },
    
    // Abstract
    'life+time': { result: 'death', color: 'text-gray-800' },
    'life+death': { result: 'ghost', color: 'text-gray-200' },
    'water+rainbow': { result: 'magic', color: 'text-purple-500' }
  };

  // Get recipes for a category
  const getRecipesForCategory = (categoryName) => {
    return Object.entries(recipes)
      .filter(([_, recipe]) => {
        const comment = Object.keys(recipes)
          .find(key => recipes[key] === recipe);
        return comment && comment.includes(categoryName);
      })
      .map(([combo, recipe]) => ({
        combination: combo.replace('+', ' + '),
        result: recipe.result
      }));
  };

  // Save discoveries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(discoveries));
  }, [discoveries]);

  // Save workspace to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
  }, [workspace]);

  const showNotification = (discovery) => {
    setNotification(discovery);
    setTimeout(() => setNotification(null), 3000);
  };

  const combineElements = (elements) => {
    const recipe = elements[0].id + '+' + elements[1].id;
    const reverseRecipe = elements[1].id + '+' + elements[0].id;
    
    if (recipes[recipe] || recipes[reverseRecipe]) {
      const result = recipes[recipe] || recipes[reverseRecipe];
      const newDiscovery = { 
        ...result, 
        id: result.result,
        name: result.result
      };
      
      if (!discoveries.find(d => d.id === newDiscovery.id)) {
        setDiscoveries([...discoveries, newDiscovery]);
        showNotification(newDiscovery);
      } else {
        showNotification({ ...newDiscovery, alreadyDiscovered: true });
      }
    } else {
      showNotification({ 
        name: 'No Result', 
        color: 'text-gray-400',
        error: true 
      });
    }
    // Clear workspace after combination attempt
    setWorkspace([]);
  };

  const addToWorkspace = (element) => {
    if (workspace.length < 2) {
      const newWorkspace = [...workspace, element];
      setWorkspace(newWorkspace);
      
      // If we now have 2 elements, automatically combine them
      if (newWorkspace.length === 2) {
        // Short delay to show both elements before combining
        setTimeout(() => {
          combineElements(newWorkspace);
        }, 500);
      }
    }
  };

  const clearWorkspace = () => {
    setWorkspace([]);
    localStorage.removeItem(WORKSPACE_KEY);
  };

  const clearProgress = () => {
    if (window.confirm('Are you sure you want to clear all your discoveries and workspace?')) {
      setDiscoveries([]);
      setWorkspace([]);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(WORKSPACE_KEY);
      setNotification({
        name: 'Progress Cleared',
        color: 'text-white',
        error: true
      });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-3 transition-all transform ${
          notification.error ? 'bg-red-600' : 
          notification.alreadyDiscovered ? 'bg-yellow-600' : 
          'bg-green-600'
        }`}>
          {notification.icon ? (
            <notification.icon className={`text-2xl ${notification.color}`} />
          ) : (
            <div className={`text-2xl ${notification.color} font-bold`}>
              {notification.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <div className="font-bold text-white capitalize">
              {notification.error ? 'No Result' :
               notification.alreadyDiscovered ? 'Already Discovered:' :
               'New Discovery!'}
            </div>
            {!notification.error && (
              <div className="text-white/80 capitalize">{notification.name}</div>
            )}
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-white/60 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-400 flex items-center gap-3">
          <FaFire className="text-orange-500" /> Little Alchemy
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCheatList(!showCheatList)}
            className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-sm rounded-lg hover:bg-purple-500 transition-colors"
          >
            <FaQuestionCircle />
            {showCheatList ? 'Hide' : 'Show'} Recipes
          </button>
          <div className="text-gray-400">
            Discoveries: {discoveries.length} / {Object.keys(recipes).length}
          </div>
          <button
            onClick={clearProgress}
            className="px-3 py-1 bg-red-600 text-sm rounded-lg hover:bg-red-500 transition-colors"
          >
            Reset Progress
          </button>
        </div>
      </div>

      {/* Cheat List */}
      {showCheatList && (
        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Recipe Book</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(recipes).map(([combo, recipe]) => (
              <div 
                key={combo}
                className={`p-3 rounded-lg ${
                  discoveries.find(d => d.id === recipe.result)
                    ? 'bg-green-900/20'
                    : 'bg-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    {combo.replace('+', ' + ')}
                  </span>
                  <span className={`text-sm ${
                    discoveries.find(d => d.id === recipe.result)
                      ? 'text-green-400'
                      : 'text-gray-400'
                  }`}>
                    = {recipe.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Elements Panel */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Elements</h2>
          
          {/* Base Elements */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-2">Basic Elements</h3>
            <div className="grid grid-cols-2 gap-3">
              {baseElements.map(element => (
                <button
                  key={element.id}
                  className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex flex-col items-center gap-2"
                  onClick={() => addToWorkspace(element)}
                >
                  <element.icon className={`text-2xl ${element.color}`} />
                  <span className="capitalize">{element.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Discovered Elements */}
          {discoveries.length > 0 && (
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Discovered Elements</h3>
              <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto">
                {discoveries.map((discovery) => (
                  <button
                    key={discovery.id}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex flex-col items-center gap-1"
                    onClick={() => addToWorkspace(discovery)}
                  >
                    {discovery.icon ? (
                      <discovery.icon className={`text-xl ${discovery.color}`} />
                    ) : (
                      <div className={`text-xl ${discovery.color} font-bold`}>
                        {discovery.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="capitalize text-xs">{discovery.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Workspace */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Workspace</h2>
          <div className="flex items-center justify-center gap-4 min-h-[200px]">
            {workspace.map((element, index) => (
              <div key={index} className="text-center">
                <div className="p-6 bg-gray-700 rounded-lg">
                  {element.icon ? (
                    <element.icon className={`text-4xl ${element.color}`} />
                  ) : (
                    <div className={`text-4xl ${element.color} font-bold`}>
                      {element.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="mt-2 capitalize">{element.name}</div>
              </div>
            ))}
          </div>
          {workspace.length > 0 && (
            <button
              className="mt-4 w-full p-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
              onClick={clearWorkspace}
            >
              Clear Workspace
            </button>
          )}
        </div>

        {/* Discoveries Log */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Recent Discoveries</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {discoveries.slice().reverse().map((discovery, index) => (
              <div
                key={index}
                className="p-3 bg-gray-700 rounded-lg flex items-center gap-3"
              >
                {discovery.icon ? (
                  <discovery.icon className={`text-2xl ${discovery.color}`} />
                ) : (
                  <div className={`text-2xl ${discovery.color} font-bold`}>
                    {discovery.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="capitalize font-bold">{discovery.name}</div>
                  <div className="text-xs text-gray-400">
                    Discovery #{discoveries.length - index}
                  </div>
                </div>
              </div>
            ))}
            {discoveries.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                Start combining elements to make discoveries!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LittleAlchemy; 