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
      dialogue: ['Welcome to the simulation.', 'Your identity is not yet confirmed.']
    }
  },

  // === DEPTH 1: INTRO GROUP ===
  {
    id: 'matrix-name-prompt',
    type: 'dialogue',
    depth: 1,
    group: 'intro',
    data: {
      title: 'Name Prompt',
      pageUrl: '/matrix-v1',
      status: 'live',
      summary: 'System asks the user to input a name, establishing identity.',
      characters: ['System'],
      puzzles: ['IdentityPrompt'],
      interactions: ['InputField', 'DialogueResponse'],
      features: { hasTransition: false, hasChoice: false, hasCombat: false, hasNPC: false, hasAnimation: false },
      dialogue: ['What is your name?']
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
      options: ['Red Pill', 'Blue Pill']
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
      dialogue: ['Connection destabilized.', 'Prepare for extraction.']
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
      dialogue: ['You wake up and everything feels... normal.']
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
      dialogue: ['You\'ve crossed the line.', 'We have to move fast.']
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
      dialogue: ['Didn\'t this already happen?', 'You feel a sense of déjà vu.']
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
      dialogue: ['Loading training sequence.', 'Let\'s see what you can do.']
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
      dialogue: ['These lines are not yours.', 'Restore what you remember.']
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
      dialogue: ['Did I already say that?', 'You must listen harder.']
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
      dialogue: ['// ERROR: closing bracket not found', 'Find the symbol before it finds you.']
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
      dialogue: ['▢ ▢ ▢ ▢ ✕ ✕ ▢ ✕', 'Listen with your eyes.']
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
      dialogue: ['This is no longer a test.', 'You are becoming signal.']
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
      options: ['Zion Fleet', 'Rebel Hackers', 'Oracle Seekers']
    }
  },

  // === DEPTH 6: FACTION PATHS ===
  {
    id: 'matrix-zion-fleet',
    type: 'training',
    depth: 6,
    group: 'zion',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'fleet',
    data: {
      title: 'Zion Fleet Training',
      pageUrl: '/matrix-v1/zion-fleet',
      status: 'stub',
      summary: 'Military training with the Zion fleet. Learn combat and ship operations.',
      characters: ['Commander Locke', 'Niobe'],
      puzzles: ['Ship Combat', 'Navigation'],
      interactions: ['CombatSim', 'ShipControl'],
      features: { hasTransition: true, hasCombat: true, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasNPC: true },
      dialogue: ['The machines are coming.', 'We need soldiers who can fight both in and out of the Matrix.']
    }
  },

  {
    id: 'matrix-rebel-hackers',
    type: 'scene',
    depth: 6,
    group: 'hackers',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'hackers',
    data: {
      title: 'Rebel Hacker Network',
      pageUrl: '/matrix-v1/rebel-hackers',
      status: 'stub',
      summary: 'Join the underground hacker network. Learn to bend Matrix rules.',
      characters: ['Tank', 'Dozer', 'Mouse'],
      puzzles: ['Code Injection', 'System Exploit'],
      interactions: ['HackingInterface', 'RuleManipulation'],
      features: { hasTransition: true, hasCombat: false, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasNPC: true },
      dialogue: ['The Matrix has rules. We break them.', 'Time to learn what\'s really possible.']
    }
  },

  {
    id: 'matrix-oracle-seekers',
    type: 'dialogue',
    depth: 6,
    group: 'oracle',
    parentChoice: 'matrix-red-faction-choice',
    choiceValue: 'seekers',
    data: {
      title: 'Oracle Seekers',
      pageUrl: '/matrix-v1/oracle-seekers',
      status: 'stub',
      summary: 'Seek wisdom from the Oracle. Understand the deeper purpose.',
      characters: ['Oracle', 'Seraph'],
      puzzles: ['Philosophical Riddle', 'Future Sight'],
      interactions: ['ProphecyInterface', 'WisdomTest'],
      features: { hasTransition: true, hasCombat: false, hasChoice: false, hasPuzzle: true, hasAnimation: true, hasDialogue: true, hasNPC: true },
      dialogue: ['You\'re not here to make the choice.', 'You\'ve already made it. You\'re here to understand why.']
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
      options: ['Investigate Glitches', 'Ignore and Continue', 'Report to Authorities']
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
      dialogue: ['The glitches are everywhere once you start looking.', 'Someone is trying to contact you.']
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
      dialogue: ['Mr. Anderson. We\'ve been looking for you.', 'Help us find the others.']
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
      dialogue: ['Prove you have learned from both worlds.', 'Integration test initiated.']
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
      dialogue: ['When prophecy meets code, reality becomes fluid.', 'What will you choose to believe?']
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
      dialogue: ['I know you\'re not really one of them.', 'Will you help me escape?']
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
      dialogue: ['The Matrix was just the beginning.', 'What will you do with the power to reshape reality?']
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
  { id: 'edge-ghost-to-source', source: 'matrix-ghost-layer-2', target: 'matrix-the-source', label: 'Signal Complete' }
];