import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Entry from '../pages/matrix-v1/Entry';
import Terminal from '../pages/matrix-v1/Terminal';
import Transition from '../pages/matrix-v1/Transition';
import Message from '../pages/matrix-v1/Message';
import Puzzle from '../pages/matrix-v1/Puzzle';

function setup(initialEntries = ['/matrix-v1']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1" element={<Entry />} />
        <Route path="/matrix-v1/terminal" element={<Terminal />} />
        <Route path="/matrix-v1/transition" element={<Transition />} />
        <Route path="/matrix-v1/message" element={<Message />} />
        <Route path="/matrix-v1/puzzle" element={<Puzzle />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  localStorage.clear();
  Math.random.mockRestore();
  jest.useRealTimers();
});

test('MatrixV1 full flow journey', async () => {
  jest.useFakeTimers();
  setup();

  await userEvent.type(screen.getByPlaceholderText(/player name/i), 'Neo');
  await userEvent.click(screen.getByRole('button', { name: /enter/i }));
  await userEvent.click(screen.getByRole('button', { name: /red pill/i }));

  expect(await screen.findByText(/matrix terminal/i)).toBeInTheDocument();
  console.log('✅ Terminal quiz rendered');

  await userEvent.click(screen.getByRole('button', { name: 'Spoon' }));
  expect(await screen.findByText(/access granted/i)).toBeInTheDocument();

  act(() => jest.advanceTimersByTime(2000));
  expect(await screen.findByText(/booting simulated reality/i)).toBeInTheDocument();
  expect(document.querySelector('canvas')).toBeInTheDocument();
  console.log('✅ Transition progress bar completed');

  act(() => jest.advanceTimersByTime(6000));
  expect(await screen.findByText(/you've taken the first step/i)).toBeInTheDocument();
  console.log('✅ Message content displayed');

  act(() => jest.advanceTimersByTime(8000));
  await userEvent.click(screen.getByRole('button', { name: /continue the path/i }));
  expect(await screen.findByText(/do you believe in fate/i)).toBeInTheDocument();
});
