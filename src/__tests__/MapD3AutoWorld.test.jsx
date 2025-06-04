import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MapD3 from '../pages/matrix-v1/MapD3';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';
import { ColorModeProvider } from '../theme/ColorModeContext';

jest.mock('../pages/matrix-v1/useTreeLayout', () => {
  return jest.fn(() => ({
    drawTree: jest.fn(),
    rootPosRef: { current: { x: 0, y: 0 } },
    nodePosRef: { current: { 'nc-bouncer': { x: 10, y: 20 } } },
  }));
});

const WorldDisplay = () => {
  const { currentWorld } = useTheme();
  return <div data-testid="world">{currentWorld}</div>;
};

const Wrapper = ({ initialEntries }) => (
  <MemoryRouter initialEntries={initialEntries}>
    <ColorModeProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/matrix-v1/map-d3" element={<><WorldDisplay /><MapD3 /></>} />
        </Routes>
      </ThemeProvider>
    </ColorModeProvider>
  </MemoryRouter>
);

test('deep link switches world and centers on target node', async () => {
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({ width: 100, height: 100, top:0, left:0, right:100, bottom:100 }),
  });

  render(<Wrapper initialEntries={["/matrix-v1/map-d3?node=nc-bouncer"]} />);

  await waitFor(() =>
    expect(screen.getByTestId('world').textContent).toBe('nightcity')
  );

  const svg = document.querySelector('svg');
  await waitFor(() => {
    expect(svg.__zoom).toMatchObject({ k: 1, x: 40, y: 30 });
  });
});
