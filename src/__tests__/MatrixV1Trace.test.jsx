import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Trace from '../pages/matrix-v1/Trace';

function setup(hasAccess = false) {
  if (hasAccess) localStorage.setItem('matrixV1Access', 'true');
  render(
    <MemoryRouter initialEntries={['/matrix-v1/trace']}>
      <Routes>
        <Route path="/matrix-v1/trace" element={<Trace />} />
        <Route path="/matrix-v1/terminal" element={<div>Terminal</div>} />
        <Route path="/matrix-v1/portal" element={<div>Portal</div>} />
      </Routes>
    </MemoryRouter>
  );
}

test('redirects to terminal without access', async () => {
  setup(false);
  expect(await screen.findByText(/terminal/i)).toBeInTheDocument();
});

test('shows portal after countdown', async () => {
  jest.useFakeTimers();
  setup(true);
  expect(screen.getByText(/trace initiated/i)).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(await screen.findByText(/portal/i)).toBeInTheDocument();
  jest.useRealTimers();
});
