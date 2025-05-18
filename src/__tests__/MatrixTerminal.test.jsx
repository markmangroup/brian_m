import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MatrixTerminal from '../components/MatrixTerminal';

afterEach(() => {
  localStorage.clear();
});

// helper to submit passcode
async function submitCode(code) {
  render(<MatrixTerminal />);
  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, code);
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
}

test('shows a Naoe quote when passcode is correct', async () => {
  await submitCode('thereisnospoon');
  const message = await screen.findByText(/access granted/i);
  expect(message.textContent).toMatch(/— Naoe/);
});

test('shows access denied when passcode is wrong', async () => {
  await submitCode('wrong');
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});

test('shows quote automatically when access stored in localStorage', async () => {
  localStorage.setItem('matrixAccess', 'true');
  render(<MatrixTerminal />);
  const message = await screen.findByText(/access granted/i);
  expect(message.textContent).toMatch(/— Naoe/);
});
