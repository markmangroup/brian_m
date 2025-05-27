import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Message from '../pages/matrix-v1/Message';

function setup(initialEntries = ['/matrix-v1/message']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/message" element={<Message />} />
        <Route path="/matrix-v1/puzzle" element={<div>Puzzle</div>} />
        <Route path="/matrix-v1" element={<div>Entry</div>} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  localStorage.clear();
  jest.useRealTimers();
});

test('redirects to entry if no matrixV1Access', () => {
  setup();
  expect(screen.getByText(/entry/i)).toBeInTheDocument();
});

test('shows first message and progress indicator', () => {
  localStorage.setItem('matrixV1Access', 'true');
  setup();
  expect(screen.getByText(/the matrix is a system/i)).toBeInTheDocument();
  expect(screen.getByText(/message 1 of 6/i)).toBeInTheDocument();
});

test('shows next button after message is done', async () => {
  localStorage.setItem('matrixV1Access', 'true');
  setup();
  // Wait for typewriter effect to complete
  await act(async () => {
    jest.advanceTimersByTime(2000);
  });
  expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
});

test('navigates through all messages and to puzzle', async () => {
  localStorage.setItem('matrixV1Access', 'true');
  setup();
  
  // Wait for first message to complete
  await act(async () => {
    jest.advanceTimersByTime(2000);
  });

  // Click through all messages
  for (let i = 0; i < 5; i++) {
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    await act(async () => {
      jest.advanceTimersByTime(2000);
    });
  }

  // Click final continue button
  await userEvent.click(screen.getByRole('button', { name: /continue/i }));
  expect(screen.getByText(/puzzle/i)).toBeInTheDocument();
});
