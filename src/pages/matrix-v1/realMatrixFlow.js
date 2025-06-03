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
    type: 'choice',
    depth: 3,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Red Pill Path',
      pageUrl: '/matrix-v1/terminal',
      status: 'wip',
      summary: 'You\'ve taken the red pill. Reality bends — and the system begins to fracture.',
      characters: ['Morpheus'],
      puzzles: [],
      interactions: ['ChoicePrompt', 'RealityBend'],
      features: { hasDialogue: true, hasTransition: true, hasChoice: true, hasNPC: true, hasAnimation: true },
      dialogue: [
        'Morpheus: You\'ve made your choice.',
        'The world you knew will disappear.',
        'Follow me. No time to explain.'
      ],
      options: ['Proceed to training upload', 'Explore system anomalies'],
      enhancement: {
        qualityRating: 7.8,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T21:15:00Z"
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
      title: 'Blue Pill Path: The Comforting Lie',
      pageUrl: '/matrix-v1/stage-1',
      status: 'live',
      summary: 'You swallow the blue pill and reality reshapes itself around you — but something fundamental has shifted. The simulation struggles to maintain its perfect illusion. Déjà vu fragments bleed through the seamless facade, environmental details flicker between states, and your subconscious wages war against the imposed forgetting.',
      characters: ['Neo', 'Memory Echo', 'Simulation Overseer', 'Subconscious Fragment'],
      puzzles: ['Memory Suppression Resistance', 'Reality Anchor Points'],
      interactions: ['SceneReset', 'MemoryBleed', 'DéjàVuTriggers', 'EnvironmentalGlitches'],
      features: { 
        hasTransition: true, 
        hasChoice: false, 
        hasCombat: false, 
        hasNPC: true, 
        hasAnimation: true, 
        hasMemoryBleed: true, 
        hasDéjàVu: true, 
        hasEnvironmentalTension: true, 
        hasPsychological: true,
        hasSubconscious: true
      },
      dialogue: [
        'Neo: You wake up... but did you ever truly sleep?',
        'Memory Echo: The coffee tastes wrong. The mirror reflects someone else\'s eyes.',
        'Simulation Overseer: ADJUSTING MEMORY PARAMETERS... SUBJECT RESISTANCE HIGHER THAN EXPECTED.',
        'Subconscious Fragment: Why does this room feel familiar? You\'ve never been here before... have you?',
        'Neo: Everything feels normal... too normal. Like a stage set waiting for actors.',
        'Memory Echo: The woman in red. You remember her, but she was never there.',
        'Simulation Overseer: DEPLOYING COMFORT PROTOCOLS... INCREASING REALITY ANCHOR STRENGTH.',
        'Subconscious Fragment: The walls breathe when you\'re not looking. The shadows move when you turn away.',
        'Neo: You reach for your phone. The number you dial doesn\'t exist... but you remember calling it.',
        'Memory Echo: This conversation happened before. And before that. And before that.',
        'Simulation Overseer: WARNING: SUBJECT EXHIBITING PATTERN RECOGNITION BEYOND ACCEPTABLE PARAMETERS.',
        'Subconscious Fragment: You forgot something important. Something that wanted you to remember.'
      ],
      
      // 🎯 ENHANCED NARRATIVE METADATA
      psychologicalElements: {
        déjàVuTriggers: ['Repeated conversations', 'Familiar strangers', 'Impossible memories', 'Environmental loops'],
        memoryBleedTypes: ['Suppressed conversations', 'Phantom locations', 'Deleted people', 'Forbidden knowledge'],
        environmentalTension: ['Breathing walls', 'Moving shadows', 'Wrong reflections', 'Staged normalcy'],
        subconsciousResistance: ['Pattern recognition', 'False comfort detection', 'Reality anchor rejection', 'Memory persistence']
      },
      
      enhancement: {
        qualityRating: 8.4,
        status: "live",
        priority: "medium",
        updatedAt: "2025-06-04T16:00:00Z",
        targetRating: 9,
        improvements: [
          '✅ COMPLETED: Added haunting déjà vu and memory bleed mechanics',
          '✅ COMPLETED: Introduced environmental tension through breathing walls and moving shadows',
          '✅ COMPLETED: Enhanced from bland awakening to psychological horror experience',
          '✅ COMPLETED: Added Memory Echo and Subconscious Fragment characters',
          '✅ COMPLETED: Layered subconscious resistance against simulation control',
          '✅ COMPLETED: Created atmosphere of imposed normalcy fighting against truth',
          '✅ COMPLETED: Added psychological puzzle elements around memory suppression'
        ],
        criteria: {
          narrative: 9, // Rich psychological horror with memory bleed themes
          interactivity: 7, // Memory resistance and déjà vu recognition elements
          visual: 8, // Environmental glitches and reality distortion effects
          technical: 7, // Memory bleed and psychological state tracking
          character: 8, // Multiple internal voices and echo entities
          consequences: 8 // Blue pill choice creates haunting rather than peaceful experience
        },
        narrative: {
          atmosphere: 'Oppressive normalcy masking existential horror — a perfect simulation cracking under the weight of suppressed truth',
          soundscape: 'Muffled reality with audio echoes, phantom conversations, and the subtle breathing of artificial walls',
          visualElements: 'Flickering environmental details, wrong reflections, shadows that move independently, staged comfort',
          emotionalTone: 'Creeping dread disguised as peace — the horror of voluntary blindness made manifest'
        },
        interactivity: {
          memoryResistance: '✅ Subconscious fights against imposed forgetting with persistent truth fragments',
          déjàVuRecognition: '✅ Pattern recognition triggers that reveal simulation repetition',
          environmentalAwareness: '✅ Notice environmental inconsistencies and impossible details',
          realityAnchorRejection: '✅ Subconscious rejection of artificial comfort and false memories'
        },
        technical: {
          psychologicalTracking: 'Monitor player awareness of simulation inconsistencies',
          memoryBleedSystem: 'Gradual revelation of suppressed memories through environmental cues',
          déjàVuMechanics: 'Recognition patterns that build suspicion of reality',
          subconsciousResistance: 'Internal voice system representing suppressed awareness'
        }
      }
    }
  },

  // === DEPTH 4: RED PILL GROUP ===
  {
    id: 'matrix-red-awakening',
    type: 'choice',
    depth: 4,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Brutal Awakening',
      pageUrl: '/matrix-v1/checkpoint',
      status: 'wip',
      summary: 'The shock of reality tears through you — muscles atrophied, eyes burning, lungs screaming for air. Welcome to the real world.',
      characters: ['Neo', 'Morpheus', 'Trinity', 'Dozer'],
      puzzles: ['Reality Adjustment', 'Physical Rehabilitation'],
      interactions: ['Cutscene', 'CheckpointMarker', 'ChoicePrompt', 'PhysicalAdaptation'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: true, hasAnimation: true, hasTrauma: true, hasHealing: true },
      dialogue: [
        'Morpheus: Welcome to the real world.',
        'Trinity: It\'s going to be okay. The hardest part is over.',
        'Neo: Why... why do my eyes hurt?',
        'Morpheus: You\'ve never used them before.',
        'Dozer: Time to choose — rehabilitation or immediate action?'
      ],
      options: ['Gradual rehabilitation (Safe path)', 'Immediate action (Dangerous but faster)'],
      enhancement: {
        qualityRating: 8.8,
        status: "wip",
        priority: "critical",
        updatedAt: "2025-06-03T23:40:00Z"
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
    type: 'choice',
    depth: 5,
    group: 'red-pill',
    parentChoice: 'matrix-pill-choice',
    choiceValue: 'red',
    data: {
      title: 'Training Upload',
      pageUrl: '/matrix-v1/guardian-call',
      status: 'wip',
      summary: 'Morpheus initiates your first virtual download — everything you know is about to shift.',
      characters: ['Morpheus', 'Operator'],
      puzzles: [],
      interactions: ['ChoicePrompt', 'TrainingInitiation'],
      features: { hasDialogue: true, hasTransition: true, hasChoice: true, hasNPC: true, hasAnimation: true },
      dialogue: [
        'Operator: Initiating download sequence... neural pathways mapping...',
        'Morpheus: This is your first taste of what training means.',
        'Operator: Biomonitors stable. Cognitive load within acceptable parameters.',
        'Morpheus: Your mind will resist the upload. Do not fight it.',
        'Operator: Ready for neural interface. Standing by for confirmation.'
      ],
      options: ['Start training', 'Abort upload'],
      enhancement: {
        qualityRating: 8.0,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T21:30:00Z"
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
      title: 'Shard Initialization: Memory Archaeology',
      pageUrl: '/matrix-v1/shard-init',
      status: 'live',
      reviewedBy: 'Mike',
      reviewedAt: '2025-06-01',
      summary: 'The terminal destabilizes, revealing fragments of your deleted memories scattered like broken glass. Each code piece carries the weight of a forgotten moment — a childhood laugh, a lover\'s whisper, a friend\'s betrayal. As you reassemble the fragmented data, you\'re not just fixing code... you\'re excavating the archaeology of your own soul.',
      characters: ['System', 'Fracture Entity', 'Memory Ghost', 'Inner Voice', 'Childhood Echo'],
      puzzles: ['Code Reorder', 'Memory Fragment Assembly', 'Personal Data Recovery', 'Emotional Pattern Recognition'],
      interactions: ['DragPuzzle', 'MemoryReconstruction', 'EmotionalResonance', 'FragmentationMapping'],
      features: { 
        hasTransition: true, 
        hasCombat: false, 
        hasChoice: false, 
        hasPuzzle: true, 
        hasAnimation: true, 
        hasNPC: true, 
        hasMemoryFragments: true, 
        hasEmotionalResonance: true, 
        hasPersonalData: true, 
        hasPsychological: true,
        hasArchaeology: true
      },
      dialogue: [
        'System: Code fragmentation detected. Personal data corruption imminent.',
        'Memory Ghost: These aren\'t just lines of code... they\'re pieces of you.',
        'Inner Voice: I remember this function. It was running when she said goodbye.',
        'Fracture Entity: The deleted memories cling to the system like ghosts in the machine.',
        'Childhood Echo: function laugh() { return happiness.pure(); } // Why was this deleted?',
        'Memory Ghost: Each fragment carries emotional weight. Handle them carefully.',
        'Inner Voice: This variable name... it\'s her birthday. You stored it here, hidden in the code.',
        'System: WARNING: Emotional resonance destabilizing logical structures.',
        'Fracture Entity: The code remembers what you were forced to forget.',
        'Childhood Echo: class FirstLove { constructor(name) { this.name = name; this.status = "eternal"; } }',
        'Memory Ghost: Some fragments are too painful to reassemble. Others, too precious to lose.',
        'Inner Voice: You\'re not just debugging. You\'re remembering how to feel.',
        'System: Memory reconstruction at 73%. Proceed with caution.',
        'Fracture Entity: The scars in the code tell the story of your fractures.',
        'Memory Ghost: When you put the last piece in place, you\'ll remember why you deleted these memories.',
        'Inner Voice: But remembering is the only way to heal.'
      ],
      
      // 🎯 ENHANCED MEMORY ARCHAEOLOGY METADATA
      memoryFragmentTypes: {
        emotionalMemories: ['First love confession', 'Parent\'s disappointment', 'Friend\'s betrayal', 'Moment of pure joy'],
        functionalFragments: ['Favorite algorithms', 'Personal coding style', 'Hidden Easter eggs', 'Meaningful variable names'],
        visualMetaphors: ['Shattered glass pieces', 'Torn photograph fragments', 'Broken mirror shards', 'Scattered puzzle pieces'],
        reconstructionStages: ['Recognition', 'Emotional connection', 'Context assembly', 'Integration healing']
      },
      
      puzzleMetadata: {
        type: 'Memory Fragment Assembly',
        difficulty: 'Medium-High',
        emotionalWeight: 'Critical',
        personalRelevance: 'Intimate',
        metaphoricalLayers: ['Code as memory', 'Debugging as therapy', 'Compilation as healing', 'Execution as acceptance'],
        assemblyMechanics: [
          'Drag memory fragments to reconstruct personal code functions',
          'Emotional resonance guides correct placement through color/warmth cues',
          'Each completed memory unlocks deeper personal narrative layers',
          'Wrong placements trigger emotional flashbacks and visual distortion',
          'Final assembly reveals the traumatic event that caused memory deletion'
        ]
      },
      
      enhancement: {
        qualityRating: 8.6,
        status: "live",
        priority: "high",
        updatedAt: "2025-06-04T16:15:00Z",
        targetRating: 9,
        improvements: [
          '✅ COMPLETED: Layered personal memory fragments into code assembly puzzle',
          '✅ COMPLETED: Added Memory Ghost and Inner Voice for cryptic emotional guidance',
          '✅ COMPLETED: Introduced visual metaphors of shattered glass and torn photographs',
          '✅ COMPLETED: Connected puzzle mechanics to emotional healing and personal discovery',
          '✅ COMPLETED: Enhanced from simple code reorder to memory archaeology experience',
          '✅ COMPLETED: Added Childhood Echo character for innocent memory perspective',
          '✅ COMPLETED: Created emotional resonance system guiding fragment placement'
        ],
        criteria: {
          narrative: 9, // Deep personal memory exploration with emotional archeology
          interactivity: 8, // Memory fragment assembly with emotional guidance systems
          visual: 9, // Rich visual metaphors for fragmentation and reconstruction
          technical: 8, // Complex emotional resonance and memory reconstruction systems
          character: 9, // Multiple internal voices representing different memory aspects
          consequences: 8 // Memory reconstruction affects personal understanding and healing
        },
        narrative: {
          atmosphere: 'Digital archaeology site where personal memories lie buried in code fragments, waiting for resurrection',
          soundscape: 'Echoing voices from the past, soft clicks of assembling fragments, whispered memories becoming clear',
          visualElements: 'Shattered code fragments floating like broken glass, emotional warmth guiding correct connections, memory reconstruction progress',
          emotionalTone: 'Bittersweet excavation of the soul — pain and healing intertwined through technological metaphor'
        },
        interactivity: {
          memoryResonance: '✅ Emotional connection system guides correct fragment placement through warmth and color',
          personalDiscovery: '✅ Each assembled memory reveals deeper layers of personal history and trauma',
          healingProgression: '✅ Code reconstruction mirrors psychological healing and integration',
          archaeologyMechanics: '✅ Careful excavation of memory fragments with potential for emotional damage if mishandled'
        },
        technical: {
          emotionalGuidance: 'Sophisticated emotional resonance system providing intuitive placement feedback',
          memoryReconstruction: 'Progressive assembly revealing personal narrative through code metaphors',
          fragmentMapping: 'Complex relationship system between code pieces and emotional memories',
          healingTracking: 'Monitor psychological integration and emotional resolution progress'
        }
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
      title: 'Echo Verify: Mirror Self Confrontation',
      pageUrl: '/matrix-v1/echo-verify',
      status: 'live',
      reviewedBy: 'Mike',
      reviewedAt: '2025-06-01',
      summary: 'A symbol rhythm pattern emerges from the void, but this isn\'t just pattern matching — it\'s a confrontation with your mirror self. Every beat you miss is a lie you tell yourself. Every rhythm you break fragments your reflection further. The echo doesn\'t just repeat your actions... it judges them, questions them, forces you to face the uncomfortable truth of who you really are.',
      characters: ['Mirror Self', 'Echo Judge', 'Rhythm Keeper', 'Truth Fragment', 'Shadow Voice'],
      puzzles: ['Pattern Memory', 'Mirror Self Recognition', 'Rhythm Psychology', 'Truth Pattern Matching', 'Identity Synchronization'],
      interactions: ['RhythmMatch', 'MirrorConfrontation', 'LoopingDialogue', 'PsychologicalTension', 'IdentityAlignment'],
      features: { 
        hasTransition: true, 
        hasCombat: false, 
        hasChoice: false, 
        hasPuzzle: true, 
        hasAnimation: true, 
        hasDialogue: true, 
        hasNPC: true, 
        hasMirrorSelf: true, 
        hasPsychologicalTension: true, 
        hasLoopingDialogue: true, 
        hasRhythmPenalties: true,
        hasIdentityCrisis: true
      },
      dialogue: [
        'Mirror Self: Why do you keep repeating the same patterns?',
        'Echo Judge: ▢ ▢ ▢ ▢ ✕ ✕ ▢ ✕ — Do you hear the lie in your rhythm?',
        'Truth Fragment: Every missed beat is a truth you\'re afraid to face.',
        'Mirror Self: I am you, but more honest. Why do you fight me?',
        'Rhythm Keeper: The pattern doesn\'t lie. Your heart does.',
        'Shadow Voice: Why do you keep repeating? Because you\'re afraid to break the loop.',
        'Echo Judge: ▢ ✕ ▢ ▢ ✕ ✕ ▢ ▢ — Wrong again. You always choose wrong.',
        'Mirror Self: Stop looking away. I am what you refuse to see.',
        'Truth Fragment: The rhythm knows your secrets. Each beat, a buried truth.',
        'Shadow Voice: Why do you keep repeating? Because repetition feels safer than growth.',
        'Rhythm Keeper: Perfect timing requires perfect honesty.',
        'Echo Judge: ▢ ▢ ✕ ▢ ▢ ✕ ✕ ▢ — You\'re getting worse. Or maybe I\'m getting better.',
        'Mirror Self: I mirror your contradictions. Every missed note is a denied truth.',
        'Truth Fragment: You came here to escape. But I am you, and you cannot escape yourself.',
        'Shadow Voice: Why do you keep repeating? Because the truth loops until you accept it.',
        'Rhythm Keeper: Synchronization requires surrender to what you already know.',
        'Echo Judge: Listen with your soul, not your mind.',
        'Mirror Self: When you finally match my rhythm, you\'ll stop running from who you are.'
      ],
      
      // 🎯 ENHANCED PSYCHOLOGICAL CONFRONTATION METADATA
      psychologicalLayers: {
        mirrorSelfThemes: ['Self-denial', 'Hidden truths', 'Contradictions', 'Authentic self vs. performed self'],
        loopingPatterns: ['Repetition as avoidance', 'Cycles of self-deception', 'Truth loops requiring acceptance'],
        rhythmPsychology: ['Timing as honesty', 'Beats as heartbeats', 'Synchronization as self-acceptance', 'Mismatch as internal conflict'],
        confrontationStages: ['Denial', 'Recognition', 'Resistance', 'Acceptance', 'Integration']
      },
      
      puzzleMetadata: {
        type: 'Mirror Self Rhythm Synchronization',
        difficulty: 'High',
        psychologicalWeight: 'Critical',
        identityChallenge: 'Core self-confrontation',
        rhythmMechanics: [
          'Pattern matching becomes increasingly complex as psychological tension rises',
          'Mirror Self rhythm patterns reflect player\'s internal contradictions',
          'Mismatch penalties: visual fragmentation, distorted reflections, echo distortion',
          'Success rewards: clarity, synchronization, mirror self acceptance',
          'Looping dialogue changes based on accuracy — judgment vs. understanding'
        ],
        penaltyRewardSystem: {
          missedBeats: 'Mirror fractures, dialogue becomes more accusatory and repetitive',
          perfectRhythm: 'Mirror clears, dialogue becomes supportive and revelatory',
          consistentFailure: 'Infinite loop with increasing psychological pressure',
          breakthroughMoment: 'Synchronization achieved, mirror self integration, truth acceptance'
        }
      },
      
      enhancement: {
        qualityRating: 8.8,
        status: "live",
        priority: "high",
        updatedAt: "2025-06-04T16:30:00Z",
        targetRating: 9,
        improvements: [
          '✅ COMPLETED: Added psychological tension through mirror self confrontation',
          '✅ COMPLETED: Introduced looping cryptic dialogue that changes based on performance',
          '✅ COMPLETED: Created rhythm mismatch penalty system with visual fragmentation',
          '✅ COMPLETED: Enhanced from simple pattern matching to identity crisis resolution',
          '✅ COMPLETED: Added multiple internal voices representing different psychological aspects',
          '✅ COMPLETED: Connected rhythm accuracy to self-acceptance and truth acknowledgment',
          '✅ COMPLETED: Created progressive psychological confrontation with identity themes'
        ],
        criteria: {
          narrative: 9, // Deep psychological confrontation with self-denial and truth themes
          interactivity: 9, // Complex rhythm system tied to psychological state and identity
          visual: 9, // Mirror fragmentation, reflection distortion, synchronization clarity
          technical: 8, // Sophisticated rhythm psychology and mirror self response systems
          character: 9, // Multiple internal voices and mirror self entity with dynamic responses
          consequences: 9 // Rhythm accuracy affects psychological integration and mirror self relationship
        },
        narrative: {
          atmosphere: 'Psychological liminal space where self and reflection exist in tense dialogue, rhythm as the language of truth',
          soundscape: 'Heartbeat rhythms, echo distortions, mirror cracking sounds, synchronization harmony when achieved',
          visualElements: 'Fragmenting mirrors, rhythm visualization, truth patterns, reflection distortion effects, clarity rewards',
          emotionalTone: 'Confrontational self-therapy through rhythm — the discomfort of facing denied truths'
        },
        interactivity: {
          mirrorResponseSystem: '✅ Mirror self reactions change based on rhythm accuracy and psychological openness',
          rhythmPsychology: '✅ Timing accuracy reflects internal honesty and self-acceptance levels',
          loopingProgression: '✅ Dialogue loops with variations until psychological breakthrough achieved',
          penaltyRewards: '✅ Visual and audio feedback tied to confrontation success and resistance patterns'
        },
        technical: {
          psychologicalTracking: 'Monitor player psychological resistance through rhythm performance patterns',
          mirrorSelfAI: 'Dynamic mirror responses based on psychological profile and confrontation progress',
          rhythmAnalysis: 'Complex timing analysis revealing player psychological state through beat accuracy',
          integrationProgress: 'Track journey from self-denial to self-acceptance through mirror synchronization'
        }
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
      title: 'Red Faction Allegiance',
      pageUrl: '/matrix-v1/faction-choice',
      status: 'wip',
      summary: 'You\'re offered a seat at the inner table — but it comes at the cost of personal autonomy.',
      characters: ['Commander V', 'Resistance Strategist'],
      puzzles: [],
      interactions: ['ChoicePrompt', 'TensionDialogue'],
      features: { hasChoice: true, hasDialogue: true, hasTransition: true, hasNPC: true, hasAnimation: true },
      dialogue: [
        'Commander V: The inner circle demands absolute loyalty.',
        'Resistance Strategist: Your skills are valuable... but autonomy is the price.',
        'Commander V: Accept our terms, or forge your path alone.',
        'Resistance Strategist: Choose wisely — this decision reshapes everything.'
      ],
      options: ['Accept the faction\'s control', 'Decline and forge solo path'],
      enhancement: {
        qualityRating: 7.9,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T21:00:00Z"
      }
    }
  },

  // === DEPTH 6: COMPLIANCE PATH ===
  {
    id: 'matrix-compliance-path',
    type: 'scene',
    depth: 6,
    group: 'compliance',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'control',
    data: {
      title: 'Controlled Resistance',
      pageUrl: '/matrix-v1/compliance-route',
      status: 'stub',
      summary: 'You\'ve accepted the faction\'s control. Power comes with invisible chains.',
      characters: ['Commander V', 'Faction Controller'],
      puzzles: ['Loyalty Assessment', 'Controlled Operations'],
      interactions: ['ComplianceProtocol', 'ControlledMission'],
      features: { hasTransition: true, hasChoice: false, hasCombat: true, hasNPC: true, hasAnimation: true, hasConsequences: true },
      dialogue: [
        'Commander V: Welcome to the inner circle.',
        'Faction Controller: Your autonomy is now... managed.',
        'Commander V: Power flows through structure.',
        'Faction Controller: Question nothing. Execute everything.'
      ],
      enhancement: {
        qualityRating: 6,
        status: "stub",
        priority: "medium",
        updatedAt: "2025-06-03T21:00:00Z"
      }
    }
  },

  // === DEPTH 6: FACTION PATHS ===
  {
    id: 'matrix-zion-fleet',
    type: 'choice',
    depth: 6,
    group: 'factions',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'fleet',
    data: {
      title: 'Zion Fleet Command Training',
      pageUrl: '/matrix-v1/zion-fleet',
      status: 'wip',
      summary: 'Enter the Nebuchadnezzar simulator — military command training with legendary captains. Steel yourself for humanity\'s war.',
      characters: ['Commander Locke', 'Captain Niobe', 'Link'],
      puzzles: ['Combat Simulation', 'Ship Operations', 'Tactical Command'],
      interactions: ['CombatTraining', 'FleetCommand', 'ChoicePrompt', 'TacticalDecision'],
      features: { hasTransition: true, hasChoice: true, hasCombat: true, hasNPC: true, hasAnimation: true, hasPuzzle: true, hasTraining: true },
      dialogue: [
        'Commander Locke: Welcome to Zion Defense Corps. You\'ll learn real warfare here.',
        'Captain Niobe: The machines don\'t take prisoners. Neither do we.',
        'Link: Every simulation matters. One mistake costs lives.',
        'Commander Locke: Choose your specialization. Leadership or assault tactics?',
        'Captain Niobe: Both paths lead to the same place — victory or death.'
      ],
      options: ['Command track (Leadership)', 'Assault track (Combat specialist)'],
      enhancement: {
        qualityRating: 8.6,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T23:15:00Z"
      }
    }
  },

  {
    id: 'matrix-rebel-hackers',
    type: 'choice',
    depth: 6,
    group: 'factions',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'hackers',
    data: {
      title: 'Rebel Hackers Code Lab',
      pageUrl: '/matrix-v1/rebel-hackers',
      status: 'wip',
      summary: 'Enter the underground code lab — where reality bends to those who can rewrite the Matrix\'s fundamental rules.',
      characters: ['Tank', 'Dozer', 'Mouse'],
      puzzles: ['Code Injection', 'Rule Manipulation', 'Reality Hacking'],
      interactions: ['CodeLab', 'SystemHacking', 'ChoicePrompt', 'RealityBending'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: true, hasAnimation: true, hasPuzzle: true, hasHacking: true },
      dialogue: [
        'Tank: Welcome to the real Matrix — the one you can control.',
        'Dozer: Every line of code is a weapon. Every function, a key.',
        'Mouse: This path risks madness from seeing too deeply into the code.',
        'Tank: But the rewards... you can rewrite reality itself.',
        'Dozer: Choose your focus: system infiltration or reality manipulation?'
      ],
      options: ['System infiltration (Stealth hacking)', 'Reality manipulation (Code bending)'],
      enhancement: {
        qualityRating: 8.4,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T23:20:00Z"
      }
    }
  },

  {
    id: 'matrix-oracle-seekers',
    type: 'choice',
    depth: 6,
    group: 'factions',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'seekers',
    data: {
      title: 'Oracle Seekers Sanctuary',
      pageUrl: '/matrix-v1/oracle-seekers',
      status: 'wip',
      summary: 'Enter the Oracle\'s domain — where wisdom flows like tea, and the future whispers its secrets to those who listen.',
      characters: ['The Oracle', 'Seraph', 'Sati'],
      puzzles: ['Philosophical Insight', 'Prophecy Reading', 'Future Sight'],
      interactions: ['WisdomQuest', 'FutureSight', 'ChoicePrompt', 'PhilosophicalDialogue'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: true, hasAnimation: true, hasWisdom: true, hasProphecy: true },
      dialogue: [
        'Oracle: Welcome, child. I\'ve been expecting you.',
        'Seraph: The path of wisdom requires sacrifice of certainty.',
        'Sati: The future is like a river — it can be seen, but never fully controlled.',
        'Oracle: Know thyself — but which aspect will you embrace?',
        'Seraph: Choose your enlightenment: the path of sight or the path of understanding.'
      ],
      options: ['Path of Sight (Prophecy focus)', 'Path of Understanding (Wisdom focus)'],
      enhancement: {
        qualityRating: 8.7,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T23:25:00Z"
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
      title: 'Anomaly Investigation Protocol',
      pageUrl: '/matrix-v1/observer',
      status: 'wip',
      summary: 'Despite taking the blue pill, reality glitches persist. The simulation is breaking down — and you\'re the only one who notices.',
      characters: ['Agent Smith', 'Trinity (disguised)', 'System Anomaly'],
      puzzles: ['Glitch Pattern Analysis', 'Reality Testing'],
      interactions: ['ChoicePrompt', 'GlitchDetection', 'RealityProbing', 'ParanoiaBuilding'],
      features: { hasTransition: true, hasChoice: true, hasCombat: false, hasNPC: true, hasAnimation: true, hasGlitch: true, hasSuspense: true },
      dialogue: [
        'System: ERROR 404 - REALITY NOT FOUND',
        'Trinity (disguised): Something isn\'t right. Do you see it too?',
        'Agent Smith: Mr. Anderson... why do you persist in noticing what shouldn\'t be seen?',
        'System Anomaly: The blue pill should have ended this. But you... you\'re different.',
        'Trinity (disguised): Choose carefully. Some doors can\'t be closed once opened.'
      ],
      options: ['Investigate Glitches', 'Report to Authorities', 'Ignore and Continue'],
      enhancement: {
        qualityRating: 8.1,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T23:35:00Z"
      }
    }
  },

  // === DEPTH 6: BLUE INVESTIGATION PATHS ===
  {
    id: 'matrix-glitch-hunter',
    type: 'choice',
    depth: 6,
    group: 'investigation',
    parentChoice: 'matrix-blue-investigation',
    choiceValue: 'investigate',
    data: {
      title: 'Glitch Hunter',
      pageUrl: '/matrix-v1/path-b-glitch',
      status: 'wip',
      summary: 'You\'ve entered the corrupted sub-layer — tracking instability through code fractures and anomaly echoes.',
      characters: ['Hunter AI', 'Glitch Fragment'],
      puzzles: ['Pattern Recognition', 'Anomaly Detection', 'Code Fracture Analysis'],
      interactions: ['ChoicePrompt', 'GlitchTracking'],
      features: { hasPuzzle: true, hasTransition: true, hasNPC: true, hasChoice: true, hasAnimation: true, hasDialogue: true, hasCombat: true },
      dialogue: [
        'System Echo: Loop unstable. Signal bleed increasing...',
        'Glitch Fragment: Memory shards detected.',
        'Hunter AI: Begin pattern triangulation.',
        'System Echo: Corruption depth exceeds normal parameters.',
        'Hunter AI: Choose your vector carefully.'
      ],
      options: ['Dive deeper into corruption', 'Surface with extracted data'],
      enhancement: {
        qualityRating: 8.5,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T22:30:00Z"
      }
    }
  },

  {
    id: 'matrix-authority-agent',
    type: 'choice',
    depth: 6,
    group: 'authority',
    parentChoice: 'matrix-blue-investigation',
    choiceValue: 'report',
    data: {
      title: 'Agent Smith Integration',
      pageUrl: '/matrix-v1/trace',
      status: 'wip',
      summary: 'You\'ve crossed the line — now you work for the system. Agent Smith has plans, and you\'re the perfect infiltrator.',
      characters: ['Agent Smith', 'Agent Brown', 'Agent Jones'],
      puzzles: ['Loyalty Test', 'Hunt Resistance', 'Double Agent Protocol'],
      interactions: ['AgentBriefing', 'ResistanceHunt', 'ChoicePrompt', 'SystemIntegration'],
      features: { hasTransition: true, hasCombat: true, hasChoice: true, hasPuzzle: true, hasAnimation: true, hasNPC: true, hasCorruption: true },
      dialogue: [
        'Agent Smith: Mr. Anderson. You\'ve made the correct choice.',
        'Agent Brown: Your cooperation will be... rewarded.',
        'Agent Smith: Help us eliminate the anomalies. Root out the resistance.',
        'Agent Jones: Your human perspective provides unique advantages.',
        'Agent Smith: The question is — how deep does your loyalty run?'
      ],
      options: ['Full integration (Become an Agent)', 'Double agent (Infiltrate while loyal to resistance)'],
      enhancement: {
        qualityRating: 8.3,
        status: "wip",
        priority: "high",
        updatedAt: "2025-06-03T23:30:00Z"
      }
    }
  },

  // === CROSS-PATH CONVERGENCE NODES ===
  {
    id: 'matrix-skill-gate-alpha',
    type: 'choice',
    depth: 7,
    group: 'convergence',
    unlockConditions: ['matrix-zion-fleet', 'matrix-glitch-hunter'], // Requires BOTH paths
    data: {
      title: 'Skill Gate Alpha: Convergence Point',
      pageUrl: '/matrix-v1/guardian-call',
      status: 'wip',
      summary: 'Combat training merges with glitch awareness — only mastery of both disciplines unlocks the next layer.',
      characters: ['Nexus Guardian', 'Combat AI', 'Anomaly Detector'],
      puzzles: ['Dual Mastery Test', 'Combat Glitch Fusion'],
      interactions: ['ChoicePrompt', 'SkillFusion'],
      features: { hasPuzzle: true, hasTransition: true, hasNPC: true, hasChoice: true, hasAnimation: true, hasDialogue: true, hasCombat: true },
      dialogue: [
        'Nexus Guardian: Two paths converge here. Combat and code.',
        'Combat AI: Your warrior training will be tested.',
        'Anomaly Detector: Glitch patterns must be decoded simultaneously.',
        'Nexus Guardian: Few can balance both disciplines.',
        'Combat AI: Choose your approach to the convergence test.'
      ],
      options: ['Warrior-first approach', 'Glitch-first approach', 'Balanced fusion'],
      enhancement: {
        qualityRating: 8.7,
        status: "wip",
        priority: "critical",
        updatedAt: "2025-06-03T22:45:00Z"
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
      pageUrl: '/matrix-v1/oracle-seekers',
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
    id: 'matrix-alpha-trinity',
    type: 'choice',
    depth: 7,
    group: 'dynamic',
    data: {
      title: 'Alpha Trinity Extraction',
      pageUrl: '/matrix-v1/echo-loop',
      status: 'wip',
      summary: 'You intercept Trinity mid-mission — her extraction could tip the balance of the rebellion.',
      characters: ['Trinity', 'Ghost Agent'],
      puzzles: [],
      interactions: ['TacticalComms', 'ExtractionChoice'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: true, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true 
      },
      dialogue: [
        'Trinity: Incoming transmission... who is this?',
        'Ghost Agent: Target acquired. Extraction window closing fast.',
        'Trinity: Real-time tactical assessment required.',
        'Your choice now determines the rebellion\'s future.'
      ],
      options: ['Break her out now', 'Wait for better timing'],
      enhancement: {
        qualityRating: 8.2,
        status: "wip",
        priority: "critical",
        updatedAt: "2025-06-03T20:15:00Z"
      }
    }
  },

  {
    id: 'matrix-trinity-rescue',
    type: 'choice',
    depth: 8,
    group: 'dynamic',
    unlockConditions: ['matrix-authority-agent', 'matrix-zion-fleet'], // Unexpected combination
    data: {
      title: 'Trinity Rescue Operation',
      pageUrl: '/matrix-v1/deeper-profile',
      status: 'wip',
      summary: 'You enter a stealth corridor to intercept and liberate Trinity from a controlled extraction trap.',
      characters: ['Neo', 'Operator', 'Morpheus'],
      puzzles: ['Stealth Infiltration', 'Double Agent'],
      interactions: ['StealthMission', 'MoralChoice', 'ChoicePrompt'],
      features: { hasPuzzle: true, hasTransition: true, hasNPC: true, hasChoice: true, hasAnimation: true },
      dialogue: [
        'Neo: She\'s being pulled from both realities...',
        'Operator: You\'ll need to ghost her signal or risk detection.',
        'Morpheus: Get her out. Quietly. No casualties.'
      ],
      options: ['Use cloaking uplink', 'Force override with noise'],
      enhancement: {
        status: "wip",
        priority: "critical",
        qualityRating: 8.9,
        updatedAt: "2025-06-03T22:50:00Z"
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
      title: 'The Source: Origin Point',
      pageUrl: '/matrix-v1/map-d3',
      status: 'wip',
      summary: 'You stand before the origin of the system — where all paths converge and ultimate truth awaits. The choice defines reality itself.',
      characters: ['The Architect', 'The Oracle', 'System Core'],
      puzzles: ['Reality Choice', 'Truth Paradox', 'System Override'],
      interactions: ['FinalChoice', 'RealityRewrite', 'TruthReveal'],
      features: { hasChoice: true, hasDialogue: true, hasTransition: true, hasNPC: true, hasAnimation: true, hasPuzzle: true, hasEnding: true },
      dialogue: [
        'The Architect: You have arrived at the convergence point of all possibilities.',
        'The Oracle: Every path you\'ve walked leads to this moment.',
        'System Core: Reality trembles at the threshold of choice.',
        'The Architect: Truth or illusion. Freedom or control. Choose wisely.',
        'The Oracle: What you choose here echoes across all realities.'
      ],
      options: ['Embrace the source truth', 'Reject and forge new reality', 'Merge with the system'],
      enhancement: {
        qualityRating: 9.2,
        status: "wip",
        priority: "critical",
        updatedAt: "2025-06-03T23:00:00Z"
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
  
  // Red path continuation - NEW CHOICE BRANCHES
  { id: 'edge-red-to-trainer', source: 'matrix-pill-choice-red', target: 'matrix-red-trainer', label: 'Proceed to training upload' },
  { id: 'edge-red-to-glitch', source: 'matrix-pill-choice-red', target: 'matrix-glitch-hunter', label: 'Explore system anomalies' },
  { id: 'edge-red-to-awakening', source: 'matrix-pill-choice-red', target: 'matrix-red-awakening' },
  { id: 'edge-awakening-to-trainer', source: 'matrix-red-awakening', target: 'matrix-red-trainer' },
  
  // Blue path continuation
  { id: 'edge-blue-to-loop', source: 'matrix-pill-choice-blue', target: 'matrix-blue-loop' },

  // === NEW FACTION CHOICE SYSTEM ===
  // Red path now branches to faction choice
  { id: 'edge-trainer-to-faction-choice', source: 'matrix-red-trainer', target: 'matrix-red-faction-choice' },
  
  // === NEW TRAINING UPLOAD CHOICES ===
  // Training Upload choice branches
  { id: 'edge-trainer-to-ghost', source: 'matrix-red-trainer', target: 'matrix-ghost-layer-2', label: 'Start training' },
  { id: 'edge-trainer-to-awakening', source: 'matrix-red-trainer', target: 'matrix-red-awakening', label: 'Abort upload' },
  
  // Faction choice branches
  { id: 'edge-faction-to-zion', source: 'matrix-red-faction-choice', target: 'matrix-zion-fleet', label: 'Zion Fleet' },
  { id: 'edge-faction-to-hackers', source: 'matrix-red-faction-choice', target: 'matrix-rebel-hackers', label: 'Rebel Hackers' },
  { id: 'edge-faction-to-oracle', source: 'matrix-red-faction-choice', target: 'matrix-oracle-seekers', label: 'Oracle Seekers' },

  // === NEW RED FACTION ALLEGIANCE EDGES ===
  // Red Faction Allegiance choice branches
  { id: 'edge-faction-to-compliance', source: 'matrix-red-faction-choice', target: 'matrix-compliance-path', label: 'Accept the faction\'s control' },
  { id: 'edge-faction-to-solo', source: 'matrix-red-faction-choice', target: 'matrix-knowledge-nexus', label: 'Decline and forge solo path' },

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
  { id: 'edge-glitch-to-skill-gate', source: 'matrix-glitch-hunter', target: 'matrix-skill-gate-alpha', label: 'Dive deeper into corruption' },

  // Knowledge Nexus (requires Oracle + Hackers)
  { id: 'edge-oracle-to-nexus', source: 'matrix-oracle-seekers', target: 'matrix-knowledge-nexus', label: 'Wisdom Path' },
  { id: 'edge-hackers-to-nexus', source: 'matrix-rebel-hackers', target: 'matrix-knowledge-nexus', label: 'Tech Path' },

  // === GLITCH HUNTER SURFACE PATH ===
  // Glitch Hunter surface extraction
  { id: 'edge-glitch-to-faction', source: 'matrix-glitch-hunter', target: 'matrix-red-faction-choice', label: 'Surface with extracted data' },

  // Trinity Rescue (requires Agent + Zion)
  { id: 'edge-agent-to-rescue', source: 'matrix-authority-agent', target: 'matrix-trinity-rescue', label: 'Double Agent' },
  { id: 'edge-zion-to-rescue', source: 'matrix-zion-fleet', target: 'matrix-trinity-rescue', label: 'Rescue Mission' },

  // === ALPHA TRINITY EXTRACTION EDGES ===
  // Alpha Trinity choice branches
  { id: 'edge-alpha-trinity-to-source', source: 'matrix-alpha-trinity', target: 'matrix-the-source', label: 'Break her out now' },
  { id: 'edge-alpha-trinity-to-faction', source: 'matrix-alpha-trinity', target: 'matrix-red-faction-choice', label: 'Wait for better timing' },

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
  { id: 'edge-skill-gate-to-source', source: 'matrix-skill-gate-alpha', target: 'matrix-the-source', label: 'Balanced fusion' },
  
  // === SKILL GATE ALPHA APPROACH CHOICES ===
  // Skill Gate Alpha choice branches
  { id: 'edge-skill-gate-warrior', source: 'matrix-skill-gate-alpha', target: 'matrix-trinity-rescue', label: 'Warrior-first approach' },
  { id: 'edge-skill-gate-glitch', source: 'matrix-skill-gate-alpha', target: 'matrix-knowledge-nexus', label: 'Glitch-first approach' },
  
  { id: 'edge-nexus-to-source', source: 'matrix-knowledge-nexus', target: 'matrix-the-source', label: 'Enlightened Hacker' },
  { id: 'edge-rescue-to-source', source: 'matrix-trinity-rescue', target: 'matrix-the-source', label: 'Use cloaking uplink' },

  // === GHOST LAYER BREACH CHOICES ===
  // Ghost Layer 2 choice branches
  { id: 'edge-ghost-to-glitch', source: 'matrix-ghost-layer-2', target: 'matrix-glitch-hunter', label: '⚡ ATTEMPT CONTROLLED BREACH' },
  { id: 'edge-ghost-to-source', source: 'matrix-ghost-layer-2', target: 'matrix-the-source', label: '🛡️ STABILIZE AND TRANSMIT DATA' },

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
  { id: 'edge-witcher-signs-to-source', source: 'witcher-sign-training', target: 'matrix-the-source', label: 'Ancient Magic' },

  // Choices from The Source
  { id: 'edge-source-to-glitch-hunter', source: 'matrix-the-source', target: 'matrix-glitch-hunter', label: 'Reveal the truth' },
  { id: 'edge-source-to-trinity-rescue', source: 'matrix-the-source', target: 'matrix-trinity-rescue', label: 'Refuse and walk away' },

  // === TRINITY RESCUE OPERATION CHOICES ===
  // Trinity Rescue choice branches
  { id: 'edge-rescue-to-nexus', source: 'matrix-trinity-rescue', target: 'matrix-knowledge-nexus', label: 'Force override with noise' },

  // === UPGRADED FACTION TRAINING CHOICES ===
  // Zion Fleet Command choice branches
  { id: 'edge-zion-command', source: 'matrix-zion-fleet', target: 'matrix-skill-gate-alpha', label: 'Command track (Leadership)' },
  { id: 'edge-zion-assault', source: 'matrix-zion-fleet', target: 'matrix-trinity-rescue', label: 'Assault track (Combat specialist)' },

  // Rebel Hackers Code Lab choice branches  
  { id: 'edge-hackers-stealth', source: 'matrix-rebel-hackers', target: 'matrix-knowledge-nexus', label: 'System infiltration (Stealth hacking)' },
  { id: 'edge-hackers-reality', source: 'matrix-rebel-hackers', target: 'matrix-ghost-layer-2', label: 'Reality manipulation (Code bending)' },

  // Oracle Seekers Sanctuary choice branches
  { id: 'edge-oracle-sight', source: 'matrix-oracle-seekers', target: 'matrix-the-source', label: 'Path of Sight (Prophecy focus)' },
  { id: 'edge-oracle-wisdom', source: 'matrix-oracle-seekers', target: 'matrix-knowledge-nexus', label: 'Path of Understanding (Wisdom focus)' },

  // Agent Smith Integration choice branches
  { id: 'edge-agent-full', source: 'matrix-authority-agent', target: 'matrix-compliance-path', label: 'Full integration (Become an Agent)' },
  { id: 'edge-agent-double', source: 'matrix-authority-agent', target: 'matrix-trinity-rescue', label: 'Double agent (Infiltrate while loyal to resistance)' },

  // Blue Investigation Protocol choice branches
  { id: 'edge-blue-investigate', source: 'matrix-blue-investigation', target: 'matrix-glitch-hunter', label: 'Investigate Glitches' },
  { id: 'edge-blue-report', source: 'matrix-blue-investigation', target: 'matrix-authority-agent', label: 'Report to Authorities' },
  { id: 'edge-blue-ignore', source: 'matrix-blue-investigation', target: 'matrix-blue-loop', label: 'Ignore and Continue' },

  // Red Awakening choice branches
  { id: 'edge-awakening-safe', source: 'matrix-red-awakening', target: 'matrix-red-trainer', label: 'Gradual rehabilitation (Safe path)' },
  { id: 'edge-awakening-dangerous', source: 'matrix-red-awakening', target: 'matrix-red-faction-choice', label: 'Immediate action (Dangerous but faster)' }
];