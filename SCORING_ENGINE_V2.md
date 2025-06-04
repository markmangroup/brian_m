# Node Scoring System v2

This document outlines an updated scoring engine to replace the simple `qualityRating` field. The goal is to surface more granular feedback for each node and provide clearer visualizations in the Executive Quality Dashboard.

## Weighted Scoring Formula
Each node receives a score from **1–10** based on four primary categories. Each category is weighted as a portion of the final score:

| Category | Description | Weight |
| --- | --- | --- |
| **Narrative Depth** | Quality of storytelling, character voice and atmosphere | 0.35 |
| **Feature Diversity** | Variety of interactive elements, animations and mechanics | 0.25 |
| **Puzzle Originality** | Uniqueness and creativity of puzzles or challenges | 0.25 |
| **Cross‑World Adaptation** | How well the node can be adapted or connected to other worlds | 0.15 |

The weighted score is calculated as:

```
score = (narrativeDepth * 0.35) + (featureDiversity * 0.25) +
        (puzzleOriginality * 0.25) + (crossWorldAdaptation * 0.15)
```

Scores are rounded to one decimal place. Categories themselves are scored from **1–10** based on internal checklists.

### Bonus Modifiers
Additional modifiers may add up to **+2** points to the final score:

- **World‑Specific Content** (`+0.5` to `+1.0`) – rich lore or assets unique to its world
- **Connective Branching** (`+0.5`) – meaningful branching that links to multiple worlds
- **Multi‑Character Dialogue** (`+0.5`) – interactions featuring three or more speaking characters

## Example Node Scores
```
Node ID: matrix-trinity-rescue
Score: 8.9  (Narrative: 9, Features: 8, Puzzle: 7, CrossWorld: 8, Bonus: +1.2)

Node ID: witcher-mutant-escape
Score: 7.6  (Narrative: 8, Features: 6, Puzzle: 8, CrossWorld: 6, Bonus: +0.8)

Node ID: nightcity-club-hack
Score: 6.9  (Narrative: 6, Features: 7, Puzzle: 6, CrossWorld: 5, Bonus: +1.0)

Node ID: matrix-portal-intro
Score: 8.1  (Narrative: 7, Features: 8, Puzzle: 7, CrossWorld: 8, Bonus: +0.5)

Node ID: alchemy-lab-mixup
Score: 7.3  (Narrative: 7, Features: 7, Puzzle: 7, CrossWorld: 6, Bonus: +0.3)
```

## Dashboard Visualization
- Display each category as a colored bar (1–10) within a tooltip when hovering over a node.
- Show total score and any bonus modifiers in the node detail panel.
- Allow filtering nodes by category scores to identify weak areas across worlds.

This approach provides clearer reasoning for each node's rating and helps track progress toward a perfect **10/10** experience.

