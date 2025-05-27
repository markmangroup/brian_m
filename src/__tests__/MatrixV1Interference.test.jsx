import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Interference from '../pages/matrix-v1/Interference';

function setup(hasAccess = true) {
  if (hasAccess) localStorage.setItem('matrixV1Access', 'true');
  render(
    <MemoryRouter initialEntries={['/matrix-v1/interference']}>
      <Routes>
        <Route path="/matrix-v1/interference" element={<Interference />} />
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

test('shows options after messages', () => {
  jest.useFakeTimers();
  setup();
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(screen.getByRole('button', { name: /try to stabilize/i })).toBeInTheDocument();
});
