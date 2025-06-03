import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MapD3 from '../pages/matrix-v1/MapD3';
import { ThemeProvider } from '../theme/ThemeContext';

jest.mock('../pages/matrix-v1/useTreeLayout', () => {
  return jest.fn(() => ({ drawTree: jest.fn(), rootPosRef: { current: { x: 0, y: 0 } } }));
});

const Wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

test('toggle metrics overlay button works', () => {
  render(
    <Wrapper>
      <MapD3 />
    </Wrapper>
  );
  const btn = screen.getByRole('button', { name: /metrics/i });
  expect(btn).toBeInTheDocument();
  expect(btn.className).toMatch(/bg-gray-900/);
  userEvent.click(btn);
  expect(btn.className).toMatch(/bg-cyan-900/);
});
