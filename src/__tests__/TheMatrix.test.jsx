import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TheMatrix from '../components/TheMatrix';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// helper to enter the matrix by submitting a name
async function enterMatrix(name = 'Neo') {
  render(
    <MemoryRouter initialEntries={["/the-matrix"]}>
      <Routes>
        <Route path="/the-matrix" element={<TheMatrix />} />
        <Route path="/the-matrix/terminal" element={<div>Matrix Terminal</div>} />
      </Routes>
    </MemoryRouter>
  );
  const input = screen.getByPlaceholderText(/player name/i);
  await userEvent.type(input, name);
  await userEvent.click(screen.getByRole('button', { name: /enter/i }));
}

test('pill buttons appear and change state when clicked', async () => {
  await enterMatrix();

  // pills should be visible after entering name
  const redButton = await screen.findByRole('button', { name: /red pill/i });
  const blueButton = screen.getByRole('button', { name: /blue pill/i });
  expect(redButton).toBeInTheDocument();
  expect(blueButton).toBeInTheDocument();

  // clicking red pill navigates to the terminal
  await userEvent.click(redButton);
  expect(await screen.findByText(/matrix terminal/i)).toBeInTheDocument();
});

