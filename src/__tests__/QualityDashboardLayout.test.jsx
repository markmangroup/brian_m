import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QualityDashboard from '../pages/matrix-v1/QualityDashboard';

test('kpi bar uses sticky positioning', () => {
  const { container } = render(
    <MemoryRouter>
      <QualityDashboard />
    </MemoryRouter>
  );
  const kpiBar = container.querySelector('div.sticky.top-0');
  expect(kpiBar).toBeInTheDocument();
  expect(getComputedStyle(kpiBar).position).toBe('sticky');
});

// Snapshot for filter bar classes
test('filter bar layout snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <QualityDashboard />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
