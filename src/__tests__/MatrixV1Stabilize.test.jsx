import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Stabilize from '../pages/matrix-v1/Stabilize';

function setup(hasAccess = true) {
  if (hasAccess) localStorage.setItem('matrixV1Access', 'true');
  render(
    <MemoryRouter initialEntries={['/matrix-v1/stabilize']}>
      <Routes>
        <Route path="/matrix-v1/stabilize" element={<Stabilize />} />
        <Route path="/matrix-v1/error-loop" element={<div>Error</div>} />
        <Route path="/matrix-v1/terminal" element={<div>Terminal</div>} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  localStorage.clear();
  jest.useRealTimers();
});

test('redirects to terminal without access', () => {
  setup(false);
  expect(screen.getByText(/terminal/i)).toBeInTheDocument();
});

test('shows grid after sequence delay', () => {
  jest.useFakeTimers();
  setup();
  act(() => {
    jest.advanceTimersByTime(1600);
  });
  expect(screen.getByTestId('symbol-grid')).toBeInTheDocument();
});

test('routes to error loop after three failures', async () => {
  jest.useFakeTimers();
  setup();
  act(() => {
    jest.advanceTimersByTime(1600);
  });
  const grid = screen.getByTestId('symbol-grid');
  const firstSymbol = screen.getByTestId('sequence-display').textContent.trim()[0];
  const buttons = grid.querySelectorAll('button');
  const wrong = Array.from(buttons).find((b) => b.textContent !== firstSymbol) || buttons[0];
  for (let i = 0; i < 3; i++) {
    await userEvent.click(wrong);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  }
  expect(screen.getByText(/error/i)).toBeInTheDocument();
});
