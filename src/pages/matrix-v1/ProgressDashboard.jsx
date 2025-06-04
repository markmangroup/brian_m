import React, { useState, useEffect } from 'react';
import MatrixLayout from '../../components/MatrixLayout';
import MetricsHeader from '../../components/visualizers/MetricsHeader';
import AnimationPicker from '../../components/visualizers/AnimationPicker';
import VisualizerFrame from '../../components/visualizers/VisualizerFrame';
import ProgressControls from '../../components/visualizers/ProgressControls';
import RecentUpgradesList from '../../components/visualizers/RecentUpgradesList';
import { useMetricsStore } from '../../store/metricsSlice';
import { selectProgressMetrics } from '../../store/metricsSlice';

export default function ProgressDashboard() {
  const [mode, setMode] = useState('tiles');
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const loadMetrics = useMetricsStore((s) => s.loadMetrics);
  const history = useMetricsStore((s) => s.history);
  const [snap, setSnap] = useState(0);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  useEffect(() => {
    if (history[snap]) {
      useMetricsStore.setState({
        cleanliness: history[snap].cleanliness,
        stubRatio: history[snap].stubRatio,
        rulesApplied: history[snap].rulesApplied,
      });
    }
  }, [snap, history]);

  return (
    <MatrixLayout fullHeight={false} contentClassName="p-6 space-y-6">
      <div className="max-w-3xl w-full space-y-6">
        <MetricsHeader />
        <AnimationPicker mode={mode} onChange={setMode} />
        <VisualizerFrame mode={mode} />
        {history.length > 1 && (
          <input
            type="range"
            min="0"
            max={history.length - 1}
            value={snap}
            onChange={(e) => setSnap(parseInt(e.target.value, 10))}
            className="w-full"
          />
        )}
        <ProgressControls
          playing={playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onReset={() => setMode('tiles')}
          speed={speed}
          onSpeed={setSpeed}
        />
        <RecentUpgradesList />
      </div>
    </MatrixLayout>
  );
}
