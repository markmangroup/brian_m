import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Terminal from '../pages/matrix-v1/Terminal';

function setup(initialEntries = ['/matrix-v1/terminal']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/terminal" element={<Terminal />} />
        <Route path="/matrix-v1/transition" element={<div>Transition</div>} />
      </Routes>
    </MemoryRouter>
  );
}
async function choose(answer) {
  await userEvent.click(screen.getByRole('button', { name: answer }));
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
  await choose('Door');
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});

test('accepts answer and navigates to transition', async () => {
  jest.useFakeTimers();
  setup();
  await choose('Spoon');
  expect(screen.getByText(/access granted/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(2000));
  expect(await screen.findByText(/transition/i)).toBeInTheDocument();
  jest.useRealTimers();
});

test('shows agent after three failed attempts', async () => {
  setup();
  await choose('Door');
  await choose('Door');
  await choose('Door');
  expect(screen.getByText(/agent echo/i)).toBeInTheDocument();
  expect(screen.getByText(/not supposed to be here/i)).toBeInTheDocument();
});

