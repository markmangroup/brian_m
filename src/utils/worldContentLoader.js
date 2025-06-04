/**
 * World-Aware Content Loader
 * 
 * Utility functions for loading world-specific content from nodes.
 * Supports fallback to default/matrix variants for backwards compatibility.
 */

/**
 * Get world-specific dialogue from a node's dialogue object
 * @param {Object|Array} dialogue - Dialogue object with world keys or legacy array
 * @param {string} currentWorld - Current world (matrix, witcher, nightcity)
 * @returns {Array} Array of dialogue strings for the current world
 */
export const getWorldDialogue = (dialogue, currentWorld) => {
  // Legacy support: if dialogue is already an array, return it
  if (Array.isArray(dialogue)) {
    return dialogue;
  }
  
  // If dialogue is an object with world-specific content
  if (dialogue && typeof dialogue === 'object') {
    // Try current world first
    if (dialogue[currentWorld]) {
      return dialogue[currentWorld];
    }
    
    // Fallback to default or matrix
    if (dialogue.default) {
      return dialogue.default;
    }
    
    if (dialogue.matrix) {
      return dialogue.matrix;
    }
    
    // If it's an object but doesn't match our structure, convert to array
    return Object.values(dialogue).flat();
  }
  
  // Fallback for any other case
  return [];
};

/**
 * Get world-specific characters from a node's characters object
 * @param {Object|Array} characters - Characters object with world keys or legacy array
 * @param {string} currentWorld - Current world (matrix, witcher, nightcity)
 * @returns {Array} Array of character strings for the current world
 */
export const getWorldCharacters = (characters, currentWorld) => {
  // Legacy support: if characters is already an array, return it
  if (Array.isArray(characters)) {
    return characters;
  }
  
  // If characters is an object with world-specific content
  if (characters && typeof characters === 'object') {
    // Try current world first
    if (characters[currentWorld]) {
      return characters[currentWorld];
    }
    
    // Fallback to default or matrix
    if (characters.default) {
      return characters.default;
    }
    
    if (characters.matrix) {
      return characters.matrix;
    }
    
    // If it's an object but doesn't match our structure, convert to array
    return Object.values(characters).flat();
  }
  
  // Fallback
  return [];
};

/**
 * Get world-specific summary from a node's summary object
 * @param {Object|string} summary - Summary object with world keys or legacy string
 * @param {string} currentWorld - Current world (matrix, witcher, nightcity)
 * @returns {string} Summary string for the current world
 */
export const getWorldSummary = (summary, currentWorld) => {
  // Legacy support: if summary is already a string, return it
  if (typeof summary === 'string') {
    return summary;
  }
  
  // If summary is an object with world-specific content
  if (summary && typeof summary === 'object') {
    // Try current world first
    if (summary[currentWorld]) {
      return summary[currentWorld];
    }
    
    // Fallback to default or matrix
    if (summary.default) {
      return summary.default;
    }
    
    if (summary.matrix) {
      return summary.matrix;
    }
    
    // If it's an object but doesn't match our structure, return first value
    const values = Object.values(summary);
    return values.length > 0 ? values[0] : '';
  }
  
  // Fallback
  return '';
};

/**
 * Get world-specific options from a node's options object
 * @param {Object|Array} options - Options object with world keys or legacy array
 * @param {string} currentWorld - Current world (matrix, witcher, nightcity)
 * @returns {Array} Array of option strings for the current world
 */
export const getWorldOptions = (options, currentWorld) => {
  // Legacy support: if options is already an array, return it
  if (Array.isArray(options)) {
    return options;
  }
  
  // If options is an object with world-specific content
  if (options && typeof options === 'object') {
    // Try current world first
    if (options[currentWorld]) {
      return options[currentWorld];
    }
    
    // Fallback to default or matrix
    if (options.default) {
      return options.default;
    }
    
    if (options.matrix) {
      return options.matrix;
    }
    
    // If it's an object but doesn't match our structure, convert to array
    return Object.values(options).flat();
  }
  
  // Fallback
  return [];
};

/**
 * Transform a node's content to be world-aware
 * @param {Object} nodeData - The node's data object
 * @param {string} currentWorld - Current world (matrix, witcher, nightcity)
 * @returns {Object} Node data with world-specific content resolved
 */
export const getWorldAwareNodeData = (nodeData, currentWorld) => {
  if (!nodeData) return {};
  
  return {
    ...nodeData,
    dialogue: getWorldDialogue(nodeData.dialogue, currentWorld),
    characters: getWorldCharacters(nodeData.characters, currentWorld),
    summary: getWorldSummary(nodeData.summary, currentWorld),
    options: getWorldOptions(nodeData.options, currentWorld)
  };
};

/**
 * Hook for using world content in React components
 * @param {Object} nodeData - The node's data object
 * @param {string} currentWorld - Current world (matrix, witcher, nightcity)
 * @returns {Object} World-aware node data
 */
export const useWorldContent = (nodeData, currentWorld) => {
  return getWorldAwareNodeData(nodeData, currentWorld);
}; 