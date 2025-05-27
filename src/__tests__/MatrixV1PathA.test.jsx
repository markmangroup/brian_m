import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PathA from '../pages/matrix-v1/PathA';

function setup(hasAccess = true) {
  if (hasAccess) localStorage.setItem('matrixV1Access', 'true');
  render(
    <MemoryRouter initialEntries={['/matrix-v1/path-a']}>
      <Routes>
        <Route path="/matrix-v1/path-a" element={<PathA />} />
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

test('shows archivist prompt after sequence', () => {
  jest.useFakeTimers();
  setup();
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(screen.getByText(/continue deeper into the archive/i)).toBeInTheDocument();
});
