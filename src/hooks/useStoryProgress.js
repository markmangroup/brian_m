import { useEffect } from 'react';
import { useAppStore, useStoryActions, useStoryProgress as useStoryProgressState } from '../store/useAppStore';

// Story milestone mapping to D3 network updates
const MILESTONE_NETWORK_UPDATES = {
  'entered-entry': {
    nodes: [{ id: 'matrix-v1-entry', status: 'completed', timestamp: Date.now() }],
    connections: ['entry->terminal']
  },
  'entered-terminal': {
    nodes: [{ id: 'matrix-v1-terminal', status: 'completed', timestamp: Date.now() }],
    connections: ['terminal->checkpoint']
  },
  'entered-checkpoint': {
    nodes: [{ id: 'matrix-v1-checkpoint', status: 'completed', timestamp: Date.now() }],
    connections: ['checkpoint->message']
  },
  'visited-message': {
    nodes: [{ id: 'matrix-v1-message', status: 'completed', timestamp: Date.now() }],
    connections: ['message->stage-1']
  },
  'completed-stage-1': {
    nodes: [{ id: 'matrix-v1-stage-1', status: 'completed', timestamp: Date.now() }],
    connections: ['stage-1->stage-2']
  },
  'completed-stage-2': {
    nodes: [{ id: 'matrix-v1-stage-2', status: 'completed', timestamp: Date.now() }],
    connections: ['stage-2->stage-3']
  },
  'completed-stage-3': {
    nodes: [{ id: 'matrix-v1-stage-3', status: 'completed', timestamp: Date.now() }],
    connections: ['stage-3->paths']
  },
  'selected-faction': {
    nodes: [{ id: 'matrix-v1-factions', status: 'completed', timestamp: Date.now() }],
    connections: ['factions->choice']
  },
  'entered-shard-init': {
    nodes: [{ id: 'matrix-v1-shard-init', status: 'active', timestamp: Date.now() }],
    connections: ['shard-init->ghost-layer']
  },
  'visited-echo-verify': {
    nodes: [{ id: 'matrix-v1-echo-verify', status: 'active', timestamp: Date.now() }],
    connections: ['echo-verify->echo-loop']
  },
  'completed-echo-loop': {
    nodes: [{ id: 'matrix-v1-echo-loop', status: 'completed', timestamp: Date.now() }],
    connections: ['echo-loop->map-d3']
  },
  'visited-factions': {
    nodes: [
      { id: 'matrix-v1-zion-fleet', status: 'available', timestamp: Date.now() },
      { id: 'matrix-v1-rebel-hackers', status: 'available', timestamp: Date.now() },
      { id: 'matrix-v1-oracle-seekers', status: 'available', timestamp: Date.now() }
    ],
    connections: ['factions->all-paths']
  },
  'night-city-access': {
    nodes: [
      { id: 'matrix-v1-night-city-entry', status: 'available', timestamp: Date.now() },
      { id: 'matrix-v1-night-city-bouncer', status: 'available', timestamp: Date.now() }
    ],
    connections: ['night-city->access']
  }
};

/**
 * Hook for managing story progression with network state updates
 * @param {string} pageId - Current page identifier
 * @param {string} milestone - Optional milestone to mark as completed
 * @param {object} choiceData - Optional choice data to record
 */
export function useStoryProgress(pageId, milestone = null, choiceData = null) {
  const { visitPage, makeStoryChoice, unlockNode } = useStoryActions();
  const { updateNetworkState, addActiveConnection } = useAppStore((state) => ({
    updateNetworkState: state.updateNetworkState,
    addActiveConnection: state.addActiveConnection
  }));
  const storyProgress = useStoryProgressState();

  // Track page visit and process milestone
  useEffect(() => {
    if (!pageId) return;

    // Mark page as visited
    visitPage(pageId);

    // Process milestone if provided
    if (milestone && !storyProgress.completedMilestones.has(milestone)) {
      // Record the milestone
      makeStoryChoice(pageId, { visited: true, timestamp: Date.now() }, milestone);

      // Update network state based on milestone
      const networkUpdates = MILESTONE_NETWORK_UPDATES[milestone];
      if (networkUpdates) {
        // Update nodes
        if (networkUpdates.nodes) {
          networkUpdates.nodes.forEach(nodeUpdate => {
            unlockNode(nodeUpdate.id);
          });
          
          updateNetworkState({
            nodes: networkUpdates.nodes,
            lastUpdate: Date.now()
          });
        }

        // Add active connections
        if (networkUpdates.connections) {
          networkUpdates.connections.forEach(connectionId => {
            addActiveConnection(connectionId);
          });
        }
      }
    }

    // Record choice data if provided
    if (choiceData) {
      makeStoryChoice(`${pageId}-choice`, choiceData);
    }
  }, [pageId, milestone, choiceData, visitPage, makeStoryChoice, unlockNode, updateNetworkState, addActiveConnection, storyProgress.completedMilestones]);

  return {
    hasVisited: storyProgress.visitedPages.has(pageId),
    isNodeUnlocked: (nodeId) => storyProgress.unlockedNodes.has(nodeId),
    hasCompletedMilestone: (milestoneId) => storyProgress.completedMilestones.has(milestoneId),
    getChoice: (choiceKey) => storyProgress.storyChoices[choiceKey],
    completedMilestones: Array.from(storyProgress.completedMilestones),
    visitedPages: Array.from(storyProgress.visitedPages),
    unlockedNodes: Array.from(storyProgress.unlockedNodes)
  };
}

/**
 * Hook for faction-specific story progression
 */
export function useFactionProgress() {
  const user = useAppStore((state) => state.user);
  const { setUserFaction, updateUserStats } = useAppStore((state) => ({
    setUserFaction: state.setUserFaction,
    updateUserStats: state.updateUserStats
  }));
  const { makeStoryChoice } = useStoryActions();

  const selectFaction = (factionId) => {
    setUserFaction(factionId);
    makeStoryChoice('faction-selection', { faction: factionId, timestamp: Date.now() }, 'selected-faction');

    // Update user stats based on faction choice
    const factionStats = {
      'zion-fleet': { combat: 2, exploration: 1 },
      'rebel-hackers': { rebellion: 2, exploration: 1 },
      'oracle-seekers': { wisdom: 2, exploration: 1 }
    };

    if (factionStats[factionId]) {
      updateUserStats(factionStats[factionId]);
    }
  };

  return {
    currentFaction: user.faction,
    selectFaction,
    factionStats: user.stats
  };
}

/**
 * Hook for getting faction display information
 */
export function useFactionDisplay() {
  const user = useAppStore((state) => state.user);

  const factionData = {
    'zion-fleet': {
      name: 'Zion Fleet',
      icon: '⚔️',
      color: 'red',
      badge: 'bg-red-900/20 text-red-300 border-red-400/40'
    },
    'rebel-hackers': {
      name: 'Rebel Hackers',
      icon: '💻',
      color: 'green', 
      badge: 'bg-green-900/20 text-green-300 border-green-400/40'
    },
    'oracle-seekers': {
      name: 'Oracle Seekers',
      icon: '🔮',
      color: 'blue',
      badge: 'bg-blue-900/20 text-blue-300 border-blue-400/40'
    }
  };

  return user.faction ? factionData[user.faction] : null;
} 