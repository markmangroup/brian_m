import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

// Initial state structure
const initialState = {
  // User data
  user: {
    name: '',
    faction: null, // 'zion-fleet', 'rebel-hackers', 'oracle-seekers'
    choices: {},
    stats: {
      exploration: 0,
      rebellion: 0,
      wisdom: 0,
      combat: 0
    }
  },
  
  // Story progression tracking
  storyProgress: {
    visitedPages: new Set(),
    completedMilestones: new Set(),
    currentChapter: 'entry',
    unlockedNodes: new Set(['matrix-v1-entry']),
    storyChoices: {}
  },
  
  // Network state for D3 visualization
  networkState: {
    nodes: [],
    edges: [],
    activeConnections: new Set(),
    explorationPaths: {}
  },
  
  // UI state
  ui: {
    theme: 'matrix',
    showTutorials: true,
    notifications: []
  }
};

export const useAppStore = create(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        ...initialState,
        
        // User actions
        setUserName: (name) => set((state) => ({
          user: { ...state.user, name }
        })),
        
        setUserFaction: (faction) => set((state) => ({
          user: { ...state.user, faction }
        })),
        
        updateUserStats: (statUpdates) => set((state) => ({
          user: {
            ...state.user,
            stats: { ...state.user.stats, ...statUpdates }
          }
        })),
        
        // Story progression
        makeStoryChoice: (choiceKey, value, milestone = null) => {
          set((state) => {
            const newStoryChoices = { ...state.storyProgress.storyChoices, [choiceKey]: value };
            const newCompletedMilestones = milestone 
              ? new Set([...state.storyProgress.completedMilestones, milestone])
              : state.storyProgress.completedMilestones;
            const newUnlockedNodes = new Set(state.storyProgress.unlockedNodes);
            
            // Auto-unlock related nodes based on milestones
            if (milestone) {
              const relatedNodes = getRelatedNodes(milestone);
              relatedNodes.forEach(nodeId => newUnlockedNodes.add(nodeId));
            }
            
            return {
              storyProgress: {
                ...state.storyProgress,
                storyChoices: newStoryChoices,
                completedMilestones: newCompletedMilestones,
                unlockedNodes: newUnlockedNodes
              }
            };
          });
        },
        
        visitPage: (pageId) => set((state) => ({
          storyProgress: {
            ...state.storyProgress,
            visitedPages: new Set([...state.storyProgress.visitedPages, pageId])
          }
        })),
        
        unlockNode: (nodeId) => set((state) => ({
          storyProgress: {
            ...state.storyProgress,
            unlockedNodes: new Set([...state.storyProgress.unlockedNodes, nodeId])
          }
        })),
        
        // Network state management
        updateNetworkState: (updates) => set((state) => ({
          networkState: { ...state.networkState, ...updates }
        })),
        
        addActiveConnection: (connectionId) => set((state) => ({
          networkState: {
            ...state.networkState,
            activeConnections: new Set([...state.networkState.activeConnections, connectionId])
          }
        })),
        
        // UI actions
        setTheme: (theme) => set((state) => ({
          ui: { ...state.ui, theme }
        })),
        
        addNotification: (notification) => set((state) => ({
          ui: {
            ...state.ui,
            notifications: [...state.ui.notifications, { 
              id: Date.now(), 
              timestamp: Date.now(),
              ...notification 
            }]
          }
        })),
        
        removeNotification: (id) => set((state) => ({
          ui: {
            ...state.ui,
            notifications: state.ui.notifications.filter(n => n.id !== id)
          }
        })),
        
        // Reset actions
        resetStoryProgress: () => set((state) => ({
          storyProgress: initialState.storyProgress
        })),
        
        resetUserData: () => set((state) => ({
          user: initialState.user
        })),
        
        // Getters
        getUserData: () => get().user,
        getStoryProgress: () => get().storyProgress,
        getNetworkState: () => get().networkState,
        hasVisitedPage: (pageId) => get().storyProgress.visitedPages.has(pageId),
        hasCompletedMilestone: (milestone) => get().storyProgress.completedMilestones.has(milestone),
        isNodeUnlocked: (nodeId) => get().storyProgress.unlockedNodes.has(nodeId),
        getStoryChoice: (choiceKey) => get().storyProgress.storyChoices[choiceKey],
      }),
      {
        name: 'brian-m-app-store', // localStorage key
        partialize: (state) => ({
          user: state.user,
          storyProgress: {
            ...state.storyProgress,
            visitedPages: Array.from(state.storyProgress.visitedPages),
            completedMilestones: Array.from(state.storyProgress.completedMilestones),
            unlockedNodes: Array.from(state.storyProgress.unlockedNodes)
          },
          ui: state.ui
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Convert arrays back to Sets
            state.storyProgress.visitedPages = new Set(state.storyProgress.visitedPages || []);
            state.storyProgress.completedMilestones = new Set(state.storyProgress.completedMilestones || []);
            state.storyProgress.unlockedNodes = new Set(state.storyProgress.unlockedNodes || ['matrix-v1-entry']);
          }
        }
      }
    )
  )
);

// Helper function to determine related nodes based on milestones
function getRelatedNodes(milestone) {
  const nodeMap = {
    'entered-entry': ['matrix-v1-terminal'],
    'entered-terminal': ['matrix-v1-checkpoint'],
    'entered-checkpoint': ['matrix-v1-message'],
    'visited-message': ['matrix-v1-stage-1'],
    'completed-stage-1': ['matrix-v1-stage-2'],
    'completed-stage-2': ['matrix-v1-stage-3'],
    'completed-stage-3': ['matrix-v1-compliance-route', 'matrix-v1-anomaly-route'],
    'selected-faction': ['matrix-v1-factions', 'matrix-v1-faction-choice'],
    'entered-shard-init': ['matrix-v1-shard-insert', 'matrix-v1-ghost-layer-2'],
    'visited-echo-verify': ['matrix-v1-echo-loop'],
    'completed-echo-loop': ['matrix-v1-map-d3'],
    'visited-factions': ['matrix-v1-zion-fleet', 'matrix-v1-rebel-hackers', 'matrix-v1-oracle-seekers'],
    'night-city-access': ['matrix-v1-night-city-entry', 'matrix-v1-night-city-bouncer']
  };
  
  return nodeMap[milestone] || [];
}

// Selector hooks for specific slices
export const useUser = () => useAppStore((state) => state.user);
export const useStoryProgress = () => useAppStore((state) => state.storyProgress);
export const useNetworkState = () => useAppStore((state) => state.networkState);
export const useUserActions = () => useAppStore((state) => ({
  setUserName: state.setUserName,
  setUserFaction: state.setUserFaction,
  updateUserStats: state.updateUserStats
}));
export const useStoryActions = () => useAppStore((state) => ({
  makeStoryChoice: state.makeStoryChoice,
  visitPage: state.visitPage,
  unlockNode: state.unlockNode
})); 