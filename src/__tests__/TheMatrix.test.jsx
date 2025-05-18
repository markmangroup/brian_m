import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TheMatrix from '../components/TheMatrix';

// helper to enter the matrix by submitting a name
async function enterMatrix(name = 'Neo') {
  render(<TheMatrix />);
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

  // clicking red pill hides the buttons and shows red pill text
  await userEvent.click(redButton);
  expect(screen.getByText(/you take the red pill/i)).toBeInTheDocument();
});

