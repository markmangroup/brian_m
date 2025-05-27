import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Checkpoint from '../pages/matrix-v1/Checkpoint';

function setup(initialEntries = ['/matrix-v1/checkpoint']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/checkpoint" element={<Checkpoint />} />
        <Route path="/matrix-v1/message" element={<div>Message</div>} />
        <Route path="/matrix-v1" element={<div>Entry</div>} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  localStorage.clear();
});

test('redirects to entry if no matrixV1Access', () => {
  setup();
  expect(screen.getByText(/entry/i)).toBeInTheDocument();
});

test('shows checkpoint message and proceed button', () => {
  localStorage.setItem('matrixV1Access', 'true');
  setup();
  expect(screen.getByText(/alignment complete/i)).toBeInTheDocument();
  expect(screen.getByText(/gateway stabilizes/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /proceed/i })).toBeInTheDocument();
});

test('navigates to message when proceed is clicked', async () => {
  localStorage.setItem('matrixV1Access', 'true');
  setup();
  await userEvent.click(screen.getByRole('button', { name: /proceed/i }));
  expect(screen.getByText(/message/i)).toBeInTheDocument();
}); 