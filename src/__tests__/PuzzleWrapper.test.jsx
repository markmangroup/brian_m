import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PuzzleWrapper from '../components/PuzzleWrapper';

function setupCallback() {
  const onSuccess = jest.fn();
  render(
    <MemoryRouter>
      <PuzzleWrapper title="Puzzle" sequenceLength={1} testSequence={[0]} onSuccess={onSuccess} />
    </MemoryRouter>
  );
  return onSuccess;
}

test('calls onSuccess callback after solving', () => {
  jest.useFakeTimers();
  const cb = setupCallback();
  act(() => {
    jest.advanceTimersByTime(1500);
  });
  userEvent.click(screen.getByRole('button', { name: /square-0/i }));
  expect(cb).toHaveBeenCalled();
});

function setupRoute() {
  render(
    <MemoryRouter initialEntries={['/puzzle']}>
      <Routes>
        <Route path="/puzzle" element={<PuzzleWrapper title="Route" sequenceLength={1} testSequence={[0]} onSuccess="/done" />} />
        <Route path="/done" element={<div>Done</div>} />
      </Routes>
    </MemoryRouter>
  );
}

test('navigates to route on success', () => {
  jest.useFakeTimers();
  setupRoute();
  act(() => {
    jest.advanceTimersByTime(1500);
  });
  userEvent.click(screen.getByRole('button', { name: /square-0/i }));
  expect(screen.getByText(/done/i)).toBeInTheDocument();
});

test('shows try again on wrong input', () => {
  jest.useFakeTimers();
  render(
    <MemoryRouter>
      <PuzzleWrapper title="Puzzle" sequenceLength={1} testSequence={[1]} />
    </MemoryRouter>
  );
  act(() => {
    jest.advanceTimersByTime(1500);
  });
  userEvent.click(screen.getByRole('button', { name: /square-0/i }));
  expect(screen.getByText(/try again/i)).toBeInTheDocument();
});
