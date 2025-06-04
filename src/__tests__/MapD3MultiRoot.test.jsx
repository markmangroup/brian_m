import { render, waitFor } from '@testing-library/react';
import MapD3 from '../pages/matrix-v1/MapD3';
import { ThemeProvider } from '../theme/ThemeContext';
import { ColorModeProvider } from '../theme/ColorModeContext';

const mockDraw = jest.fn(() => {
  const svg = document.querySelector('svg');
  if (svg) {
    const a = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    a.setAttribute('data-id', 'nc-bouncer');
    svg.appendChild(a);
    const b = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    b.setAttribute('data-id', 'witcher-sign-training');
    svg.appendChild(b);
  }
});

jest.mock('../pages/matrix-v1/useTreeLayout', () => {
  return jest.fn(() => ({
    drawTree: mockDraw,
    rootPosRef: { current: { x: 0, y: 0 } },
    nodePosRef: { current: { 'nc-bouncer': { x:0, y:0 }, 'witcher-sign-training': { x:0, y:0 } } },
  }));
});

const Wrapper = ({ children }) => (
  <ColorModeProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </ColorModeProvider>
);

test('multi root nodes appear in SVG', async () => {
  const { container } = render(
    <Wrapper>
      <MapD3 />
    </Wrapper>
  );

  await waitFor(() => {
    expect(container.querySelector('[data-id="nc-bouncer"]')).toBeInTheDocument();
    expect(container.querySelector('[data-id="witcher-sign-training"]')).toBeInTheDocument();
  });
});

