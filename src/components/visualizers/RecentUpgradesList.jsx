import React from 'react';
import { useMetricsStore } from '../../store/metricsSlice';
import { selectProgressMetrics } from '../../store/metricsSlice';

export default function RecentUpgradesList() {
  const { recentUpgrades } = useMetricsStore(selectProgressMetrics);

  if (!recentUpgrades.length) {
    return <div className="text-center text-sm text-theme-muted">Ready to clean your data</div>;
  }

  return (
    <ul className="space-y-1 text-sm">
      {recentUpgrades.map((u) => (
        <li key={u.id} className="animate-fade-in">
          <span className="font-medium capitalize">{u.world}</span> —{' '}
          {new Date(u.ts).toLocaleTimeString()}
        </li>
      ))}
    </ul>
  );
}
