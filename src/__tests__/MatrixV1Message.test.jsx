import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Message from '../pages/matrix-v1/Message';

function setup(initialEntries = ['/matrix-v1/message']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/message" element={<Message />} />
        <Route path="/matrix-v1/stage-1" element={<div>Stage1</div>} />
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

test('shows next button immediately', () => {
  localStorage.setItem('matrixV1Access', 'true');
  setup();
  expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
});

test('navigates through all messages and to stage1', async () => {
  localStorage.setItem('matrixV1Access', 'true');
  setup();

  // Click through all messages without waiting
  for (let i = 0; i < 5; i++) {
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
  }

  // Click final continue button
  await userEvent.click(screen.getByRole('button', { name: /continue/i }));
  expect(screen.getByText(/stage1/i)).toBeInTheDocument();
});
