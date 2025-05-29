import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import GuardianCall from '../pages/matrix-v1/GuardianCall';

function setup(access = true, seq = [0, 1]) {
  if (access) localStorage.setItem('matrixV1Access', 'true');
  render(
    <MemoryRouter initialEntries={['/matrix-v1/guardian-call']}>
      <Routes>
        <Route path="/matrix-v1/guardian-call" element={<GuardianCall testSequence={seq} />} />
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

test('shows success after correct input', () => {
  jest.useFakeTimers();
  setup(true, [0]);
  act(() => {
    jest.advanceTimersByTime(1500);
  });
  userEvent.click(screen.getByRole('button', { name: /square-0/i }));
  expect(screen.getByText(/guardian synchronized/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /retry synchronization/i })).toBeInTheDocument();
});

test('shows try again on wrong input', () => {
  jest.useFakeTimers();
  setup(true, [1]);
  act(() => {
    jest.advanceTimersByTime(1500);
  });
  userEvent.click(screen.getByRole('button', { name: /square-0/i }));
  expect(screen.getByText(/try again/i)).toBeInTheDocument();
});
