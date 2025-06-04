import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MetricsHeader from '../components/visualizers/MetricsHeader';
import VisualizerFrame from '../components/visualizers/VisualizerFrame';
import { useMetricsStore } from '../store/metricsSlice';

test('snapshot metrics header and visualizer', () => {
  useMetricsStore.setState({
    cleanliness: 50,
    stubRatio: 0.5,
    rulesApplied: 3,
    recentUpgrades: [],
    history: [],
  });
  const { asFragment } = render(
    <>
      <MetricsHeader />
      <VisualizerFrame mode="tiles" />
    </>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('cleanliness percentage displays from store', () => {
  useMetricsStore.setState({ cleanliness: 42, stubRatio: 0.1, rulesApplied: 0, recentUpgrades: [], history: [] });
  render(<MetricsHeader />);
  expect(screen.getByText('42%')).toBeInTheDocument();
});
