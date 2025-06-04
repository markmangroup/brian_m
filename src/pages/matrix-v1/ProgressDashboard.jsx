import React, { useState } from 'react';
import MatrixLayout from '../../components/MatrixLayout';
import MetricsHeader from '../../components/visualizers/MetricsHeader';
import AnimationPicker from '../../components/visualizers/AnimationPicker';
import VisualizerFrame from '../../components/visualizers/VisualizerFrame';
import ProgressControls from '../../components/visualizers/ProgressControls';
import RecentUpgradesList from '../../components/visualizers/RecentUpgradesList';

export default function ProgressDashboard() {
  const [mode, setMode] = useState('tiles');
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  return (
    <MatrixLayout fullHeight={false} contentClassName="p-6 space-y-6">
      <div className="max-w-3xl w-full space-y-6">
        <MetricsHeader />
        <AnimationPicker mode={mode} onChange={setMode} />
        <VisualizerFrame mode={mode} />
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
