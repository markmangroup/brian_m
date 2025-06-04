import React, { useState, useMemo } from 'react';
import ThemeToggle from '../../components/ThemeToggle';
import { calculateNodeQuality } from '../../utils/nodeQualitySystem';
import { realMatrixNodes } from './realMatrixFlow';

const WORLD_GROUPS = {
  matrix: {
    name: 'Matrix',
    icon: '🟢',
    groups: [
      'intro',
      'red-pill',
      'blue-pill',
      'training',
      'choice',
      'awakening',
      'factions',
      'ghost-layer',
      'echo',
      'convergence',
      'dynamic',
      'finale',
      'investigation',
      'authority',
      'compliance'
    ]
  },
  witcher: {
    name: 'Witcher',
    icon: '⚔️',
    groups: ['witcher', 'kaer-morhen', 'novigrad', 'skellige']
  },
  nightcity: {
    name: 'Night City',
    icon: '🌆',
    groups: ['night-city', 'nightcity', 'corpo', 'street', 'nomad']
  },
  fallout: {
    name: 'Fallout',
    icon: '☢️',
    groups: ['fallout']
  },
  finance: {
    name: 'Finance',
    icon: '💰',
    groups: ['finance']
  }
};

export default function DiagnosticOverlay({ nodes = realMatrixNodes, isAdmin }) {
  const [open, setOpen] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [showStubOnly, setShowStubOnly] = useState(false);
  const [highlightDisconnected, setHighlightDisconnected] = useState(false);

  const counts = useMemo(() => {
    let stub = 0;
    let wip = 0;
    let live = 0;
    nodes.forEach(n => {
      const status = n.data?.enhancement?.status || n.data?.status || 'stub';
      if (status === 'live') live += 1;
      else if (status === 'wip') wip += 1;
      else stub += 1;
    });
    return { total: nodes.length, stub, wip, live };
  }, [nodes]);

  const avgByWorld = useMemo(() => {
    const sums = {};
    const counts = {};
    Object.keys(WORLD_GROUPS).forEach(w => {
      sums[w] = 0;
      counts[w] = 0;
    });
    nodes.forEach(n => {
      const world = Object.keys(WORLD_GROUPS).find(w =>
        WORLD_GROUPS[w].groups.includes(n.group)
      ) || 'matrix';
      sums[world] += calculateNodeQuality(n).overall;
      counts[world] += 1;
    });
    const result = {};
    Object.keys(WORLD_GROUPS).forEach(w => {
      result[w] = counts[w] ? sums[w] / counts[w] : 0;
    });
    return result;
  }, [nodes]);

  const lastUpdated = useMemo(() => {
    return [...nodes]
      .filter(n => n.data?.enhancement?.updatedAt || n.data?.lastModified)
      .sort(
        (a, b) =>
          new Date(b.data?.enhancement?.updatedAt || b.data?.lastModified || 0) -
          new Date(a.data?.enhancement?.updatedAt || a.data?.lastModified || 0)
      )
      .slice(0, 5);
  }, [nodes]);

  const admin =
    isAdmin ||
    (typeof localStorage !== 'undefined' &&
      localStorage.getItem('matrixAdmin') === 'true');

  return (
    <div className="fixed top-4 right-4 z-50 text-xs font-mono">
      <button
        onClick={() => setOpen(o => !o)}
        className="px-2 py-1 rounded-md border border-cyan-400 bg-gray-800 text-cyan-300"
      >
        {open ? 'Close' : 'Diag'}
      </button>
      {open && (
        <div className="mt-2 w-64 bg-black/90 border border-cyan-400 rounded-lg p-4 space-y-3">
          <div className="text-cyan-400 font-bold">Diagnostics</div>
          <div className="space-y-1">
            <div>Total: {counts.total}</div>
            <div>🟥 Stub: {counts.stub}</div>
            <div>🟨 WIP: {counts.wip}</div>
            <div>🟩 Live: {counts.live}</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-cyan-400">Avg Quality</div>
            {Object.entries(avgByWorld).map(([w, avg]) => (
              <div key={w}>
                {WORLD_GROUPS[w].icon} {WORLD_GROUPS[w].name}: {avg.toFixed(1)}
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <div className="font-bold text-cyan-400">Last Updated</div>
            <ul className="list-disc list-inside space-y-0.5">
              {lastUpdated.map(n => (
                <li key={n.id}>{n.data?.title || n.id}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={glitch} onChange={() => setGlitch(!glitch)} />
            Glitch Mode
          </label>
          {admin && (
            <>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showStubOnly}
                  onChange={() => setShowStubOnly(!showStubOnly)}
                />
                Show stub-only nodes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={highlightDisconnected}
                  onChange={() =>
                    setHighlightDisconnected(!highlightDisconnected)
                  }
                />
                Highlight disconnected nodes
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}
