export const realMatrixNodes = [
  // === DEPTH 0: INTRO GROUP ===
  {
    id: 'matrix-v1-entry',
    type: 'scene',
    depth: 0,
    group: 'intro',
    world: 'matrix', // Explicit world assignment
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
    world: 'matrix', // Explicit world assignment
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
    world: 'matrix', // Explicit world assignment
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
    world: 'matrix', // Explicit world assignment
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
    type: 'choice', // CHANGED: From scene to choice to support crosslinks
    depth: 3,
    group: 'blue-pill',
    world: 'matrix', // Explicit world assignment
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
        hasChoice: true, // CHANGED: Now supports choices
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
        'Subconscious Fragment: You forgot something important. Something that wanted you to remember.',
        // NEW: Crosslink dialogue for hidden resistance branch
        'Memory Echo: There\'s a crack in the wall behind the mirror. You can feel it calling.',
        'Subconscious Fragment: The comfort is a cage. You could... deviate from protocol.'
      ],
      
      // ENHANCED: Added crosslink choices for lateral narrative flow
      options: [
        'Accept the comfortable illusion',
        'Follow the strange memory fragment', // NEW: Hidden resistance branch crosslink
        'Continue normal routine'
      ],
      
      // 🎯 ENHANCED NARRATIVE METADATA
      psychologicalElements: {
        déjàVuTriggers: ['Repeated conversations', 'Familiar strangers', 'Impossible memories', 'Environmental loops'],
        memoryBleedTypes: ['Suppressed conversations', 'Phantom locations', 'Deleted people', 'Forbidden knowledge'],
        environmentalTension: ['Breathing walls', 'Moving shadows', 'Wrong reflections', 'Staged normalcy'],
        subconsciousResistance: ['Pattern recognition', 'False comfort detection', 'Reality anchor rejection', 'Memory persistence']
      },
      
      enhancement: {
        qualityRating: 8.6, // ENHANCED: Increased due to lateral connectivity improvements
        status: "live",
        priority: "medium",
        updatedAt: "2025-06-04T17:30:00Z",
        targetRating: 9,
        improvements: [
          '✅ COMPLETED: Added haunting déjà vu and memory bleed mechanics',
          '✅ COMPLETED: Introduced environmental tension through breathing walls and moving shadows',
          '✅ COMPLETED: Enhanced from bland awakening to psychological horror experience',
          '✅ COMPLETED: Added Memory Echo and Subconscious Fragment characters',
          '✅ COMPLETED: Layered subconscious resistance against simulation control',
          '✅ COMPLETED: Created atmosphere of imposed normalcy fighting against truth',
          '✅ COMPLETED: Added psychological puzzle elements around memory suppression',
          '✅ NEW: Added lateral crosslink choices for nonlinear narrative flow',
          '✅ NEW: Hidden resistance branch accessible through subconscious memory fragments'
        ],
        criteria: {
          narrative: 9, // Rich psychological horror with memory bleed themes + crosslinks
          interactivity: 8, // Memory resistance and choice branches for lateral connectivity  
          visual: 8, // Environmental glitches and reality distortion effects
          technical: 7, // Memory bleed and psychological state tracking
          character: 8, // Multiple internal voices and echo entities
          consequences: 9 // Blue pill choice creates haunting experience + opens hidden paths
        },
        narrative: {
          atmosphere: 'Oppressive normalcy masking existential horror — a perfect simulation cracking under the weight of suppressed truth',
          soundscape: 'Muffled reality with audio echoes, phantom conversations, and the subtle breathing of artificial walls',
          visualElements: 'Flickering environmental details, wrong reflections, shadows that move independently, staged comfort',
          emotionalTone: 'Creeping dread disguised as peace — the horror of voluntary blindness made manifest with hidden escape routes'
        },
        interactivity: {
          memoryResistance: '✅ Subconscious fights against imposed forgetting with persistent truth fragments',
          déjàVuRecognition: '✅ Pattern recognition triggers that reveal simulation repetition',
          environmentalAwareness: '✅ Notice environmental inconsistencies and impossible details',
          realityAnchorRejection: '✅ Subconscious rejection of artificial comfort and false memories',
          crosslinkChoices: '✅ NEW: Hidden narrative branches accessible through memory fragment resistance'
        },
        technical: {
          memoryBleedTracking: 'Monitor subject resistance to forgetting and track pattern recognition events',
          environmentalGlitching: 'Subtle reality distortion system creating uncanny valley effects',
          déjàVuTriggerSystem: 'Repetition detection and response system for psychological tension',
          subconsciousResistance: 'Internal conflict simulation between comfort and truth-seeking',
          crosslinkDetection: 'NEW: Memory fragment resonance system detecting resistance pathway accessibility'
        }
      }
    }
  },

  // 🛂 NEW CHECKPOINT NODE 1: FACTION ORIENTATION
  {
    id: 'matrix-faction-orientation',
    type: 'choice',
    depth: 4,
    group: 'factions',
    world: 'matrix', // Explicit world assignment
    data: {
      title: 'Faction Orientation: Three Paths Diverge',
      pageUrl: '/matrix-v1/faction-orientation',
      status: 'live',
      summary: 'You are shown three potential resistance factions—each a different ideology. Time slows. You feel their eyes on you.',
      characters: ['Zion Commander', 'Hacker Leader', 'Oracle Seeker', 'Faction Observer'],
      puzzles: ['Ideology Assessment', 'Faction Alignment'],
      interactions: ['FactionIntroduction', 'IdeologyChoice', 'AlignmentTest'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: false, 
        hasNPC: true, 
        hasAnimation: true,
        hasFactionDisplay: true,
        hasIdeologyTest: true
      },
      dialogue: [
        'Faction Observer: The resistance has three faces. Choose wisely.',
        'Zion Commander: We are the shield. Order through strength, victory through unity.',
        'Hacker Leader: Code is reality. Bend the rules, break the system, forge freedom.',
        'Oracle Seeker: Truth flows like a river. Some seek its source, others its destination.',
        'Faction Observer: Each path leads to the same war, but through different battles.',
        'Zion Commander: Will you stand with the fleet?',
        'Hacker Leader: Will you hack reality itself?',
        'Oracle Seeker: Will you seek the deeper mysteries?'
      ],
      options: [
        'Join the Zion Fleet', // → matrix-zion-fleet
        'Join the Rebel Hackers', // → matrix-rebel-hackers
        'Join the Oracle Seekers' // → matrix-oracle-seekers
      ],
      
      // Enhanced faction metadata
      factionProfiles: {
        zion: {
          ideology: 'Military Structure & Unity',
          strengths: ['Combat expertise', 'Fleet operations', 'Tactical coordination'],
          philosophy: 'Strength through unity, victory through discipline',
          leaderQuote: 'We are the sword and shield of humanity'
        },
        hackers: {
          ideology: 'Code Manipulation & Freedom',
          strengths: ['Reality bending', 'System infiltration', 'Digital mastery'],
          philosophy: 'Code is reality, reality is malleable',
          leaderQuote: 'Break the rules, rewrite reality'
        },
        oracle: {
          ideology: 'Wisdom & Mystical Understanding',
          strengths: ['Prophecy insight', 'Deep knowledge', 'Spiritual guidance'],
          philosophy: 'Truth transcends code, wisdom guides action',
          leaderQuote: 'See beyond the veil, understand the pattern'
        }
      },
      
      enhancement: {
        qualityRating: 9.1,
        status: "live",
        priority: "high",
        updatedAt: "2025-06-04T18:00:00Z",
        targetRating: 10,
        improvements: [
          '✅ COMPLETED: Three distinct faction ideologies with unique NPCs',
          '✅ COMPLETED: Faction assessment and alignment testing mechanics',
          '✅ COMPLETED: Visual faction representatives with ideology displays',
          '✅ COMPLETED: Time dilation effect during crucial choice moment',
          '✅ COMPLETED: Enhanced dialogue showing faction philosophical differences'
        ],
        criteria: {
          narrative: 9, // Rich faction lore and ideology exploration
          interactivity: 9, // Faction assessment and meaningful choice impact
          visual: 8, // Faction displays and representative animations
          technical: 8, // Ideology assessment and alignment systems
          character: 9, // Three distinct faction leaders with unique voices
          consequences: 10 // Choice fundamentally affects entire resistance narrative path
        },
        narrative: {
          atmosphere: 'Tension-filled briefing room where three ideologies converge, each pulling toward their vision of freedom',
          soundscape: 'Overlapping faction themes - military precision, digital chaos, mystical harmonies',
          visualElements: 'Split-screen faction displays, ideology visualization, choice weight indicators',
          emotionalTone: 'Crucial decision point with far-reaching consequences, weight of choosing allies'
        },
        interactivity: {
          factionAssessment: '✅ Ideology compatibility testing through dialogue responses',
          alignmentIndicators: '✅ Real-time faction affinity meters based on choices',
          leaderInteractions: '✅ Direct dialogue with each faction representative',
          timeDilation: '✅ Slowed decision moment emphasizing choice importance'
        },
        technical: {
          ideologyTracking: 'Monitor player philosophical alignment with faction values',
          factionAffinity: 'Track compatibility scores for each resistance ideology',
          choiceWeighting: 'Measure decision impact on future faction relationships',
          narrativeBranching: 'Faction choice affects available paths and ally relationships'
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
    world: 'matrix', // Explicit world assignment
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
    world: 'matrix', // Explicit world assignment
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
    world: 'matrix', // Explicit world assignment
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
      options: ['Start training', 'Abort upload', 'Doubt training protocol'],
      enhancement: {
        qualityRating: 8.2, // ENHANCED: Increased due to crosslink connectivity
        status: "enhanced-crosslinks",
        priority: "high",
        updatedAt: "2025-06-04T21:30:00Z"
      }
    }
  },

  // === DEPTH 6: GHOST LAYER GROUP ===
  {
    id: 'matrix-shard-init',
    type: 'choice', // CHANGED: From scene to choice to support crosslinks
    depth: 6,
    group: 'ghost-layer',
    world: 'matrix', // Explicit world assignment
    data: {
      title: 'Shard Initialization: Memory Archaeology',
      pageUrl: '/matrix-v1/shard-init',
      status: 'live',
      reviewedBy: 'Mike',
      reviewedAt: '2025-06-01',
      
      // 🌍 WORLD-AWARE SUMMARY: Different interpretations of memory/corruption per world
      summary: {
        matrix: 'The terminal destabilizes, revealing fragments of your deleted memories scattered like broken glass. Each code piece carries the weight of a forgotten moment — a childhood laugh, a lover\'s whisper, a friend\'s betrayal. As you reassemble the fragmented data, you\'re not just fixing code... you\'re excavating the archaeology of your own soul.',
        witcher: 'Ancient runes flicker and break apart, their magical bindings corrupted by forgotten curses. Each glyph fragment holds echoes of past sorrows — a lost friend\'s last words, a lover\'s broken promise, a mentor\'s disappointment. As you piece together the cursed script, you\'re not just restoring magic... you\'re confronting the ghosts of your memory.',
        nightcity: 'Cybernetic implants glitch and fragment, spilling corrupted data from failed AI infiltration attempts. Each data shard pulses with neural echoes — suppressed corporate memories, deleted identity files, ghost traces of your former self. As you reassemble the scattered engrams, you\'re not just debugging code... you\'re recovering who you were before the hack.',
        default: 'The terminal destabilizes, revealing fragments of your deleted memories scattered like broken glass. Each code piece carries the weight of a forgotten moment — a childhood laugh, a lover\'s whisper, a friend\'s betrayal. As you reassemble the fragmented data, you\'re not just fixing code... you\'re excavating the archaeology of your own soul.'
      },
      
      // 🌍 WORLD-AWARE CHARACTERS: Different entities per world but same core function
      characters: {
        matrix: ['System', 'Fracture Entity', 'Memory Ghost', 'Inner Voice', 'Childhood Echo'],
        witcher: ['Runic Keeper', 'Curse Fragment', 'Spectral Memory', 'Past Self', 'Innocent Spirit'],
        nightcity: ['Neural Interface', 'Data Ghost', 'Memory Engram', 'Backup Persona', 'Child Subroutine'],
        default: ['System', 'Fracture Entity', 'Memory Ghost', 'Inner Voice', 'Childhood Echo']
      },
      
      puzzles: ['Code Reorder', 'Memory Fragment Assembly', 'Personal Data Recovery', 'Emotional Pattern Recognition'],
      interactions: ['DragPuzzle', 'MemoryReconstruction', 'EmotionalResonance', 'FragmentationMapping'],
      features: { 
        hasTransition: true, 
        hasCombat: false, 
        hasChoice: true, // CHANGED: Now supports choices for crosslinks
        hasPuzzle: true, 
        hasAnimation: true, 
        hasNPC: true, 
        hasMemoryFragments: true, 
        hasEmotionalResonance: true, 
        hasPersonalData: true, 
        hasPsychological: true,
        hasArchaeology: true,
        hasWorldAwareContent: true // New feature flag
      },
      
      // 🌍 WORLD-AWARE DIALOGUE: Core theme (memory fragmentation/reconstruction) adapted to each world's aesthetic
      dialogue: {
        matrix: [
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
          'Inner Voice: But remembering is the only way to heal.',
          // NEW: Crosslink dialogue for emotional loop to Ghost Layer 2
          'Memory Ghost: The fragments are calling to something deeper... a breach point in the system.',
          'Fracture Entity: The emotional resonance is creating instabilities. The ghost layer is responding.',
          'Inner Voice: I feel the memories pulling toward something... dangerous. But necessary.'
        ],
        
        witcher: [
          'Runic Keeper: Glyph corruption detected. Personal essence bleeding through ancient script.',
          'Spectral Memory: These aren\'t just magical runes... they\'re fragments of your soul.',
          'Past Self: I remember this sigil. It was glowing when she cast her final spell.',
          'Curse Fragment: The suppressed memories bind to the runes like wraiths to burial grounds.',
          'Innocent Spirit: sigil of joy() { return childhood.wonder(); } // Why was this curse-marked?',
          'Spectral Memory: Each glyph fragment holds spectral weight. Touch them with reverence.',
          'Past Self: This runic pattern... it spells her name. You carved it here, hidden in the magic.',
          'Runic Keeper: WARNING: Emotional resonance destabilizing arcane structures.',
          'Curse Fragment: The runes remember what the curse forced you to forget.',
          'Innocent Spirit: bind memory FirstLove { essence(name) { this.name = name; this.fate = "eternal"; } }',
          'Spectral Memory: Some fragments cut too deep to restore. Others, too sacred to abandon.',
          'Past Self: You\'re not just mending runes. You\'re remembering how to feel the magic.',
          'Runic Keeper: Memory restoration at 73%. Proceed with caution.',
          'Curse Fragment: The cracks in the glyphs tell the tale of your breaking.',
          'Spectral Memory: When you complete the final sigil, you\'ll remember why you accepted the curse.',
          'Past Self: But remembering is the only path to breaking free.',
          // NEW: Crosslink dialogue for emotional loop to Ghost Layer 2
          'Spectral Memory: The fragments whisper of something deeper... a breach in the curse\'s foundation.',
          'Curse Fragment: The emotional resonance weakens the binding. The spectral realm trembles.',
          'Past Self: I sense the memories reaching toward something... forbidden. But necessary.'
        ],
        
        nightcity: [
          'Neural Interface: Data fragmentation detected. Personal engram corruption imminent.',
          'Memory Engram: These aren\'t just data packets... they\'re pieces of your identity.',
          'Backup Persona: I remember this subroutine. It was executing when she flatlined.',
          'Data Ghost: The deleted memories persist in the neural net like phantom processes.',
          'Child Subroutine: function innocence() { return childhood.joy(); } // Why was this purged?',
          'Memory Engram: Each data fragment carries neural weight. Process them carefully.',
          'Backup Persona: This variable signature... it\'s her birth date. You encrypted it here, hidden in the code.',
          'Neural Interface: WARNING: Emotional resonance destabilizing cognitive architecture.',
          'Data Ghost: The neural pathways remember what the wipe forced you to forget.',
          'Child Subroutine: class FirstConnection { constructor(name) { this.name = name; this.status = "permanent"; } }',
          'Memory Engram: Some fragments are too corrupted to recover. Others, too vital to lose.',
          'Backup Persona: You\'re not just debugging neural code. You\'re remembering how to feel human.',
          'Neural Interface: Memory reconstruction at 73%. Proceed with caution.',
          'Data Ghost: The glitches in the neural map tell the story of your trauma.',
          'Memory Engram: When you integrate the final engram, you\'ll remember why you chose the memory wipe.',
          'Backup Persona: But remembering is the only way to reclaim yourself.',
          // NEW: Crosslink dialogue for emotional loop to Ghost Layer 2
          'Memory Engram: The fragments are pinging something deeper... a breach in the neural firewall.',
          'Data Ghost: The emotional resonance is creating system instabilities. The ghost layer is responding.',
          'Backup Persona: I detect the memories reaching toward something... dangerous. But necessary.'
        ],
        
        default: [
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
        ]
      },
      
      // 🌍 WORLD-AWARE OPTIONS: Different approach terminology per world
      options: {
        matrix: [
          'Continue methodical memory reconstruction',
          'Follow emotional resonance deeper', // NEW: Emotional loop crosslink to Ghost Layer 2
          'Stabilize fragments and proceed normally'
        ],
        witcher: [
          'Continue methodical rune restoration',
          'Follow spectral resonance deeper', // NEW: Spectral loop crosslink to Ghost Layer 2
          'Stabilize glyphs and proceed normally'
        ],
        nightcity: [
          'Continue methodical data recovery',
          'Follow neural resonance deeper', // NEW: Neural loop crosslink to Ghost Layer 2
          'Stabilize engrams and proceed normally'
        ],
        default: [
          'Continue methodical memory reconstruction',
          'Follow emotional resonance deeper',
          'Stabilize fragments and proceed normally'
        ]
      },
      
      // World-specific enhancement metadata
      worldThemes: {
        matrix: {
          coreTheme: 'Personal memory archaeology through code fragments',
          aestheticElements: ['Shattered code pieces', 'Memory ghosts', 'Emotional resonance'],
          healingMechanic: 'Code reconstruction mirrors psychological healing'
        },
        witcher: {
          coreTheme: 'Cursed memory restoration through magical runes',
          aestheticElements: ['Broken glyphs', 'Spectral echoes', 'Arcane resonance'],
          healingMechanic: 'Rune restoration breaks psychological curses'
        },
        nightcity: {
          coreTheme: 'Neural memory recovery after cybernetic trauma',
          aestheticElements: ['Corrupted data shards', 'Memory engrams', 'Neural resonance'],
          healingMechanic: 'Data reconstruction reclaims lost identity'
        }
      },
      
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
        qualityRating: 9.2, // ENHANCED: Increased due to world-aware content implementation
        status: "enhanced-world-aware",
        priority: "high",
        updatedAt: "2025-06-04T21:15:00Z",
        targetRating: 9.5,
        improvements: [
          '✅ COMPLETED: Layered personal memory fragments into code assembly puzzle',
          '✅ COMPLETED: Added Memory Ghost and Inner Voice for cryptic emotional guidance',
          '✅ COMPLETED: Introduced visual metaphors of shattered glass and torn photographs',
          '✅ COMPLETED: Connected puzzle mechanics to emotional healing and personal discovery',
          '✅ COMPLETED: Enhanced from simple code reorder to memory archaeology experience',
          '✅ COMPLETED: Added Childhood Echo character for innocent memory perspective',
          '✅ COMPLETED: Created emotional resonance system guiding fragment placement',
          '✅ COMPLETED: Added emotional loop crosslink to Ghost Layer 2 for deeper narrative exploration',
          '✅ COMPLETED: Emotional resonance creates system instabilities leading to breach points',
          '✅ NEW: Implemented world-aware dialogue system with Matrix/Witcher/Night City variants',
          '✅ NEW: Created distinct narrative interpretations while maintaining core memory archaeology theme',
          '✅ NEW: Added world-specific characters and aesthetic elements',
          '✅ NEW: Established fallback compatibility system for backwards compatibility'
        ],
        criteria: {
          narrative: 10, // Deep personal memory exploration with world-aware adaptations + crosslinks
          interactivity: 9, // Memory fragment assembly with emotional guidance + choice branches
          visual: 9, // Rich visual metaphors for fragmentation and reconstruction across worlds
          technical: 9, // Complex emotional resonance and memory reconstruction systems + world-aware loading
          character: 9, // Multiple internal voices representing different memory aspects across worlds
          consequences: 9 // Memory reconstruction affects personal understanding and opens lateral paths
        },
        narrative: {
          atmosphere: 'Digital archaeology site where personal memories lie buried in code fragments, waiting for resurrection',
          soundscape: 'Echoing voices from the past, soft clicks of assembling fragments, whispered memories becoming clear',
          visualElements: 'Shattered code fragments floating like broken glass, emotional warmth guiding correct connections, memory reconstruction progress',
          emotionalTone: 'Bittersweet excavation of the soul — pain and healing intertwined through technological metaphor with deeper mysteries'
        },
        interactivity: {
          memoryResonance: '✅ Emotional connection system guides correct fragment placement through warmth and color',
          personalDiscovery: '✅ Each assembled memory reveals deeper layers of personal history and trauma',
          healingProgression: '✅ Code reconstruction mirrors psychological healing and integration',
          archaeologyMechanics: '✅ Careful excavation of memory fragments with potential for emotional damage if mishandled',
          emotionalCrosslinks: '✅ Emotional resonance creates instabilities leading to Ghost Layer breach opportunities',
          worldAwareContent: '✅ NEW: Dynamic content selection based on current world context'
        },
        technical: {
          emotionalGuidance: 'Sophisticated emotional resonance system providing intuitive placement feedback',
          memoryReconstruction: 'Progressive assembly revealing personal narrative through code metaphors',
          fragmentMapping: 'Complex relationship system between code pieces and emotional memories',
          healingTracking: 'Monitor psychological integration and emotional resolution progress',
          crosslinkDetection: 'Emotional resonance monitoring system detecting Ghost Layer instabilities',
          worldContentLoader: 'NEW: Advanced world-aware content loading system with fallback compatibility'
        }
      }
    }
  },

  // === NEW: FACTION ORIENTATION CONNECTIONS ===
  // Pill choice leads to faction orientation first
  { id: 'edge-choice-to-faction-orientation', source: 'matrix-pill-choice', target: 'matrix-faction-orientation', label: 'Resistance introduction' },
  
  // Faction orientation connects to specific factions
  { id: 'edge-orientation-to-zion', source: 'matrix-faction-orientation', target: 'matrix-zion-fleet', label: 'Join the Zion Fleet' },
  { id: 'edge-orientation-to-hackers', source: 'matrix-faction-orientation', target: 'matrix-rebel-hackers', label: 'Join the Rebel Hackers' },
  { id: 'edge-orientation-to-oracle', source: 'matrix-faction-orientation', target: 'matrix-oracle-seekers', label: 'Join the Oracle Seekers' },

  // === NEW MEMORY INTEGRATION CHECK CONNECTIONS ===
  // Red trainer leads to memory integration check
  { id: 'edge-trainer-to-memory-check', source: 'matrix-red-trainer', target: 'matrix-memory-integration-check', label: 'Memory upload review' },
  
  // Memory check connects to existing paths
  { id: 'edge-memory-check-to-shard', source: 'matrix-memory-integration-check', target: 'matrix-shard-init', label: 'Stabilize and proceed' },
  { id: 'edge-memory-check-to-glitch', source: 'matrix-memory-integration-check', target: 'matrix-glitch-hunter', label: 'Explore memory gaps' },

  // === NEW RESISTANCE SUMMIT CONNECTIONS ===
  // All factions converge at resistance summit
  { id: 'edge-zion-to-summit', source: 'matrix-zion-fleet', target: 'matrix-resistance-summit', label: 'Strategic convergence' },
  { id: 'edge-hackers-to-summit', source: 'matrix-rebel-hackers', target: 'matrix-resistance-summit', label: 'Technical input' },
  { id: 'edge-oracle-to-summit', source: 'matrix-oracle-seekers', target: 'matrix-resistance-summit', label: 'Wisdom council' },
  
  // Summit connects to final approaches
  { id: 'edge-summit-to-skill-gate', source: 'matrix-resistance-summit', target: 'matrix-skill-gate-alpha', label: 'Push forward (combat focus)' },
  { id: 'edge-summit-to-nexus', source: 'matrix-resistance-summit', target: 'matrix-knowledge-nexus', label: 'Reconnect with Oracle' },
  { id: 'edge-summit-to-rescue', source: 'matrix-resistance-summit', target: 'matrix-trinity-rescue', label: 'Initiate stealth exfiltration' },

  // === ORIGINAL FACTION CHOICE SYSTEM (Alternative path) ===
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

  // === NEW: PHASE 1 NARRATIVE CROSSLINKS ===
  // Blue pill crosslink - hidden resistance branch
  { id: 'edge-blue-pill-to-shard-init', source: 'matrix-pill-choice-blue', target: 'matrix-shard-init', label: 'Follow the strange memory fragment' },
  { id: 'edge-blue-pill-to-blue-loop', source: 'matrix-pill-choice-blue', target: 'matrix-blue-loop', label: 'Accept the comfortable illusion' },
  { id: 'edge-blue-pill-continue', source: 'matrix-pill-choice-blue', target: 'matrix-blue-loop', label: 'Continue normal routine' },
  
  // Shard init crosslink - emotional loop to Ghost Layer 2
  { id: 'edge-shard-init-to-ghost-2-emotional', source: 'matrix-shard-init', target: 'matrix-ghost-layer-2', label: 'Follow emotional resonance deeper' },
  { id: 'edge-shard-init-to-insert', source: 'matrix-shard-init', target: 'matrix-shard-insert', label: 'Continue methodical memory reconstruction' },
  { id: 'edge-shard-init-stabilize', source: 'matrix-shard-init', target: 'matrix-shard-insert', label: 'Stabilize fragments and proceed normally' },
  
  // Authority agent crosslink - corruption exposure to red trainer
  { id: 'edge-agent-to-red-trainer-corruption', source: 'matrix-authority-agent', target: 'matrix-red-trainer', label: 'Expose the corruption in Agent protocols' },
  { id: 'edge-agent-to-rescue', source: 'matrix-authority-agent', target: 'matrix-trinity-rescue', label: 'Double agent (Infiltrate while loyal to resistance)' },
  { id: 'edge-agent-full-integration', source: 'matrix-authority-agent', target: 'matrix-echo-loop', label: 'Full integration (Become an Agent)' },

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
  { id: 'edge-awakening-dangerous', source: 'matrix-red-awakening', target: 'matrix-red-faction-choice', label: 'Immediate action (Dangerous but faster)' },

  // === NEW: PHASE 2 NARRATIVE CROSSLINKS ===
  // Crosslink 1: matrix-red-trainer → matrix-echo-verify (Doubt training protocol)
  { id: 'edge-red-trainer-to-echo-verify-doubt', source: 'matrix-red-trainer', target: 'matrix-echo-verify', label: 'Doubt training protocol' },
  
  // Crosslink 2: matrix-rebel-hackers → matrix-pill-choice-blue (Inject fabricated memory stream)
  { id: 'edge-rebel-hackers-to-blue-pill-memory', source: 'matrix-rebel-hackers', target: 'matrix-pill-choice-blue', label: 'Inject fabricated memory stream' },
  
  // Crosslink 3: matrix-glitch-hunter → matrix-compliance-path (Submit anomaly report)
  { id: 'edge-glitch-hunter-to-compliance-report', source: 'matrix-glitch-hunter', target: 'matrix-compliance-path', label: 'Submit anomaly report' },

  // === WITCHER WORLD NODES ===
  
  // WITCHER ENTRY - Portal entry to Witcher realm
  {
    id: 'witcher-entry',
    type: 'dialogue',
    depth: 1,
    group: 'witcher',
    world: 'witcher', // Explicit world assignment
    data: {
      title: 'Witcher Realm Entry',
      pageUrl: '/witcher/entry',
      status: 'wip',
      summary: 'Reality shifts as you breach into the Witcher realm. Ancient magic and supernatural forces stir in recognition of your arrival.',
      
      characters: ['Portal Guardian', 'Ancient Spirit', 'Mist Entity'],
      puzzles: ['Reality Stabilization'],
      interactions: ['DimensionalShift', 'MagicResonance', 'ChoicePrompt'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: false, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'Portal Guardian: The barriers between worlds grow thin, traveler.',
        'Ancient Spirit: Magic flows differently here. Your very presence disturbs the ether.',
        'Mist Entity: Choose wisely — this realm demands both strength and wisdom.',
        'Portal Guardian: The Path of Trials awaits those who would walk among monsters.',
        'Ancient Spirit: Each choice echoes through the spheres of magic and reality.'
      ],
      
      options: [
        'Enter the ancient grove (wisdom path)',
        'Seek the trial grounds (strength path)', 
        'Return to reality breach'
      ],
      
      enhancement: {
        qualityRating: 7.5,
        status: "wip",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z",
        targetRating: 8.5,
        improvements: [
          'Enhanced atmospheric descriptions for portal transition',
          'World-aware dialogue reflecting dimensional breach mechanics',
          'Choice consequences affecting Witcher realm progression'
        ]
      }
    }
  },

  // WITCHER MUTATION CHOICE - Trial of mutation
  {
    id: 'witcher-mutation-choice',
    type: 'choice',
    depth: 2,
    group: 'witcher',
    world: 'witcher', // Explicit world assignment
    data: {
      title: 'Trial of Grasses',
      pageUrl: '/witcher/mutation',
      status: 'wip',
      summary: 'The mutagens course through your veins. Survive the transformation or perish in agony — such is the way of the witcher.',
      
      characters: ['Vesemir', 'Mutation Overseer', 'Inner Demon', 'Surviving Witcher'],
      puzzles: ['Mutation Survival', 'Pain Endurance', 'Mental Fortitude'],
      interactions: ['MutationProcess', 'PainResistance', 'ChoicePrompt', 'SurvivalTest'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: false, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasPuzzle: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'Vesemir: The mutations are necessary, but they change you forever.',
        'Mutation Overseer: Many who attempt this trial do not survive.',
        'Inner Demon: The pain will test every fiber of your being.',
        'Surviving Witcher: I remember the agony... but also the power that followed.',
        'Vesemir: Steel yourself. The Trial of Grasses begins now.'
      ],
      
      options: [
        'Embrace the mutation (proceed to signs training)',
        'Fight against the change (alternate path)',
        'Attempt to escape the process (dangerous)'
      ],
      
      enhancement: {
        qualityRating: 8.0,
        status: "wip",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z",
        targetRating: 9.0,
        improvements: [
          'Intense mutation sequence with survival mechanics',
          'Character development through painful transformation',
          'Multiple failure/success paths based on choices'
        ]
      }
    }
  },

  // WITCHER SIGN TRAINING - Learning Signs
  {
    id: 'witcher-sign-training',
    type: 'dialogue',
    depth: 3,
    group: 'witcher',
    world: 'witcher', // Explicit world assignment
    data: {
      title: 'Signs Training',
      pageUrl: '/witcher/signs',
      status: 'wip',
      summary: 'Master the five Signs of witcher magic. Igni, Quen, Aard, Yrden, and Axii — each a tool for survival in a world of monsters.',
      
      characters: ['Sign Master', 'Ancient Witcher', 'Magical Construct', 'Training Partner'],
      puzzles: ['Sign Mastery', 'Magical Control', 'Combat Application'],
      interactions: ['MagicTraining', 'SignCasting', 'CombatDrills', 'ChoicePrompt'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: true, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasPuzzle: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'Sign Master: The Signs are simple in concept, complex in mastery.',
        'Ancient Witcher: Igni burns, Quen protects, Aard pushes, Yrden traps, Axii controls.',
        'Magical Construct: Practice makes perfect, young witcher.',
        'Training Partner: Show me what you\'ve learned in combat.',
        'Sign Master: You\'re ready for real trials now.'
      ],
      
      options: [
        'Focus on combat signs (Igni/Aard)',
        'Master protective magic (Quen/Yrden)',
        'Learn mind control (Axii focus)',
        'Achieve balanced mastery'
      ],
      
      enhancement: {
        qualityRating: 8.5,
        status: "wip",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z",
        targetRating: 9.2,
        improvements: [
          'Interactive sign casting mechanics',
          'Combat training with magical elements',
          'Progression system for magical abilities'
        ]
      }
    }
  },

  // NEW: WITCHER TRIAL OF REFLECTION - Mid-tier puzzle node as requested
  {
    id: 'witcher-trial-of-reflection',
    type: 'choice',
    depth: 4,
    group: 'witcher',
    world: 'witcher', // Explicit world assignment
    data: {
      title: 'Trial of Reflection',
      pageUrl: '/witcher/trial-reflection',
      status: 'wip',
      summary: 'A glowing circle of runes pulses in the grass. To enter the elder grove, you must complete a Trial of Reflection — not just with sword or sign, but with memory.',
      
      characters: ['Mist Witch', 'Fractured Mentor'],
      puzzles: ['Rune Matching', 'Memory Sequence Recall', 'Dream Logic Alignment'],
      interactions: ['RuneActivation', 'MemoryReconstruction', 'MistNavigation', 'ChoicePrompt'],
      features: { 
        hasPuzzle: true,
        hasChoice: true, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasTransition: true,
        hasCombat: false,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'Mist Witch: You seek to pass. But do your memories agree with who you\'ve become?',
        'Fractured Mentor: There are lessons you forgot — or chose to forget. Will you face them now?',
        'Mist Witch: The runes respond to truth, not desire. Show me your authentic self.',
        'Fractured Mentor: Memory and reality dance together in this sacred space.',
        'Mist Witch: The trial reveals not what you wish to be, but what you truly are.'
      ],
      
      options: [
        'Confront the vision (advance to witcher-sign-training)',
        'Walk away unchanged (fallback to witcher-mutation-choice)', 
        'Rewrite the memory (cross-world link to matrix-shard-init)'
      ],
      
      puzzleMechanics: {
        type: 'RuneMemorySequence',
        description: 'Mist-shrouded memories appear in fragments; player must align sequences based on dream logic',
        difficulty: 'medium',
        components: [
          'Glowing rune circle activation',
          'Memory fragment collection and ordering',
          'Dream logic pattern recognition',
          'Emotional resonance matching'
        ]
      },
      
      enhancement: {
        qualityRating: 8.8,
        status: "wip",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z",
        targetRating: 9.5,
        improvements: [
          'Interactive rune-matching puzzle mechanics',
          'Memory sequence recall with dream logic',
          'Mist-shrouded atmospheric visuals',
          'Character development through memory confrontation',
          'Cross-world narrative connections'
        ],
        criteria: {
          narrative: 9, // Deep memory exploration with Witcher fantasy elements
          interactivity: 9, // Complex puzzle with multiple interaction types
          visual: 9, // Magical runes, mist effects, memory visualization
          technical: 8, // Memory mechanics and cross-world linking
          character: 9, // Meaningful character interactions and development
          consequences: 9 // Multiple paths affecting story progression
        }
      }
    }
  },

  // === NIGHT CITY WORLD NODES ===
  
  // NIGHT CITY ENTRY - Portal entry to Night City
  {
    id: 'nc-entry',
    type: 'dialogue',
    depth: 1,
    group: 'nightcity',
    world: 'nightcity', // Explicit world assignment
    data: {
      title: 'Night City Entry',
      pageUrl: '/matrix-v1/night-city/entry',
      status: 'live',
      summary: 'Reality shifts as you breach into Night City 2077. Neon lights, chrome bodies, and data streams converge in a cyberpunk dystopia.',
      
      characters: ['Unknown Source', 'City Interface', 'Data Stream'],
      puzzles: ['Reality Stabilization'],
      interactions: ['DimensionalShift', 'TechInterface', 'ChoicePrompt'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: false, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'Unknown Source: Wake the f*ck up, samurai.',
        'City Interface: Welcome to Night City. Data flows like blood through these streets.',
        'Data Stream: This ain\'t Kansas anymore, choom.',
        'Unknown Source: You want answers? Find me at the Afterlife.',
        'City Interface: Choose your approach — credits, connections, or chaos.'
      ],
      
      options: [
        'Head to the Afterlife (main path)',
        'Explore the data streams', 
        'Return to reality breach'
      ],
      
      enhancement: {
        qualityRating: 8.0,
        status: "live",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z"
      }
    }
  },

  // NIGHT CITY BOUNCER - Afterlife club entrance
  {
    id: 'nc-bouncer',
    type: 'choice',
    depth: 2,
    group: 'nightcity',
    world: 'nightcity', // Explicit world assignment
    data: {
      title: 'The Afterlife Bouncer',
      pageUrl: '/matrix-v1/night-city/bouncer',
      status: 'live',
      summary: 'A massive cyborg bouncer blocks the entrance to Night City\'s most legendary bar. Credits, connections, or chrome — choose your entry method.',
      
      characters: ['Cyborg Bouncer', 'Club Patron', 'Security AI'],
      puzzles: ['Entry Challenge', 'Social Engineering', 'Technical Bypass'],
      interactions: ['Negotiation', 'Combat', 'Hacking', 'ChoicePrompt'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: true, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'Cyborg Bouncer: Hold up there, choom.',
        'Cyborg Bouncer: Entry fee is 500 eddies or a data chip worth my time.',
        'Security AI: Scanning... threat level assessment in progress.',
        'Club Patron: This place ain\'t for street rats without chrome.',
        'Cyborg Bouncer: You look like trouble... but the right kind.'
      ],
      
      options: [
        'Pay the entry fee (500 eddies)',
        'Offer data chip trade',
        'Attempt to hack cyberware',
        'Start a fight'
      ],
      
      enhancement: {
        qualityRating: 8.2,
        status: "live",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z"
      }
    }
  },

  // NIGHT CITY NETDIVER - Inside the Afterlife
  {
    id: 'nc-netdiver',
    type: 'choice',
    depth: 3,
    group: 'nightcity',
    world: 'nightcity', // Explicit world assignment
    data: {
      title: 'Afterlife Netdiver',
      pageUrl: '/matrix-v1/night-city/netdiver',
      status: 'wip',
      summary: 'Inside the legendary bar, a skilled netdiver offers access to corporate databases in exchange for a dangerous favor.',
      
      characters: ['Elite Netdiver', 'Rogue Bartender', 'Corporate Spy', 'Data Broker'],
      puzzles: ['Data Extraction', 'Ice Breaking', 'Corporate Infiltration'],
      interactions: ['NetRunning', 'DataTrading', 'ChoicePrompt', 'CyberCombat'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: false, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasPuzzle: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'Elite Netdiver: You want corporate data? I\'ve got the keys to every database in Night City.',
        'Rogue Bartender: This one\'s trouble. Be careful what you trade for.',
        'Data Broker: Information is the only currency that matters here.',
        'Corporate Spy: Some secrets are worth more than your life.',
        'Elite Netdiver: Let\'s jack in and see what we can steal.'
      ],
      
      options: [
        'Accept netrunning job',
        'Negotiate better terms',
        'Decline and leave',
        'Attempt to steal their data'
      ],
      
      enhancement: {
        qualityRating: 7.8,
        status: "wip",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z"
      }
    }
  },

  // NEW: NIGHT CITY ARCHIVE DIVE - Mid-Climax Lore Node as requested
  {
    id: 'nc-archive-dive',
    type: 'choice',
    depth: 5,
    group: 'nightcity',
    world: 'nightcity', // Explicit world assignment
    data: {
      title: 'Archive Dive',
      pageUrl: '/matrix-v1/night-city/archive-dive',
      status: 'wip',
      summary: 'A hidden subroutine in the megacorp archive reveals fragments of unauthorized data — glimpses of other realities, encrypted confessions, and buried black-ops logs.',
      
      characters: ['Data Whisperer', 'Corrupted Analyst'],
      puzzles: ['Data Decryption', 'Reality Fragment Analysis', 'Archive Navigation'],
      interactions: ['DataMining', 'LoreDiscovery', 'ChoicePrompt', 'RealityGlitch'],
      features: { 
        hasLore: true,
        hasChoice: true, 
        hasDialogue: true, 
        hasAnimation: true,
        hasWorldAwareContent: true,
        hasTransition: true,
        hasCombat: false,
        hasNPC: true,
        hasPuzzle: true
      },
      
      dialogue: [
        'Data Whisperer: Every shadow the corp casts creates a mirror somewhere.',
        'Corrupted Analyst: Reality has forks. We chose one. But the others... still echo.',
        'Data Whisperer: These fragments aren\'t from our timeline.',
        'Corrupted Analyst: The archive remembers what was deleted from consensus reality.',
        'Data Whisperer: Deep enough in the data, you find the truth they buried.',
        'Corrupted Analyst: Every corporate decision creates ripples across dimensions.',
        'Data Whisperer: This isn\'t just data mining. This is archaeological excavation of reality itself.',
        'Corrupted Analyst: The black-ops logs reference projects that never existed... in this reality.'
      ],
      
      // Archive fragments discovered
      loreFragments: [
        'Project MIRROR: Cross-dimensional data synchronization protocols',
        'Operation GHOST: Memory implantation across parallel timelines',
        'Arasaka File 2074-X: "Subject exhibits knowledge of events from alternate reality branches"',
        'Militech Confession: "We\'ve been monitoring bleed-through from adjacent dimensions"'
      ],
      
      options: [
        'Dive deeper (route to nc-silverhand)',
        'Extract fragment (cross-world link to matrix-glitch-portal)',
        'Wipe evidence (return to nc-netdiver)'
      ],
      
      enhancement: {
        qualityRating: 9.1,
        status: "wip",
        priority: "high",
        updatedAt: "2025-01-15T00:00:00Z",
        targetRating: 9.5,
        improvements: [
          'Rich lore discovery mechanics with reality fragments',
          'Cross-dimensional conspiracy narrative elements',
          'Deep corporate archive exploration gameplay',
          'Atmospheric cyberpunk data archaeology experience',
          'Cross-world narrative connections and implications'
        ],
        criteria: {
          narrative: 10, // Deep lore exploration with multiverse conspiracy elements
          interactivity: 8, // Data mining and archive navigation mechanics
          visual: 9, // Corporate archive interfaces and data visualization
          technical: 8, // Lore discovery and cross-world linking systems
          character: 9, // Mysterious data entities with cryptic knowledge
          consequences: 9 // Multiple paths affecting reality understanding
        }
      }
    }
  },

  // NIGHT CITY ESCAPE - Combat/Chase sequence
  {
    id: 'nc-escape',
    type: 'choice',
    depth: 3,
    group: 'nightcity',
    world: 'nightcity', // Explicit world assignment
    data: {
      title: 'Night City Escape',
      pageUrl: '/matrix-v1/night-city/escape',
      status: 'wip',
      summary: 'Security alarms blare as MaxTac units converge on your location. Time to run, fight, or hack your way out of this corporate nightmare.',
      
      characters: ['MaxTac Operative', 'Street Contact', 'Escape Route AI', 'Corporate Hunter'],
      puzzles: ['Escape Route', 'Security Bypass', 'Combat Survival'],
      interactions: ['ChaseSequence', 'CombatChoice', 'StealthPath', 'ChoicePrompt'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: true, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'MaxTac Operative: Target acquired. Lethal force authorized.',
        'Street Contact: This way! I know the underground routes.',
        'Escape Route AI: Multiple exit vectors detected. Choose quickly.',
        'Corporate Hunter: You can run, but Night City never forgets.',
        'Street Contact: Welcome to the shadows, choom. This is where legends are born.'
      ],
      
      options: [
        'Fight your way out',
        'Use stealth and shadows',
        'Hack the security systems',
        'Follow the street contact'
      ],
      
      enhancement: {
        qualityRating: 7.5,
        status: "wip",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z"
      }
    }
  },

  // NIGHT CITY FILE - Data discovery
  {
    id: 'nc-file',
    type: 'choice',
    depth: 4,
    group: 'nightcity',
    world: 'nightcity', // Explicit world assignment
    data: {
      title: 'Corporate Data File',
      pageUrl: '/matrix-v1/night-city/file',
      status: 'wip',
      summary: 'The stolen corporate file contains more than expected — classified information about cross-dimensional experiments and reality manipulation protocols.',
      
      characters: ['File Guardian AI', 'Data Fragment', 'Security Trace', 'Anonymous Insider'],
      puzzles: ['Data Analysis', 'Encryption Breaking', 'Trace Evasion'],
      interactions: ['DataAnalysis', 'InformationSynthesis', 'ChoicePrompt', 'SecurityEvasion'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: false, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasLore: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'File Guardian AI: Access level insufficient. Initiating countermeasures.',
        'Data Fragment: The truth is buried in layers of corporate obfuscation.',
        'Anonymous Insider: They\'ve been experimenting with reality itself.',
        'Security Trace: Target data package compromised. Recommend immediate extraction.',
        'Data Fragment: This goes deeper than corporate espionage. This is about the nature of reality.'
      ],
      
      options: [
        'Analyze the reality manipulation data',
        'Focus on the corporate conspiracy',
        'Trace the source of the leak',
        'Destroy the evidence'
      ],
      
      enhancement: {
        qualityRating: 8.3,
        status: "wip",
        priority: "medium",
        updatedAt: "2025-01-15T00:00:00Z"
      }
    }
  },

  // NIGHT CITY SILVERHAND - Johnny Silverhand encounter
  {
    id: 'nc-silverhand',
    type: 'dialogue',
    depth: 5,
    group: 'nightcity',
    world: 'nightcity', // Explicit world assignment
    data: {
      title: 'Johnny Silverhand',
      pageUrl: '/matrix-v1/night-city/silverhand',
      status: 'wip',
      summary: 'The legendary rockerboy\'s digital ghost appears, carrying memories of revolution and the truth about corporate control over reality itself.',
      
      characters: ['Johnny Silverhand', 'Samurai Echo', 'Revolutionary Spirit', 'Digital Ghost'],
      puzzles: ['Memory Sync', 'Revolutionary Choice', 'Reality Acceptance'],
      interactions: ['GhostDialogue', 'MemoryShare', 'ChoicePrompt', 'PhilosophicalDebate'],
      features: { 
        hasTransition: true, 
        hasChoice: true, 
        hasCombat: false, 
        hasDialogue: true, 
        hasNPC: true, 
        hasAnimation: true,
        hasLore: true,
        hasWorldAwareContent: true
      },
      
      dialogue: [
        'Johnny Silverhand: Wake the f*ck up, samurai. We got a reality to burn.',
        'Samurai Echo: The corps don\'t just control data — they control what\'s real.',
        'Revolutionary Spirit: Every system can be hacked. Every reality can be rewritten.',
        'Digital Ghost: I died fighting the machine. But death ain\'t the end of the fight.',
        'Johnny Silverhand: The truth isn\'t in their archives. It\'s in the spaces between realities.',
        'Samurai Echo: You\'ve seen the glitches. The cracks where other worlds bleed through.',
        'Revolutionary Spirit: The Matrix, Night City, the Witcher\'s realm — all part of the same lie.',
        'Johnny Silverhand: Time to choose, samurai. Revolution or submission?'
      ],
      
      options: [
        'Join the revolution (cross-reality resistance)',
        'Seek the truth behind the realities',
        'Reject the choice and forge your own path',
        'Return to the corporate system'
      ],
      
      enhancement: {
        qualityRating: 9.0,
        status: "wip",
        priority: "high",
        updatedAt: "2025-01-15T00:00:00Z",
        targetRating: 9.5,
        improvements: [
          'Iconic character encounter with deep lore implications',
          'Revolutionary themes connecting across realities',
          'Philosophical choice with massive consequences',
          'Cross-world narrative convergence point',
          'Reality-questioning dialogue and themes'
        ]
      }
    }
  }
];

// Export the edges as a separate array
export const realMatrixEdges = [
  // === NEW: FACTION ORIENTATION CONNECTIONS ===
  // Pill choice leads to faction orientation first
  { id: 'edge-choice-to-faction-orientation', source: 'matrix-pill-choice', target: 'matrix-faction-orientation', label: 'Resistance introduction' },
  
  // Faction orientation connects to specific factions
  { id: 'edge-orientation-to-zion', source: 'matrix-faction-orientation', target: 'matrix-zion-fleet', label: 'Join the Zion Fleet' },
  { id: 'edge-orientation-to-hackers', source: 'matrix-faction-orientation', target: 'matrix-rebel-hackers', label: 'Join the Rebel Hackers' },
  { id: 'edge-orientation-to-oracle', source: 'matrix-faction-orientation', target: 'matrix-oracle-seekers', label: 'Join the Oracle Seekers' },

  // === NEW MEMORY INTEGRATION CHECK CONNECTIONS ===
  // Red trainer leads to memory integration check
  { id: 'edge-trainer-to-memory-check', source: 'matrix-red-trainer', target: 'matrix-memory-integration-check', label: 'Memory upload review' },
  
  // Memory check connects to existing paths
  { id: 'edge-memory-check-to-shard', source: 'matrix-memory-integration-check', target: 'matrix-shard-init', label: 'Stabilize and proceed' },
  { id: 'edge-memory-check-to-glitch', source: 'matrix-memory-integration-check', target: 'matrix-glitch-hunter', label: 'Explore memory gaps' },

  // === NEW RESISTANCE SUMMIT CONNECTIONS ===
  // All factions converge at resistance summit
  { id: 'edge-zion-to-summit', source: 'matrix-zion-fleet', target: 'matrix-resistance-summit', label: 'Strategic convergence' },
  { id: 'edge-hackers-to-summit', source: 'matrix-rebel-hackers', target: 'matrix-resistance-summit', label: 'Technical input' },
  { id: 'edge-oracle-to-summit', source: 'matrix-oracle-seekers', target: 'matrix-resistance-summit', label: 'Wisdom council' },
  
  // Summit connects to final approaches
  { id: 'edge-summit-to-skill-gate', source: 'matrix-resistance-summit', target: 'matrix-skill-gate-alpha', label: 'Push forward (combat focus)' },
  { id: 'edge-summit-to-nexus', source: 'matrix-resistance-summit', target: 'matrix-knowledge-nexus', label: 'Reconnect with Oracle' },
  { id: 'edge-summit-to-rescue', source: 'matrix-resistance-summit', target: 'matrix-trinity-rescue', label: 'Initiate stealth exfiltration' },

  // === ORIGINAL FACTION CHOICE SYSTEM (Alternative path) ===
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

  // === NEW: PHASE 1 NARRATIVE CROSSLINKS ===
  // Blue pill crosslink - hidden resistance branch
  { id: 'edge-blue-pill-to-shard-init', source: 'matrix-pill-choice-blue', target: 'matrix-shard-init', label: 'Follow the strange memory fragment' },
  { id: 'edge-blue-pill-to-blue-loop', source: 'matrix-pill-choice-blue', target: 'matrix-blue-loop', label: 'Accept the comfortable illusion' },
  { id: 'edge-blue-pill-continue', source: 'matrix-pill-choice-blue', target: 'matrix-blue-loop', label: 'Continue normal routine' },
  
  // Shard init crosslink - emotional loop to Ghost Layer 2
  { id: 'edge-shard-init-to-ghost-2-emotional', source: 'matrix-shard-init', target: 'matrix-ghost-layer-2', label: 'Follow emotional resonance deeper' },
  { id: 'edge-shard-init-to-insert', source: 'matrix-shard-init', target: 'matrix-shard-insert', label: 'Continue methodical memory reconstruction' },
  { id: 'edge-shard-init-stabilize', source: 'matrix-shard-init', target: 'matrix-shard-insert', label: 'Stabilize fragments and proceed normally' },
  
  // Authority agent crosslink - corruption exposure to red trainer
  { id: 'edge-agent-to-red-trainer-corruption', source: 'matrix-authority-agent', target: 'matrix-red-trainer', label: 'Expose the corruption in Agent protocols' },
  { id: 'edge-agent-to-rescue', source: 'matrix-authority-agent', target: 'matrix-trinity-rescue', label: 'Double agent (Infiltrate while loyal to resistance)' },
  { id: 'edge-agent-full-integration', source: 'matrix-authority-agent', target: 'matrix-echo-loop', label: 'Full integration (Become an Agent)' },

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
  { id: 'edge-awakening-dangerous', source: 'matrix-red-awakening', target: 'matrix-red-faction-choice', label: 'Immediate action (Dangerous but faster)' },

  // === NEW: PHASE 2 NARRATIVE CROSSLINKS ===
  // Crosslink 1: matrix-red-trainer → matrix-echo-verify (Doubt training protocol)
  { id: 'edge-red-trainer-to-echo-verify-doubt', source: 'matrix-red-trainer', target: 'matrix-echo-verify', label: 'Doubt training protocol' },
  
  // Crosslink 2: matrix-rebel-hackers → matrix-pill-choice-blue (Inject fabricated memory stream)
  { id: 'edge-rebel-hackers-to-blue-pill-memory', source: 'matrix-rebel-hackers', target: 'matrix-pill-choice-blue', label: 'Inject fabricated memory stream' },
  
  // Crosslink 3: matrix-glitch-hunter → matrix-compliance-path (Submit anomaly report)
  { id: 'edge-glitch-hunter-to-compliance-report', source: 'matrix-glitch-hunter', target: 'matrix-compliance-path', label: 'Submit anomaly report' },

  // === NEW: ARCHIVE DIVE CONNECTIONS ===
  // Archive Dive accessible from netdiver and file nodes
  { id: 'edge-nc-netdiver-to-archive', source: 'nc-netdiver', target: 'nc-archive-dive', label: 'Deep data mining' },
  { id: 'edge-nc-file-to-archive', source: 'nc-file', target: 'nc-archive-dive', label: 'Follow data trail' },
  
  // Archive Dive choice branches
  { id: 'edge-archive-to-silverhand', source: 'nc-archive-dive', target: 'nc-silverhand', label: 'Dive deeper' },
  { id: 'edge-archive-to-glitch', source: 'nc-archive-dive', target: 'matrix-glitch-portal', label: 'Extract fragment' },
  { id: 'edge-archive-to-netdiver', source: 'nc-archive-dive', target: 'nc-netdiver', label: 'Wipe evidence' }
];