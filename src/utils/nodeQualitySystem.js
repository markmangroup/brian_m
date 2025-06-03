/**
 * Node Quality Enhancement System
 * Systematic approach to making each Matrix node a 10/10 experience
 */

// 🎯 Quality Rating Criteria (each scored 0-10)
export const QUALITY_CRITERIA = {
  narrative: {
    name: 'Narrative Depth',
    description: 'Rich storytelling, dialogue quality, and atmospheric details',
    weight: 20,
    indicators: [
      'Compelling dialogue with character voice',
      'Immersive atmosphere and environmental storytelling',
      'Emotional depth and user connection',
      'Lore consistency and world-building'
    ]
  },
  interactivity: {
    name: 'Interactive Features',
    description: 'User engagement, meaningful choices, and interactive elements',
    weight: 20,
    indicators: [
      'Meaningful user actions and choices',
      'Responsive UI elements and feedback',
      'Puzzles and challenges that feel rewarding',
      'Progress tracking and achievement systems'
    ]
  },
  visual: {
    name: 'Visual Polish',
    description: 'Animation quality, effects, theming, and visual appeal',
    weight: 15,
    indicators: [
      'Smooth animations and transitions',
      'Consistent theme integration',
      'Visual effects that enhance narrative',
      'Responsive design across devices'
    ]
  },
  technical: {
    name: 'Technical Excellence',
    description: 'Performance, accessibility, and code quality',
    weight: 15,
    indicators: [
      'Fast loading and smooth performance',
      'Full accessibility compliance',
      'Error handling and edge cases',
      'Clean, maintainable code structure'
    ]
  },
  character: {
    name: 'Character Development',
    description: 'NPC personality, dialogue systems, and character growth',
    weight: 15,
    indicators: [
      'Memorable NPC personalities',
      'Dynamic dialogue based on context',
      'Character relationship tracking',
      'Believable character motivations'
    ]
  },
  consequences: {
    name: 'Choice Consequences',
    description: 'Impact of decisions and branching narrative paths',
    weight: 15,
    indicators: [
      'Meaningful choice consequences',
      'Visible impact on story progression',
      'Replayability value',
      'Multiple valid solution paths'
    ]
  }
};

// 🎯 Node Enhancement Priority Levels
export const ENHANCEMENT_PRIORITY = {
  CRITICAL: {
    level: 'critical',
    color: '#ef4444',
    description: 'Breaks user experience or blocks progression',
    timeframe: 'Immediate (1-2 days)'
  },
  HIGH: {
    level: 'high', 
    color: '#f59e0b',
    description: 'Significantly impacts user engagement',
    timeframe: 'Short term (3-7 days)'
  },
  MEDIUM: {
    level: 'medium',
    color: '#eab308', 
    description: 'Noticeable improvement to user experience',
    timeframe: 'Medium term (1-2 weeks)'
  },
  LOW: {
    level: 'low',
    color: '#22c55e',
    description: 'Polish and refinement improvements',
    timeframe: 'Long term (2+ weeks)'
  }
};

// 🎯 Enhancement Implementation Templates
export const ENHANCEMENT_TEMPLATES = {
  scene: {
    checklist: [
      '✅ Rich atmospheric description',
      '✅ Interactive environmental elements', 
      '✅ Character presence and dialogue',
      '✅ Visual effects and animations',
      '✅ Sound design integration',
      '✅ Accessibility features',
      '✅ Mobile responsiveness',
      '✅ Performance optimization'
    ],
    requiredFeatures: ['atmosphere', 'visualElements', 'interactivity', 'accessibility']
  },
  dialogue: {
    checklist: [
      '✅ Character voice consistency',
      '✅ Emotional depth and subtext',
      '✅ Player dialogue choices',
      '✅ Dynamic response system',
      '✅ Typography and formatting',
      '✅ Audio/voice integration',
      '✅ Context-aware dialogue',
      '✅ Conversation memory'
    ],
    requiredFeatures: ['characterVoice', 'emotionalDepth', 'choices', 'context']
  },
  choice: {
    checklist: [
      '✅ Meaningful decision options',
      '✅ Clear consequence preview',
      '✅ Time pressure (if appropriate)',
      '✅ Visual choice presentation',
      '✅ Hover/focus feedback',
      '✅ Confirmation systems',
      '✅ Undo mechanisms (if appropriate)',
      '✅ Analytics tracking'
    ],
    requiredFeatures: ['meaningfulChoices', 'consequences', 'feedback', 'analytics']
  },
  training: {
    checklist: [
      '✅ Progressive skill building',
      '✅ Interactive tutorials',
      '✅ Performance feedback',
      '✅ Mastery indicators',
      '✅ Retry mechanisms',
      '✅ Adaptive difficulty',
      '✅ Achievement rewards',
      '✅ Knowledge retention tests'
    ],
    requiredFeatures: ['progression', 'feedback', 'mastery', 'adaptive']
  },
  ending: {
    checklist: [
      '✅ Satisfying narrative conclusion',
      '✅ Consequence resolution',
      '✅ Character arc completion',
      '✅ Replay value indicators',
      '✅ Achievement unlocks',
      '✅ Next step guidance',
      '✅ Emotional impact',
      '✅ Memorable finale moments'
    ],
    requiredFeatures: ['conclusion', 'resolution', 'impact', 'guidance']
  }
};

// 🎯 Default Enhancement Structure Creator
export function createEnhancementTemplate(nodeType = 'scene', world = 'matrix', customOptions = {}) {
  const now = new Date().toISOString();
  
  return {
    qualityRating: customOptions.qualityRating || 5,
    status: customOptions.status || "stub",
    priority: customOptions.priority || "medium", 
    updatedAt: customOptions.updatedAt || now,
    targetRating: 10,
    improvements: customOptions.improvements || [
      'Add immersive world atmosphere and environmental storytelling',
      'Enhanced interactive elements and user engagement',
      'Visual effects and animation polish',
      'Accessibility and performance optimization'
    ],
    criteria: {
      narrative: 5,
      interactivity: 5,
      visual: 5,
      technical: 5,
      character: 5,
      consequences: 5,
      ...customOptions.criteria
    },
    narrative: {
      atmosphere: customOptions.atmosphere || 'Rich environmental storytelling with immersive details',
      soundscape: customOptions.soundscape || 'Ambient audio design matching the world theme',
      visualElements: customOptions.visualElements || 'Thematic UI elements and visual effects',
      emotionalTone: customOptions.emotionalTone || 'Engaging emotional experience for the user',
      ...customOptions.narrative
    },
    interactivity: {
      userActions: 'Meaningful user interactions and choices',
      feedback: 'Clear visual and audio feedback for user actions',
      accessibility: 'Full keyboard navigation and screen reader support',
      ...customOptions.interactivity
    },
    ...customOptions.customFields
  };
}

// 🎯 World-Specific Enhancement Templates
export const WORLD_ENHANCEMENT_DEFAULTS = {
  matrix: {
    narrative: {
      atmosphere: 'Digital void with code rain and glitch effects',
      soundscape: 'Electronic hums, keyboard clicks, system alerts',
      visualElements: 'Green terminal text, holographic interfaces, data streams',
      emotionalTone: 'Mysterious digital reality with underlying tension'
    },
    interactivity: {
      matrixEffects: 'Code rain animations and digital glitch effects',
      terminalInterface: 'Command-line style interactions',
      accessibility: 'Matrix-themed screen reader descriptions'
    }
  },
  witcher: {
    narrative: {
      atmosphere: 'Medieval fantasy with magical elements and monster encounters',
      soundscape: 'Wind through forests, distant monster growls, medieval ambience',
      visualElements: 'Witcher medallion interfaces, rune inscriptions, magical auras',
      emotionalTone: 'Dark fantasy atmosphere with heroic undertones'
    },
    interactivity: {
      medallionEffects: 'Witcher medallion vibrates to detect magical presence',
      signCasting: 'Interactive magical sign casting with visual effects',
      accessibility: 'Fantasy-themed navigation with lore-appropriate descriptions'
    }
  },
  nightcity: {
    narrative: {
      atmosphere: 'Cyberpunk cityscape with neon lights and urban decay',
      soundscape: 'City traffic, electronic music, corporate announcements',
      visualElements: 'Neon UI elements, holographic displays, cybernetic interfaces',
      emotionalTone: 'High-tech dystopian future with rebellious energy'
    },
    interactivity: {
      cyberwareEffects: 'Cybernetic enhancement interfaces and visual overlays',
      hackingInterface: 'Interactive hacking mini-games and data streams',
      accessibility: 'Cyberpunk-themed navigation with tech-appropriate descriptions'
    }
  }
};

// 🎯 Node Score Weights (0-1)
export const NODE_SCORE_WEIGHTS = {
  completeness: 0.3,
  depth: 0.25,
  agency: 0.25,
  hooks: 0.1,
  connectivity: 0.1
};

// Suggested color mapping for score tiers
export const NODE_SCORE_COLORS = {
  excellent: '#22c55e', // 80-100
  good: '#eab308',      // 60-79
  fair: '#f97316',      // 40-59
  poor: '#ef4444'       // below 40
};

export function getScoreColor(score) {
  if (score >= 80) return NODE_SCORE_COLORS.excellent;
  if (score >= 60) return NODE_SCORE_COLORS.good;
  if (score >= 40) return NODE_SCORE_COLORS.fair;
  return NODE_SCORE_COLORS.poor;
}

// 🎯 Enhanced Node Creator Function
export function createNodeWithEnhancement(baseNode, world = 'matrix', customEnhancement = {}) {
  const worldDefaults = WORLD_ENHANCEMENT_DEFAULTS[world] || WORLD_ENHANCEMENT_DEFAULTS.matrix;
  const enhancementTemplate = createEnhancementTemplate(baseNode.type, world, {
    ...worldDefaults,
    ...customEnhancement
  });
  
  return {
    ...baseNode,
    data: {
      ...baseNode.data,
      enhancement: enhancementTemplate
    }
  };
}

// 🎯 Quality Assessment Functions
export function calculateNodeQuality(node) {
  if (!node.data?.enhancement?.qualityRating) {
    return {
      overall: 5, // Default neutral rating
      criteria: Object.keys(QUALITY_CRITERIA).reduce((acc, key) => {
        acc[key] = 5;
        return acc;
      }, {}),
      suggestions: ['Add enhancement data to enable quality tracking']
    };
  }
  
  const enhancement = node.data.enhancement;
  const overall = enhancement.qualityRating || 5;
  
  return {
    overall,
    criteria: enhancement.criteria || {},
    suggestions: enhancement.improvements || [],
    priority: overall < 7 ? 'HIGH' : overall < 9 ? 'MEDIUM' : 'LOW'
  };
}

export function getNextImprovements(node, limit = 3) {
  const quality = calculateNodeQuality(node);
  const improvements = node.data?.enhancement?.improvements || [];
  
  return improvements
    .slice(0, limit)
    .map((improvement, index) => ({
      id: `${node.id}-improvement-${index}`,
      description: improvement,
      priority: quality.priority,
      estimatedEffort: estimateEffort(improvement),
      category: categorizeImprovement(improvement)
    }));
}

export function estimateEffort(improvement) {
  const effort = {
    small: 'Small (1-3 hours)',
    medium: 'Medium (0.5-1 day)', 
    large: 'Large (1-3 days)',
    xlarge: 'X-Large (3+ days)'
  };
  
  const text = improvement.toLowerCase();
  
  if (text.includes('add') && (text.includes('system') || text.includes('engine'))) {
    return effort.xlarge;
  }
  if (text.includes('enhance') || text.includes('improve')) {
    return effort.medium;
  }
  if (text.includes('fix') || text.includes('update')) {
    return effort.small;
  }
  
  return effort.medium; // Default
}

export function categorizeImprovement(improvement) {
  const text = improvement.toLowerCase();
  
  if (text.includes('dialogue') || text.includes('character') || text.includes('story')) {
    return 'narrative';
  }
  if (text.includes('interactive') || text.includes('choice') || text.includes('puzzle')) {
    return 'interactivity';
  }
  if (text.includes('visual') || text.includes('animation') || text.includes('effect')) {
    return 'visual';
  }
  if (text.includes('accessibility') || text.includes('performance') || text.includes('optimization')) {
    return 'technical';
  }
  
  return 'general';
}

// 🎯 Node Scoring System V2
export function calculateNodeScore(node, edges = []) {
  const weights = NODE_SCORE_WEIGHTS;

  const breakdown = {
    completeness: 0,
    depth: 0,
    agency: 0,
    hooks: 0,
    connectivity: 0
  };

  // Completeness: summary, dialogue, choices, features
  let present = 0;
  if (node?.data?.summary) present++;
  if (Array.isArray(node?.data?.dialogue) && node.data.dialogue.length > 0) present++;
  if ((Array.isArray(node?.data?.options) && node.data.options.length > 0) ||
      (Array.isArray(node?.data?.choices) && node.data.choices.length > 0)) {
    present++;
  }
  if (node?.data?.features) present++;
  breakdown.completeness = present / 4;

  // Narrative depth: dialogue lines + NPC count
  const dialogueLines = Array.isArray(node?.data?.dialogue) ? node.data.dialogue.length : 0;
  const dialogueScore = Math.min(dialogueLines / 5, 1); // 5+ lines => full score
  const npcCount = Array.isArray(node?.data?.characters) ? node.data.characters.length : 0;
  const npcScore = npcCount >= 2 ? 1 : npcCount / 2;
  breakdown.depth = (dialogueScore + npcScore) / 2;

  // Player agency / branching: number of choices
  const choiceCount = (node?.data?.options?.length || node?.data?.choices?.length || 0);
  breakdown.agency = choiceCount >= 2 ? 1 : choiceCount > 0 ? 0.5 : 0;

  // Visual/audio hooks: animations, typewriter, glitches, etc.
  const featureKeys = ['hasAnimation', 'hasTypewriter', 'hasGlitch', 'hasAudio', 'hasSound', 'hasMusic'];
  const hookCount = featureKeys.reduce((acc, key) => acc + (node?.data?.features?.[key] ? 1 : 0), 0);
  breakdown.hooks = hookCount > 0 ? Math.min(hookCount / 2, 1) : 0; // 2 hooks => full score

  // Connectivity: inbound + outbound edges
  let inCount = 0;
  let outCount = 0;
  edges.forEach(edge => {
    if (edge.source === node.id) outCount++;
    if (edge.target === node.id) inCount++;
  });
  const edgeTotal = inCount + outCount;
  breakdown.connectivity = edgeTotal >= 2 ? 1 : edgeTotal / 2;

  // Final weighted score (0-100)
  let total = 0;
  Object.entries(weights).forEach(([key, weight]) => {
    total += breakdown[key] * weight;
  });

  // Percentage contribution per factor
  const contributions = {};
  Object.entries(weights).forEach(([key, weight]) => {
    contributions[key] = Math.round(breakdown[key] * weight * 100);
  });

  return {
    score: Math.round(total * 100),
    breakdown,
    contributions
  };
}

// 🎯 Enhancement Progress Tracking
export function trackEnhancementProgress(nodeId, improvementId, status = 'in-progress') {
  const key = `enhancement-${nodeId}-${improvementId}`;
  const progress = {
    id: improvementId,
    nodeId,
    status, // 'planned', 'in-progress', 'testing', 'completed'
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: status === 'completed' ? new Date().toISOString() : null
  };
  
  localStorage.setItem(key, JSON.stringify(progress));
  return progress;
}

export function getEnhancementProgress(nodeId) {
  const keys = Object.keys(localStorage).filter(key => 
    key.startsWith(`enhancement-${nodeId}-`)
  );
  
  return keys.map(key => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }).filter(Boolean);
}

// 🎯 Quality Dashboard Data
export function generateQualityReport(nodes) {
  const report = {
    totalNodes: nodes.length,
    averageQuality: 0,
    qualityDistribution: { low: 0, medium: 0, high: 0 },
    topPriorityNodes: [],
    completedImprovements: 0,
    pendingImprovements: 0
  };
  
  let totalQuality = 0;
  
  nodes.forEach(node => {
    const quality = calculateNodeQuality(node);
    totalQuality += quality.overall;
    
    if (quality.overall < 6) {
      report.qualityDistribution.low++;
    } else if (quality.overall < 8) {
      report.qualityDistribution.medium++;
    } else {
      report.qualityDistribution.high++;
    }
    
    if (quality.overall < 8) {
      report.topPriorityNodes.push({
        id: node.id,
        title: node.data?.title || node.id,
        quality: quality.overall,
        priority: quality.priority,
        improvements: getNextImprovements(node, 1)
      });
    }
  });
  
  report.averageQuality = totalQuality / nodes.length;
  report.topPriorityNodes.sort((a, b) => a.quality - b.quality);
  
  return report;
}

export default {
  QUALITY_CRITERIA,
  ENHANCEMENT_PRIORITY,
  ENHANCEMENT_TEMPLATES,
  NODE_SCORE_WEIGHTS,
  NODE_SCORE_COLORS,
  getScoreColor,
  calculateNodeQuality,
  calculateNodeScore,
  getNextImprovements,
  trackEnhancementProgress,
  getEnhancementProgress,
  generateQualityReport
};
