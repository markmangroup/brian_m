import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DeeperProfile from '../pages/matrix-v1/DeeperProfile';

function setup(hasAccess = true) {
  if (hasAccess) localStorage.setItem('matrixV1Access', 'true');
  localStorage.setItem('playerName', 'Neo');
  render(
    <MemoryRouter initialEntries={['/matrix-v1/deeper-profile']}>
      <Routes>
        <Route path="/matrix-v1/deeper-profile" element={<DeeperProfile />} />
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

test('shows stats after sequence', () => {
  jest.useFakeTimers();
  setup();
  act(() => {
    jest.advanceTimersByTime(4000);
  });
  expect(screen.getByText(/subject id: neo/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /view the systems watching you/i })).toBeInTheDocument();
});
