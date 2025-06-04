export function calculateProgressMetrics(nodes) {
  const worlds = ['matrix', 'nightcity', 'witcher', 'finance', 'fallout'];
  const worldMetrics = {};
  worlds.forEach((w) => {
    worldMetrics[w] = { total: 0, enhanced: 0, live: 0, wip: 0, stub: 0 };
  });

  let total = 0;
  let enhancedTotal = 0;
  let liveTotal = 0;

  nodes.forEach((node) => {
    const world = node.world || node.data?.world || 'matrix';
    if (!worldMetrics[world]) {
      worldMetrics[world] = { total: 0, enhanced: 0, live: 0, wip: 0, stub: 0 };
    }
    const status = node.data?.status || 'stub';
    const hasSummary = Boolean(node.data?.summary);
    const hasEnhancement = Boolean(node.data?.enhancement);

    worldMetrics[world].total += 1;
    total += 1;

    if (status === 'live') {
      worldMetrics[world].live += 1;
      liveTotal += 1;
    } else if (status === 'wip') {
      worldMetrics[world].wip += 1;
    } else {
      worldMetrics[world].stub += 1;
    }

    if (hasSummary && hasEnhancement && status === 'live') {
      worldMetrics[world].enhanced += 1;
      enhancedTotal += 1;
    }
  });

  const cleanliness = total ? (enhancedTotal / total) * 100 : 0;
  const stubRatio = total ? liveTotal / total : 0;
  const rulesApplied = enhancedTotal;

  const recentUpgrades = nodes
    .filter((n) => n.data?.enhancement?.updatedAt)
    .sort(
      (a, b) =>
        new Date(b.data.enhancement.updatedAt) -
        new Date(a.data.enhancement.updatedAt)
    )
    .slice(0, 5)
    .map((n) => ({
      id: n.id,
      world: n.world || n.data?.world || 'matrix',
      ts: new Date(n.data.enhancement.updatedAt).getTime(),
    }));

  return {
    cleanliness,
    stubRatio,
    rulesApplied,
    worldMetrics,
    recentUpgrades,
  };
}
