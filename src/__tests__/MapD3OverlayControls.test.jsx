import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MapD3 from '../pages/matrix-v1/MapD3';
import { ThemeProvider } from '../theme/ThemeContext';
import { ColorModeProvider } from '../theme/ColorModeContext';

const mockDraw = jest.fn(() => {
  const svg = document.querySelector('svg');
  if (svg) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'edges');
    svg.appendChild(g);
  }
});

jest.mock('../pages/matrix-v1/useTreeLayout', () => {
  return jest.fn(() => ({
    drawTree: mockDraw,
    rootPosRef: { current: { x: 0, y: 0 } },
    nodePosRef: { current: { start: { x: 0, y: 0 }, end: { x: 10, y: 10 } } },
  }));
});

const Wrapper = ({ children }) => (
  <ColorModeProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </ColorModeProvider>
);

test('edge and real path toggles work', () => {
  const { container } = render(
    <Wrapper>
      <MapD3 />
    </Wrapper>
  );
  const hideToggle = screen.getByLabelText(/hide edges/i);
  const pathToggle = screen.getByLabelText(/show real path/i);
  const edgesGroup = container.querySelector('.edges');
  expect(edgesGroup).toBeInTheDocument();
  expect(edgesGroup.style.display).toBe('');
  userEvent.click(hideToggle);
  expect(edgesGroup.style.display).toBe('none');
  userEvent.click(pathToggle);
  expect(container.querySelector('.real-path-overlay')).toBeInTheDocument();
});
