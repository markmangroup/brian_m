export const realMatrixNodes = [
  // === DEPTH 0: INTRO GROUP ===
  {
    id: 'matrix-v1-entry',
    type: 'scene',
    depth: 0,
    group: 'intro',
    data: {
      title: 'Matrix Entry',
      pageUrl: '/matrix-v1',
      status: 'live',
      summary: 'User awakens in the simulation. System begins engagement.',
      characters: ['System'],
      puzzles: [],
      interactions: ['SceneIntro', 'NarrativeStart'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['Welcome to the simulation.', 'Your identity is not yet confirmed.'],
      
      // 🎯 NEW 10/10 ENHANCEMENT SYSTEM
      qualityRating: 7, // Current rating out of 10
      enhancement: {
        targetRating: 10,
        improvements: [
          'Add immersive awakening sequence with glitch effects',
          'Enhanced environmental storytelling with detailed scene descriptions',
          'Interactive UI elements for user engagement',
          'Personalized dialogue based on user data'
        ],
        narrative: {
          atmosphere: 'Dark digital void with scattered data fragments floating like stars',
          soundscape: 'Low electronic hum with distant keyboard clicks echoing through space',
          visualElements: 'Cascading green code rain, flickering holographic displays',
          emotionalTone: 'Mysterious anticipation with underlying digital unease'
        },
        interactivity: {
          hoverEffects: 'Code fragments highlight on cursor movement',
          clickableElements: 'Hidden data shards reveal backstory fragments',
          progressIndicators: 'Consciousness stability meter',
          accessibility: 'Full keyboard navigation and screen reader support'
        }
      }
    }
  },

  // === DEPTH 1: INTRO GROUP ===
  {
    id: 'matrix-name-prompt',
    type: 'dialogue',
    depth: 1,
    group: 'intro',
    data: {
      title: 'Identity Verification',
      pageUrl: '/matrix-v1/name-prompt',
      status: 'live',
      summary: 'Advanced identity verification system with biometric scanning and consciousness pattern recognition.',
      characters: ['System AI', 'Identity Scanner'],
      puzzles: ['IdentityValidation', 'BiometricScan'],
      interactions: ['InputField', 'DialogueResponse', 'IdentityScanning', 'RealTimeValidation'],
      features: { 
        hasTransition: true, 
        hasChoice: false, 
        hasCombat: false, 
        hasNPC: false, 
        hasAnimation: true,
        hasTypewriter: true,
        hasRealTimeValidation: true,
        hasAccessibility: true
      },
      dialogue: [
        'IDENTITY VERIFICATION PROTOCOL ACTIVATED',
        'State your identity designation for system registration...',
        'IDENTITY SCANNING INITIATED...',
        'Identity pattern validated. Consciousness recognized.'
      ],
      
      // 🎯 ENHANCED 10/10 IMPLEMENTATION
      qualityRating: 10, // UPGRADED from 6 to 10!
      enhancement: {
        targetRating: 10,
        improvements: [
          '✅ COMPLETED: Dynamic name validation with Matrix-style error messages',
          '✅ COMPLETED: Character creation depth with background selection',
          '✅ COMPLETED: System personality adaptation based on name input',
          '✅ COMPLETED: Enhanced visual feedback for identity establishment',
          '✅ COMPLETED: Typewriter effects and terminal-style animations',
          '✅ COMPLETED: Real-time identity strength analysis',
          '✅ COMPLETED: Full accessibility compliance',
          '✅ COMPLETED: Progressive scanning sequence with biometric feedback'
        ],
        criteria: {
          narrative: 10, // Rich atmospheric storytelling with identity theme
          interactivity: 10, // Real-time validation, scanning effects, confirmation flow
          visual: 10, // Letter-by-letter animation, scanning effects, state indicators
          technical: 10, // Full accessibility, performance optimized, error handling
          character: 8, // System AI personality, adaptive responses
          consequences: 9 // Name affects future interactions, stored in global state
        },
        narrative: {
          atmosphere: 'Identity scanning chamber with biometric displays and holographic interfaces',
          soundscape: 'Soft scanning beeps transitioning to recognition chimes with digital ambience',
          visualElements: 'Holographic name assembly with real-time character projection and scanning effects',
          emotionalTone: 'Identity discovery with growing self-awareness and system recognition'
        },
        interactivity: {
          nameEffects: '✅ Letters materialize one by one with digital effects and delays',
          validationFeedback: '✅ Real-time identity strength analysis with color-coded feedback',
          characterPreview: '✅ Dynamic name preview with character-by-character animation',
          accessibility: '✅ Full keyboard navigation, screen reader support, and voice input compatibility',
          scanningSequence: '✅ Progressive biometric scanning with 4-stage validation process',
          confirmationFlow: '✅ Multi-step confirmation with retry mechanisms'
        },
        technical: {
          performance: 'Optimized animations with proper cleanup and memory management',
          accessibility: 'Full ARIA labels, keyboard navigation, and screen reader compatibility',
          errorHandling: 'Comprehensive input validation with user-friendly error messages',
          stateManagement: 'Proper React hooks usage with useStoryProgress integration'
        }
      }
    }
  },

  // === DEPTH 2: INTRO GROUP ===
  {
    id: 'matrix-pill-choice',
    type: 'choice',
    depth: 2,
    group: 'intro',
    data: {
      title: 'The Choice',
      pageUrl: '/matrix-v1',
      status: 'live',
      summary: 'Morpheus presents a decision to the user: red or blue pill.',
      characters: ['Morpheus'],
      puzzles: [],
      interactions: ['ChoicePrompt'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: true, hasAnimation: true },
      dialogue: ['This is your last chance.', 'Take the red pill, or stay in the Matrix.'],
      options: ['Red Pill', 'Blue Pill'],
      
      // 🎯 10/10 ENHANCEMENT SYSTEM
      qualityRating: 9, // Already quite good due to iconic nature
      enhancement: {
        targetRating: 10,
        improvements: [
          'Extended Morpheus dialogue with philosophical depth',
          'Pill physics simulation with realistic hand interactions',
          'Consequence preview system without spoiling mystery',
          'Enhanced character animation and facial expressions'
        ],
        narrative: {
          atmosphere: 'Stark white construct room with infinite depth and floating chairs',
          soundscape: 'Morpheus\' measured breathing with subtle reality distortions',
          visualElements: 'Ultra-realistic pill rendering with light refraction effects',
          emotionalTone: 'Profound gravity of choice with time suspension feeling'
        },
        interactivity: {
          pillHover: 'Pills glow and pulse with respective path energy',
          choiceWeight: 'Decision timer with increasing tension',
          morpheusReaction: 'Real-time facial expression based on hover duration',
          accessibility: 'Detailed audio descriptions of visual metaphors'
        }
      }
    }
  },

  // === DEPTH 3: RED PILL GROUP ===
  {
    id: 'matrix-pill-choice-red',
    type: 'scene',
    depth: 3,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Pill Path',
      pageUrl: '/matrix-v1/terminal',
      status: 'live',
      summary: 'The world begins to glitch. The user descends into raw data.',
      characters: ['System'],
      puzzles: [],
      interactions: ['SceneTransition', 'GlitchReveal'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['Connection destabilized.', 'Prepare for extraction.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 3: BLUE PILL GROUP ===
  {
    id: 'matrix-pill-choice-blue',
    type: 'scene',
    depth: 3,
    group: 'blue-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Blue Pill Path',
      pageUrl: '/matrix-v1/stage-1',
      status: 'live',
      summary: 'User returns to the simulated world, forgetting the offer.',
      characters: ['Neo'],
      puzzles: [],
      interactions: ['SceneReset'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['You wake up and everything feels... normal.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 4: RED PILL GROUP ===
  {
    id: 'matrix-red-awakening',
    type: 'scene',
    depth: 4,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Awakening',
      pageUrl: '/matrix-v1/checkpoint',
      status: 'live',
      summary: 'Neo awakens in the real world and reaches a checkpoint.',
      characters: ['Neo', 'Morpheus'],
      puzzles: [],
      interactions: ['Cutscene', 'CheckpointMarker'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: true, hasAnimation: true },
      dialogue: ['You\'ve crossed the line.', 'We have to move fast.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 4: BLUE PILL GROUP ===
  {
    id: 'matrix-blue-loop',
    type: 'scene',
    depth: 4,
    group: 'blue-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Dream Within a Dream',
      pageUrl: '/matrix-v1/stage-2',
      status: 'live',
      summary: 'User experiences a looped sequence, hinting at suppressed memories.',
      characters: ['Neo'],
      puzzles: ['Loop Test'],
      interactions: ['LoopDetection'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['Didn\'t this already happen?', 'You feel a sense of déjà vu.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 5: RED PILL GROUP ===
  {
    id: 'matrix-red-trainer',
    type: 'training',
    depth: 5,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Training Upload',
      pageUrl: '/matrix-v1/guardian-call',
      status: 'live',
      summary: 'Neo enters training mode and begins combat simulation.',
      characters: ['Neo'],
      puzzles: ['Combat Basics'],
      interactions: ['CombatEngine', 'InstructionOverlay'],
      features: { hasTransition: false, hasChoice: false, hasCombat: true, hasNPC: false, hasAnimation: true },
      dialogue: ['Loading training sequence.', 'Let\'s see what you can do.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 6: GHOST LAYER GROUP ===
  {
    id: 'matrix-shard-init',
    type: 'scene',
    depth: 6,
    group: 'ghost-layer',
    data: {
      title: 'Shard Initialization',
      pageUrl: '/matrix-v1/shard-init',
      status: 'live',
      reviewedBy: 'Mike',
      reviewedAt: '2025-06-01',
      summary: 'The terminal destabilizes. Code fragments demand reassembly.',
      characters: ['System', 'Fracture Entity'],
      puzzles: ['Code Reorder'],
      interactions: ['DragPuzzle'],
      features: { hasTransition: true, hasCombat: false, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasNPC: true },
      dialogue: ['These lines are not yours.', 'Restore what you remember.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === NEW: FACTION PORTAL ===
  {
    id: 'matrix-faction-portal',
    type: 'scene',
    depth: 5,
    group: 'factions',
    data: {
      title: 'Faction Portal',
      pageUrl: '/matrix-v1/portal/factions',
      status: 'live',
      summary: 'Gateway to the three resistance factions: Zion Fleet, Rebel Hackers, and Oracle Seekers.',
      characters: ['System'],
      puzzles: [],
      interactions: ['FactionSelection', 'ProgressTracking'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: false, hasAnimation: true },
      dialogue: ['Choose your path through the resistance networks.', 'Each faction offers unique training and wisdom.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === NEW: GLITCH PORTAL (MULTIVERSE GATEWAY) ===
  {
    id: 'matrix-glitch-portal',
    type: 'choice',
    depth: 6,
    group: 'ghost-layer',
    data: {
      title: 'Reality Breach Portal',
      pageUrl: '/matrix-v1/glitch-portal',
      status: 'live',
      summary: 'Reality is bleeding — new signals detected from alternate universes.',
      characters: ['System', 'Multiverse Echo'],
      puzzles: ['Reality Switch'],
      interactions: ['ThemeToggle', 'DimensionalShift'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: false, hasAnimation: true, hasGlitch: true },
      dialogue: ['WARNING: Reality breach detected.', 'Multiverse signals bleeding through quantum barriers.', 'Choose your dimensional reality.'],
      options: ['Matrix Reality', 'Witcher Realm', 'Night City'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 6: ECHO GROUP ===
  {
    id: 'matrix-echo-loop',
    type: 'dialogue',
    depth: 6,
    group: 'echo',
    data: {
      title: 'Echo Loop',
      pageUrl: '/matrix-v1/echo-loop',
      status: 'live',
      reviewedBy: 'Mike',
      reviewedAt: '2025-06-01',
      summary: 'The user is caught in a recursive conversation. Only by noticing the pattern can they break it.',
      characters: ['Neo', 'Echo'],
      puzzles: ['Repeat Detection'],
      interactions: ['DialogueLoop'],
      features: { hasTransition: true, hasCombat: false, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasDialogue: true, hasNPC: true },
      dialogue: ['Did I already say that?', 'You must listen harder.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 7: GHOST LAYER GROUP ===
  {
    id: 'matrix-shard-insert',
    type: 'scene',
    depth: 7,
    group: 'ghost-layer',
    data: {
      title: 'Shard Insert',
      pageUrl: '/matrix-v1/shard-insert',
      status: 'live',
      reviewedBy: 'Mike',
      reviewedAt: '2025-06-01',
      summary: 'Cascading syntax errors. User must catch and resolve matching tokens.',
      characters: ['System'],
      puzzles: ['Syntax Catch'],
      interactions: ['TimedClick'],
      features: { hasTransition: true, hasCombat: false, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasNPC: false },
      dialogue: ['// ERROR: closing bracket not found', 'Find the symbol before it finds you.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 7: ECHO GROUP ===
  {
    id: 'matrix-echo-verify',
    type: 'scene',
    depth: 7,
    group: 'echo',
    data: {
      title: 'Echo Verify',
      pageUrl: '/matrix-v1/echo-verify',
      status: 'live',
      reviewedBy: 'Mike',
      reviewedAt: '2025-06-01',
      summary: 'A symbol rhythm pattern appears. Match the sequence or fall back into the loop.',
      characters: ['Mirror Self'],
      puzzles: ['Pattern Memory'],
      interactions: ['RhythmMatch'],
      features: { hasTransition: true, hasCombat: false, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasDialogue: false, hasNPC: false },
      dialogue: ['▢ ▢ ▢ ▢ ✕ ✕ ▢ ✕', 'Listen with your eyes.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 8: GHOST LAYER GROUP (SHARED) ===
  {
    id: 'matrix-ghost-layer-2',
    type: 'scene',
    depth: 8,
    group: 'ghost-layer',
    data: {
      title: 'Ghost Layer 2',
      pageUrl: '/matrix-v1/ghost-layer-2',
      status: 'stub',
      summary: 'Both paths converge into a raw transmission chamber. The next phase awaits.',
      characters: ['System', 'Neo'],
      puzzles: [],
      interactions: ['TransmissionReceiver'],
      features: { hasTransition: true, hasCombat: false, hasChoice: false, hasPuzzle: false, hasAnimation: true, hasDialogue: true, hasNPC: true },
      dialogue: ['This is no longer a test.', 'You are becoming signal.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 5: NEW CHOICE NODE (Red Path Branch) ===
  {
    id: 'matrix-red-faction-choice',
    type: 'choice',
    depth: 5,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Faction Choice',
      pageUrl: '/matrix-v1/faction-choice',
      status: 'stub',
      summary: 'Morpheus offers you a choice of resistance factions to join.',
      characters: ['Morpheus', 'Niobe', 'Commander Locke'],
      puzzles: [],
      interactions: ['ChoicePrompt', 'FactionAnalysis'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: true, hasAnimation: true },
      dialogue: ['Each faction serves the resistance differently.', 'Choose wisely - this will define your path.'],
      options: ['Zion Fleet', 'Rebel Hackers', 'Oracle Seekers'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 6: FACTION PATHS ===
  {
    id: 'matrix-zion-fleet',
    type: 'training',
    depth: 6,
    group: 'factions',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'fleet',
    data: {
      title: 'Zion Fleet Training',
      pageUrl: '/matrix-v1/zion-fleet',
      status: 'live',
      summary: 'Military training with Commander Locke and Niobe. Learn ship operations and combat tactics.',
      characters: ['Locke', 'Niobe'],
      puzzles: ['Combat Simulation', 'Ship Operations'],
      interactions: ['CombatTraining', 'FleetCommand'],
      features: { hasTransition: true, hasChoice: false, hasCombat: true, hasNPC: true, hasAnimation: true },
      dialogue: ['Welcome to the Zion Fleet.', 'We are the backbone of humanity\'s resistance.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'matrix-rebel-hackers',
    type: 'training',
    depth: 6,
    group: 'factions',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'hackers',
    data: {
      title: 'Rebel Hackers Training',
      pageUrl: '/matrix-v1/rebel-hackers',
      status: 'live',
      summary: 'Hacker training with Tank and Dozer. Learn to bend Matrix rules and manipulate code.',
      characters: ['Tank', 'Dozer'],
      puzzles: ['Code Injection', 'Rule Manipulation'],
      interactions: ['CodeLab', 'SystemHacking'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: true, hasAnimation: true, hasPuzzle: true },
      dialogue: ['This path risks madness from seeing too deeply.', 'But the rewards... you can rewrite reality itself.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'matrix-oracle-seekers',
    type: 'training',
    depth: 6,
    group: 'factions',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'seekers',
    data: {
      title: 'Oracle Seekers Training',
      pageUrl: '/matrix-v1/oracle-seekers',
      status: 'live',
      summary: 'Wisdom training with the Oracle and Seraph. Seek philosophical insights and future sight.',
      characters: ['Oracle', 'Seraph'],
      puzzles: ['Philosophical Insight', 'Prophecy Reading'],
      interactions: ['WisdomQuest', 'FutureSight'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: true, hasAnimation: true, hasWisdom: true },
      dialogue: ['Know thyself.', 'The path of wisdom is not for those who seek easy answers.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 5: BLUE PATH CHOICE ===
  {
    id: 'matrix-blue-investigation',
    type: 'choice',
    depth: 5,
    group: 'blue-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'blue',
    data: {
      title: 'Investigation Path',
      pageUrl: '/matrix-v1/investigation',
      status: 'stub',
      summary: 'Despite taking the blue pill, you notice glitches. Investigate or ignore?',
      characters: ['Agent Smith', 'Trinity (disguised)'],
      puzzles: [],
      interactions: ['ChoicePrompt', 'GlitchDetection'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: true, hasAnimation: true },
      dialogue: ['Something isn\'t right.', 'Will you dig deeper or let it slide?'],
      options: ['Investigate Glitches', 'Ignore and Continue', 'Report to Authorities'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DEPTH 6: BLUE INVESTIGATION PATHS ===
  {
    id: 'matrix-glitch-hunter',
    type: 'scene',
    depth: 6,
    group: 'investigation',
    parentChoice: 'matrix-blue-investigation',
    choiceValue: 'investigate',
    data: {
      title: 'Glitch Hunter',
      pageUrl: '/matrix-v1/glitch-hunter',
      status: 'stub',
      summary: 'Hunt down anomalies in the simulated world. Each discovery leads deeper.',
      characters: ['Neo', 'Mysterious Contact'],
      puzzles: ['Pattern Recognition', 'Anomaly Detection'],
      interactions: ['GlitchHunting', 'AnomalyTracker'],
      features: { hasTransition: true, hasCombat: false, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasNPC: true },
      dialogue: ['The glitches are everywhere once you start looking.', 'Someone is trying to contact you.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'matrix-authority-agent',
    type: 'scene',
    depth: 6,
    group: 'authority',
    parentChoice: 'matrix-blue-investigation',
    choiceValue: 'report',
    data: {
      title: 'Authority Agent',
      pageUrl: '/matrix-v1/authority-agent',
      status: 'stub',
      summary: 'You\'ve reported the glitches. Now you\'re working with Agent Smith.',
      characters: ['Agent Smith', 'Agent Brown'],
      puzzles: ['Loyalty Test', 'Hunt Resistance'],
      interactions: ['AgentBriefing', 'ResistanceHunt'],
      features: { hasTransition: true, hasCombat: true, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasNPC: true },
      dialogue: ['Mr. Anderson. We\'ve been looking for you.', 'Help us find the others.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === CROSS-PATH CONVERGENCE NODES ===
  {
    id: 'matrix-skill-gate-alpha',
    type: 'scene',
    depth: 7,
    group: 'convergence',
    unlockConditions: ['matrix-zion-fleet', 'matrix-glitch-hunter'], // Requires BOTH paths
    data: {
      title: 'Skill Gate Alpha',
      pageUrl: '/matrix-v1/skill-gate-alpha',
      status: 'stub',
      summary: 'Only those with both combat training and glitch awareness can enter.',
      characters: ['Sentinel AI', 'Training Construct'],
      puzzles: ['Combined Skills Test'],
      interactions: ['SkillValidation', 'CombinedChallenge'],
      features: { hasTransition: true, hasCombat: true, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasNPC: false },
      dialogue: ['Prove you have learned from both worlds.', 'Integration test initiated.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'matrix-knowledge-nexus',
    type: 'dialogue',
    depth: 7,
    group: 'convergence',
    unlockConditions: ['matrix-oracle-seekers', 'matrix-rebel-hackers'], // Requires wisdom AND hacking
    data: {
      title: 'Knowledge Nexus',
      pageUrl: '/matrix-v1/knowledge-nexus',
      status: 'stub',
      summary: 'Where Oracle wisdom meets hacker innovation. A dangerous combination.',
      characters: ['Oracle', 'The Architect', 'Advanced AI'],
      puzzles: ['Philosophical Hacking', 'Reality Manipulation'],
      interactions: ['WisdomHacking', 'RealityBending'],
      features: { hasTransition: true, hasCombat: false, hasChoice: true, hasPuzzle: true, hasAnimation: true, hasDialogue: true, hasNPC: true },
      dialogue: ['When prophecy meets code, reality becomes fluid.', 'What will you choose to believe?'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === DYNAMIC UNLOCK NODE ===
  {
    id: 'matrix-trinity-rescue',
    type: 'scene',
    depth: 8,
    group: 'dynamic',
    unlockConditions: ['matrix-authority-agent', 'matrix-zion-fleet'], // Unexpected combination
    data: {
      title: 'Trinity Rescue',
      pageUrl: '/matrix-v1/trinity-rescue',
      status: 'stub',
      summary: 'Your agent training helps you infiltrate and rescue Trinity from her own mission.',
      characters: ['Trinity', 'Agent Smith', 'Neo'],
      puzzles: ['Stealth Infiltration', 'Double Agent'],
      interactions: ['StealthMission', 'MoralChoice'],
      features: { hasTransition: true, hasCombat: true, hasChoice: true, hasPuzzle: true, hasAnimation: true, hasNPC: true },
      dialogue: ['I know you\'re not really one of them.', 'Will you help me escape?'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === FINAL CONVERGENCE WITH MULTIPLE PATHS ===
  {
    id: 'matrix-the-source',
    type: 'ending',
    depth: 9,
    group: 'finale',
    unlockConditions: ['matrix-skill-gate-alpha', 'matrix-knowledge-nexus', 'matrix-trinity-rescue'], // Requires ALL convergence paths
    data: {
      title: 'The Source',
      pageUrl: '/matrix-v1/the-source',
      status: 'stub',
      summary: 'All paths lead here. Face the Architect with the combined knowledge of every choice you\'ve made.',
      characters: ['The Architect', 'Neo', 'Trinity', 'Morpheus'],
      puzzles: ['Ultimate Choice', 'Reality Decision'],
      interactions: ['FinalChoice', 'RealityRewrite'],
      features: { hasTransition: false, hasCombat: false, hasChoice: true, hasPuzzle: true, hasAnimation: true, hasDialogue: true, hasNPC: true },
      dialogue: ['The Matrix was just the beginning.', 'What will you do with the power to reshape reality?'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === NIGHT CITY CLUSTER (CYBERPUNK SIDE PATH) ===
  {
    id: 'nc-entry',
    type: 'scene',
    depth: 7,
    group: 'night-city',
    data: {
      title: 'Night City Entry',
      pageUrl: '/matrix-v1/night-city/entry',
      status: 'live',
      summary: 'Reality breach stabilizes. Welcome to Night City - where chrome meets flesh and data is currency.',
      characters: ['Johnny Silverhand', 'V', 'Rogue AI'],
      puzzles: [],
      interactions: ['CyberpunkIntro', 'NeonSceneReveal'],
      features: { hasTransition: true, hasChoice: false, hasCombat: false, hasNPC: true, hasAnimation: true, hasGlitch: true },
      dialogue: ['Wake the f*ck up, samurai.', 'This ain\'t Kansas anymore, choom.', 'Data flows like blood through these streets.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'nc-bouncer',
    type: 'choice',
    depth: 8,
    group: 'night-city',
    data: {
      title: 'Club Bouncer',
      pageUrl: '/matrix-v1/night-city/bouncer',
      status: 'live',
      summary: 'Massive cyborg bouncer blocks the Afterlife entrance. Choose your approach to the legendary fixer bar.',
      characters: ['Cyborg Bouncer', 'Street Kid', 'Corpo Exec'],
      puzzles: ['Social Engineering', 'Tech Bypass'],
      interactions: ['ChoicePrompt', 'SocialManipulation'],
      features: { hasTransition: true, hasChoice: true, hasCombat: true, hasNPC: true, hasAnimation: true },
      dialogue: ['Entry fee is 500 eddies or a data chip worth my time.', 'You look like trouble, but the right kind.'],
      options: ['Pay 500 Eddies', 'Offer Data Chip', 'Hack Cyberware', 'Start Fight'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'nc-netdiver',
    type: 'training',
    depth: 9,
    group: 'night-city',
    data: {
      title: 'Netrunner Deep Dive',
      pageUrl: '/matrix-v1/night-city/netdiver',
      status: 'live',
      summary: 'Jack into cyberspace. Navigate ICE, avoid trace programs, and steal corporate secrets.',
      characters: ['Alt Cunningham', 'Netwatch Agent', 'AI Collective'],
      puzzles: ['ICE Breaking', 'Trace Evasion', 'Data Extraction'],
      interactions: ['CyberdeckInterface', 'NetrunningPuzzle'],
      features: { hasTransition: true, hasChoice: false, hasCombat: true, hasNPC: true, hasAnimation: true, hasPuzzle: true },
      dialogue: ['The Net remembers everything, choom.', 'Beyond the Blackwall, AI gods are dreaming.', 'Data wants to be free.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'nc-escape',
    type: 'scene',
    depth: 10,
    group: 'night-city',
    unlockConditions: ['nc-bouncer'], // Must get past bouncer first
    data: {
      title: 'Corporate Escape',
      pageUrl: '/matrix-v1/night-city/escape',
      status: 'live',
      summary: 'Corpo security converges. High-speed chase through Night City\'s neon-soaked streets.',
      characters: ['MaxTac Officer', 'Street Medic', 'Trauma Team'],
      puzzles: ['Vehicle Chase', 'Pursuit Evasion'],
      interactions: ['HighSpeedChase', 'CombatDriving'],
      features: { hasTransition: true, hasChoice: false, hasCombat: true, hasNPC: true, hasAnimation: true, hasTimer: true },
      dialogue: ['This is MaxTac. Surrender or be flatlined.', 'Trauma Team inbound. Clear the area.', 'Another day, another corpo conspiracy.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'nc-file',
    type: 'dialogue',
    depth: 11,
    group: 'night-city',
    unlockConditions: ['nc-netdiver'], // Must complete netrunning first
    data: {
      title: 'The Arasaka Files',
      pageUrl: '/matrix-v1/night-city/files',
      status: 'live',
      summary: 'Stolen data reveals the truth: Night City and The Matrix are connected. Same architects, different prisons.',
      characters: ['Saburo Arasaka', 'The Architect', 'Rogue AI Fragment'],
      puzzles: ['Data Decryption', 'Lore Analysis'],
      interactions: ['FileAnalysis', 'LoreReveal'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: false, hasAnimation: true, hasLore: true },
      dialogue: ['Project: Neo-Tokyo was just the beginning.', 'The Matrix. Night City. Two sides of the same control system.', 'Free your mind... jack out of the system.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  {
    id: 'nc-silverhand',
    type: 'ending',
    depth: 12,
    group: 'night-city',
    unlockConditions: ['nc-file', 'nc-escape'], // Requires both lore and action paths
    data: {
      title: 'Johnny\'s Revolution',
      pageUrl: '/matrix-v1/night-city/silverhand',
      status: 'live',
      summary: 'Johnny Silverhand offers a choice: burn down the corporate prison or find another way to freedom.',
      characters: ['Johnny Silverhand', 'V', 'Alt Cunningham'],
      puzzles: ['Final Revolution Choice'],
      interactions: ['RevolutionChoice', 'CyberpunkEnding'],
      features: { hasTransition: false, hasChoice: true, hasCombat: true, hasNPC: true, hasAnimation: true, hasEnding: true },
      dialogue: ['Wake up and smell the ashes, choom.', 'Burn the corpo tower or find another path?', 'Never fade away.'],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "low",
        updatedAt: "2025-06-03T00:00:00Z"
      }
    }
  },

  // === NEW WITCHER WORLD NODES ===
  {
    id: 'witcher-entry',
    type: 'scene',
    depth: 1,
    group: 'witcher',
    data: {
      title: 'The Path Begins',
      pageUrl: '/witcher/entry',
      status: 'stub',
      summary: 'A strange realm brews in frost and magic. Ancient keeps rise from misty valleys where monsters prowl.',
      characters: ['Vesemir', 'Local Villager', 'Mysterious Bard'],
      puzzles: ['PathChoice', 'VillageEncounter'],
      interactions: ['WitcherIntro', 'EnvironmentInspection'],
      features: { 
        hasTransition: true, 
        hasChoice: false, 
        hasCombat: false, 
        hasNPC: true, 
        hasAnimation: true,
        hasLore: true,
        hasAtmosphere: true
      },
      dialogue: [
        'The path of a witcher is fraught with danger and solitude.',
        'These lands hold secrets older than kings and kingdoms.',
        'Choose your trials carefully - not all who walk this path survive.'
      ],
      
      // 🎯 WITCHER ENHANCEMENT SYSTEM
      qualityRating: 5, // Starting baseline
      enhancement: {
        qualityRating: 8,
        status: "live",
        priority: "medium",
        updatedAt: "2025-06-02T18:00:00Z",
        targetRating: 10,
        improvements: [
          'Add immersive Witcher world atmosphere with medieval fantasy elements',
          'Enhanced environmental storytelling with monster lore',
          'Interactive medallion vibration system for danger detection',
          'Dynamic weather and day/night cycle affecting encounters'
        ],
        criteria: {
          narrative: 6, // Rich fantasy atmosphere
          interactivity: 4, // Basic scene interaction needed
          visual: 5, // Medieval fantasy styling required
          technical: 5, // Standard implementation
          character: 7, // Strong Witcher NPCs
          consequences: 5 // Path choice impacts
        },
        narrative: {
          atmosphere: 'Misty mountain valleys with ancient stone keeps and twisted trees',
          soundscape: 'Wind through pines, distant wolf howls, crackling fires',
          visualElements: 'Witcher medallion interface, rune inscriptions, monster tracks',
          emotionalTone: 'Mysterious anticipation with underlying medieval danger'
        },
        interactivity: {
          medallionEffects: 'Witcher medallion vibrates to detect magical presence',
          environmentClues: 'Interactive monster tracks and magical signs',
          characterDialogue: 'Deep Witcher lore conversations with NPCs',
          accessibility: 'Full fantasy-themed keyboard navigation and screen reader support'
        }
      }
    }
  },

  {
    id: 'witcher-mutation-choice',
    type: 'choice',
    depth: 2,
    group: 'witcher',
    data: {
      title: 'Trial of Grasses',
      pageUrl: '/witcher/mutation-choice',
      status: 'stub',
      summary: 'Do you endure mutation, or choose another path? The Trial of Grasses transforms few and kills many.',
      characters: ['Vesemir', 'Lambert', 'Eskel'],
      puzzles: ['TrialEndurance', 'MutationChoice'],
      interactions: ['ChoicePrompt', 'PainEndurance', 'AlchemyRitual'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: false, 
        hasNPC: true, 
        hasAnimation: true,
        hasPuzzle: true,
        hasConsequences: true
      },
      dialogue: [
        'The Trial of Grasses changes you forever - if it doesn\'t kill you first.',
        'Many boys enter these chambers. Few emerge as witchers.',
        'Your path splits here: embrace the mutation or find another way.'
      ],
      options: ['Undergo Trial of Grasses', 'Seek Alternative Path', 'Study Ancient Texts', 'Train as Bard'],
      
      // 🎯 CHOICE ENHANCEMENT SYSTEM
      qualityRating: 5,
      enhancement: {
        qualityRating: 8,
        status: "live",
        priority: "medium",
        updatedAt: "2025-06-02T18:00:00Z",
        targetRating: 10,
        improvements: [
          'Add visceral Trial of Grasses experience with visual effects',
          'Multiple branching paths based on player choice',
          'Enhanced character reactions and long-term consequences',
          'Alchemical preparation mini-game before the trial'
        ],
        criteria: {
          narrative: 8, // High-stakes witcher lore moment
          interactivity: 6, // Multiple meaningful choices
          visual: 5, // Mutation visual effects needed
          technical: 5, // Choice branching logic
          character: 7, // Key witcher trainer NPCs
          consequences: 9 // Life-changing decision point
        }
      }
    }
  },

  {
    id: 'witcher-sign-training',
    type: 'training',
    depth: 3,
    group: 'witcher',
    data: {
      title: 'Master the Signs',
      pageUrl: '/witcher/sign-training',
      status: 'stub',
      summary: 'You begin to wield the basic forces of magic. Learn Igni, Quen, Aard, Yrden, and Axii.',
      characters: ['Triss Merigold', 'Keira Metz', 'Master Witcher'],
      puzzles: ['SignCasting', 'MagicControl', 'CombatPractice'],
      interactions: ['SpellCasting', 'MagicTraining', 'CombatDrills'],
      features: { 
        hasTransition: true, 
        hasChoice: false, 
        hasCombat: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasPuzzle: true,
        hasTraining: true,
        hasMagic: true
      },
      dialogue: [
        'Magic flows through focused will and precise gestures.',
        'Each Sign serves a different purpose in a witcher\'s arsenal.',
        'Practice until the Signs become as natural as breathing.'
      ],
      
      // 🎯 TRAINING ENHANCEMENT SYSTEM
      qualityRating: 5,
      enhancement: {
        qualityRating: 8,
        status: "live",
        priority: "medium",
        updatedAt: "2025-06-02T18:00:00Z",
        targetRating: 10,
        improvements: [
          'Interactive Sign casting with gesture recognition',
          'Progressive difficulty training challenges',
          'Visual feedback for successful spell casting',
          'Combat scenarios testing different Sign combinations'
        ],
        criteria: {
          narrative: 6, // Witcher magic training lore
          interactivity: 8, // High interactivity for training
          visual: 7, // Magical effects and animations
          technical: 6, // Training progression system
          character: 6, // Magic teacher NPCs
          consequences: 6 // Skill development impacts
        }
      }
    }
  }
];

export const realMatrixEdges = [
  // Base flow edges
  { id: 'edge-entry-to-name', source: 'matrix-v1-entry', target: 'matrix-name-prompt' },
  { id: 'edge-name-to-choice', source: 'matrix-name-prompt', target: 'matrix-pill-choice' },
  
  // Choice branch edges (only shown when expanded)
  { id: 'edge-choice-to-red', source: 'matrix-pill-choice', target: 'matrix-pill-choice-red', label: 'Red Pill' },
  { id: 'edge-choice-to-blue', source: 'matrix-pill-choice', target: 'matrix-pill-choice-blue', label: 'Blue Pill' },
  
  // Red path continuation
  { id: 'edge-red-to-awakening', source: 'matrix-pill-choice-red', target: 'matrix-red-awakening' },
  { id: 'edge-awakening-to-trainer', source: 'matrix-red-awakening', target: 'matrix-red-trainer' },
  
  // Blue path continuation
  { id: 'edge-blue-to-loop', source: 'matrix-pill-choice-blue', target: 'matrix-blue-loop' },

  // === NEW FACTION CHOICE SYSTEM ===
  // Red path now branches to faction choice
  { id: 'edge-trainer-to-faction-choice', source: 'matrix-red-trainer', target: 'matrix-red-faction-choice' },
  
  // Faction choice branches
  { id: 'edge-faction-to-zion', source: 'matrix-red-faction-choice', target: 'matrix-zion-fleet', label: 'Zion Fleet' },
  { id: 'edge-faction-to-hackers', source: 'matrix-red-faction-choice', target: 'matrix-rebel-hackers', label: 'Rebel Hackers' },
  { id: 'edge-faction-to-oracle', source: 'matrix-red-faction-choice', target: 'matrix-oracle-seekers', label: 'Oracle Seekers' },

  // Blue path investigation choice
  { id: 'edge-blue-loop-to-investigation', source: 'matrix-blue-loop', target: 'matrix-blue-investigation' },
  
  // Investigation choice branches
  { id: 'edge-investigation-to-glitch', source: 'matrix-blue-investigation', target: 'matrix-glitch-hunter', label: 'Investigate' },
  { id: 'edge-investigation-to-agent', source: 'matrix-blue-investigation', target: 'matrix-authority-agent', label: 'Report' },

  // === ORIGINAL GHOST/ECHO PATHS (still accessible from trainer) ===
  { id: 'edge-trainer-to-shard-init', source: 'matrix-red-trainer', target: 'matrix-shard-init' },
  { id: 'edge-shard-init-to-insert', source: 'matrix-shard-init', target: 'matrix-shard-insert' },
  { id: 'edge-shard-insert-to-ghost-2', source: 'matrix-shard-insert', target: 'matrix-ghost-layer-2' },

  { id: 'edge-blue-loop-to-echo', source: 'matrix-blue-loop', target: 'matrix-echo-loop' },
  { id: 'edge-echo-loop-to-verify', source: 'matrix-echo-loop', target: 'matrix-echo-verify' },
  { id: 'edge-echo-verify-to-ghost-2', source: 'matrix-echo-verify', target: 'matrix-ghost-layer-2' },

  // === CROSS-PATH CONVERGENCE EDGES ===
  // Skill Gate Alpha (requires Zion Fleet + Glitch Hunter)
  { id: 'edge-zion-to-skill-gate', source: 'matrix-zion-fleet', target: 'matrix-skill-gate-alpha', label: 'Combat Ready' },
  { id: 'edge-glitch-to-skill-gate', source: 'matrix-glitch-hunter', target: 'matrix-skill-gate-alpha', label: 'Awareness Ready' },

  // Knowledge Nexus (requires Oracle + Hackers)
  { id: 'edge-oracle-to-nexus', source: 'matrix-oracle-seekers', target: 'matrix-knowledge-nexus', label: 'Wisdom Path' },
  { id: 'edge-hackers-to-nexus', source: 'matrix-rebel-hackers', target: 'matrix-knowledge-nexus', label: 'Tech Path' },

  // Trinity Rescue (requires Agent + Zion)
  { id: 'edge-agent-to-rescue', source: 'matrix-authority-agent', target: 'matrix-trinity-rescue', label: 'Double Agent' },
  { id: 'edge-zion-to-rescue', source: 'matrix-zion-fleet', target: 'matrix-trinity-rescue', label: 'Rescue Mission' },

  // === ADDITIONAL CROSS-CONNECTIONS ===
  // Oracle seekers can also connect to Ghost Layer
  { id: 'edge-oracle-to-ghost', source: 'matrix-oracle-seekers', target: 'matrix-ghost-layer-2', label: 'Prophecy Path' },
  
  // Hackers can connect to Echo Verify (code manipulation)
  { id: 'edge-hackers-to-echo', source: 'matrix-rebel-hackers', target: 'matrix-echo-verify', label: 'Code Echo' },
  
  // Glitch Hunter can connect to Shard Insert (anomaly detection)
  { id: 'edge-glitch-to-shard', source: 'matrix-glitch-hunter', target: 'matrix-shard-insert', label: 'Anomaly Hunt' },

  // Authority Agent can connect to Echo Loop (surveillance)
  { id: 'edge-agent-to-echo-loop', source: 'matrix-authority-agent', target: 'matrix-echo-loop', label: 'Surveillance Protocol' },

  // === FINAL CONVERGENCE ===
  // All convergence nodes lead to The Source
  { id: 'edge-skill-gate-to-source', source: 'matrix-skill-gate-alpha', target: 'matrix-the-source', label: 'Proven Warrior' },
  { id: 'edge-nexus-to-source', source: 'matrix-knowledge-nexus', target: 'matrix-the-source', label: 'Enlightened Hacker' },
  { id: 'edge-rescue-to-source', source: 'matrix-trinity-rescue', target: 'matrix-the-source', label: 'Redeemed Agent' },
  
  // Ghost Layer 2 also connects to The Source
  { id: 'edge-ghost-to-source', source: 'matrix-ghost-layer-2', target: 'matrix-the-source', label: 'Signal Complete' },

  // === NIGHT CITY CLUSTER CONNECTIONS ===
  // Glitch Portal connects to Night City Entry
  { id: 'edge-glitch-to-night-city', source: 'matrix-glitch-portal', target: 'nc-entry', label: 'Breach Night City' },
  
  // Night City internal flow
  { id: 'edge-nc-entry-to-bouncer', source: 'nc-entry', target: 'nc-bouncer' },
  { id: 'edge-nc-bouncer-to-netdiver', source: 'nc-bouncer', target: 'nc-netdiver', label: 'Access Granted' },
  { id: 'edge-nc-bouncer-to-escape', source: 'nc-bouncer', target: 'nc-escape', label: 'Fight Started' },
  { id: 'edge-nc-netdiver-to-file', source: 'nc-netdiver', target: 'nc-file', label: 'Data Stolen' },
  { id: 'edge-nc-file-to-silverhand', source: 'nc-file', target: 'nc-silverhand', label: 'Truth Revealed' },
  { id: 'edge-nc-escape-to-silverhand', source: 'nc-escape', target: 'nc-silverhand', label: 'Revolution Ready' },
  
  // Cross-reality connections
  { id: 'edge-nc-file-to-source', source: 'nc-file', target: 'matrix-the-source', label: 'Corporate Truth' },
  { id: 'edge-silverhand-to-source', source: 'nc-silverhand', target: 'matrix-the-source', label: 'Never Fade Away' },

  // === WITCHER WORLD CONNECTIONS ===
  // Glitch Portal connects to Witcher Entry
  { id: 'edge-glitch-to-witcher', source: 'matrix-glitch-portal', target: 'witcher-entry', label: 'Breach Witcher Realm' },
  
  // Witcher internal flow
  { id: 'edge-witcher-entry-to-mutation', source: 'witcher-entry', target: 'witcher-mutation-choice' },
  { id: 'edge-witcher-mutation-to-signs', source: 'witcher-mutation-choice', target: 'witcher-sign-training', label: 'Trial Survived' },
  
  // Cross-reality connections (Witcher magic connects to Matrix systems)
  { id: 'edge-witcher-signs-to-source', source: 'witcher-sign-training', target: 'matrix-the-source', label: 'Ancient Magic' }
];