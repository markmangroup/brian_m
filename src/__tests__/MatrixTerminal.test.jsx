import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatrixTerminal from '../components/MatrixTerminal';



async function submitCode(code) {

  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, code);
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
}


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
