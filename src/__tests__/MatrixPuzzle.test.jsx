import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatrixPuzzle from '../components/MatrixPuzzle';

test('navigates to /portal after solving puzzle', async () => {
  jest.useFakeTimers();
  render(
    <MemoryRouter initialEntries={["/the-matrix/puzzle"]}>
      <Routes>
        <Route path="/the-matrix/puzzle" element={<MatrixPuzzle />} />
        <Route path="/portal" element={<div>Portal Page</div>} />
      </Routes>
    </MemoryRouter>
  );
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'red');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await act(async () => {
    jest.advanceTimersByTime(1000);
  });

  expect(await screen.findByText(/portal page/i)).toBeInTheDocument();
  jest.useRealTimers();
});
