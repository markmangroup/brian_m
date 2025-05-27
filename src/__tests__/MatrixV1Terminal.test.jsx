import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Terminal from '../pages/matrix-v1/Terminal';

function setup(initialEntries = ['/matrix-v1/terminal']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/terminal" element={<Terminal />} />
        <Route path="/matrix-v1/checkpoint" element={<div>Checkpoint</div>} />
      </Routes>
    </MemoryRouter>
  );
}

async function selectAnswer(answer) {
  const button = screen.getByRole('button', { name: answer });
  await userEvent.click(button);
}

beforeEach(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  localStorage.clear();
  jest.useRealTimers();
  Math.random.mockRestore();
});

test('shows access denied with wrong answer', async () => {
  setup();
  await selectAnswer('Door');
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});

test('accepts correct answer and navigates to checkpoint', async () => {
  jest.useFakeTimers();
  setup();
  await selectAnswer('Spoon');
  expect(screen.getByText(/access granted/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(2000));
  expect(await screen.findByText(/checkpoint/i)).toBeInTheDocument();
  jest.useRealTimers();
});

test('shows agent after three failed attempts', async () => {
  setup();
  await selectAnswer('Door');
  await selectAnswer('Exit');
  await selectAnswer('Escape');
  expect(screen.getByText(/agent echo/i)).toBeInTheDocument();
  expect(screen.getByText(/not the one/i)).toBeInTheDocument();
});

