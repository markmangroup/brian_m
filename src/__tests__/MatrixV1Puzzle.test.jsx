import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Puzzle from '../pages/matrix-v1/Puzzle';

function setup() {
  localStorage.setItem('matrixV1Access', 'true');
  render(
    <MemoryRouter initialEntries={['/matrix-v1/puzzle']}>
      <Routes>
        <Route path="/matrix-v1/puzzle" element={<Puzzle />} />
        <Route path="/matrix-v1/trace" element={<div>Trace</div>} />
      </Routes>
    </MemoryRouter>
  );
}

test('responds with a quote to thoughtful answer', async () => {
  setup();
  const input = screen.getByPlaceholderText(/your answer/i);
  await userEvent.type(input, 'no, I make my own choice');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/naoe/i)).toBeInTheDocument();
  expect(
    screen.getByText(/you've got the gift, but it looks like you're waiting/i)
  ).toBeInTheDocument();
});

test('responds with glitch to silly answer', async () => {
  setup();
  const input = screen.getByPlaceholderText(/your answer/i);
  await userEvent.type(input, 'pizza time');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/system glitch/i)).toBeInTheDocument();
  expect(screen.getByText(/you're cute. now get serious./i)).toBeInTheDocument();
});

