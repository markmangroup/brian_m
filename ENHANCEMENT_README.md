# Node Enhancement System Guide

## Overview
This system ensures all Matrix nodes have proper enhancement metadata for quality tracking and dashboard display.

## Updated Witcher Nodes
The following Witcher nodes have been updated with enhancement metadata:

- **witcher-entry**: Quality rating 8/10, live status, medium priority
- **witcher-mutation-choice**: Quality rating 8/10, live status, medium priority  
- **witcher-sign-training**: Quality rating 8/10, live status, medium priority

All nodes now appear in the Executive Quality Dashboard at `/matrix-v1/quality-dashboard` when the **Witcher** world is selected.

## Enhancement Structure
Each node should have the following enhancement metadata:

```javascript
enhancement: {
  qualityRating: 8,           // Current quality score (0-10)
  status: "live",             // "stub", "wip", or "live"
  priority: "medium",         // "critical", "high", "medium", or "low"
  updatedAt: "2025-06-02T18:00:00Z", // ISO timestamp
  targetRating: 10,           // Target quality score
  improvements: [             // Array of improvement suggestions
    "Add immersive atmosphere",
    "Enhanced interactivity"
  ],
  criteria: {                 // Quality criteria scores (0-10)
    narrative: 6,
    interactivity: 4,
    visual: 5,
    technical: 5,
    character: 7,
    consequences: 5
  },
  // ... additional narrative and interactivity details
}
```

## Creating New Nodes with Enhancement Data

### Option 1: Use the Enhancement Template Creator
```javascript
import { createEnhancementTemplate } from '../utils/nodeQualitySystem';

const newNode = {
  id: 'my-new-node',
  type: 'scene',
  data: {
    title: 'My Scene',
    // ... other data
    enhancement: createEnhancementTemplate('scene', 'witcher', {
      qualityRating: 6,
      status: 'wip',
      improvements: ['Custom improvement 1', 'Custom improvement 2']
    })
  }
};
```

### Option 2: Use the Enhanced Node Creator
```javascript
import { createNodeWithEnhancement } from '../utils/nodeQualitySystem';

const baseNode = {
  id: 'my-new-node',
  type: 'scene',
  data: {
    title: 'My Scene',
    // ... other data
  }
};

const enhancedNode = createNodeWithEnhancement(baseNode, 'witcher', {
  qualityRating: 7,
  status: 'live'
});
```

## World-Specific Defaults
The system includes defaults for different worlds:

- **matrix**: Digital/cyberpunk themes with terminal interfaces
- **witcher**: Medieval fantasy with magical elements
- **nightcity**: Cyberpunk with neon and tech themes

## Quality Dashboard Access
View all enhanced nodes at: `/matrix-v1/quality-dashboard`

Filter by:
- World (Matrix, Witcher, Night City)
- Status (Live, WIP, Stub)
- Priority (Critical, High, Medium, Low)

## Best Practices
1. Always add enhancement metadata to new nodes
2. Use appropriate world themes for consistency
3. Set realistic quality ratings and improvement goals
4. Update timestamps when making changes
5. Use meaningful improvement descriptions 