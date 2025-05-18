import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatrixTerminal from '../components/MatrixTerminal';
import MatrixTransition from '../components/MatrixTransition';

function setup() {
  return render(
    <MemoryRouter initialEntries={['/the-matrix/terminal']}>
      <Routes>
        <Route path="/the-matrix/terminal" element={<MatrixTerminal />} />
        <Route path="/matrix-transition" element={<MatrixTransition />} />
      </Routes>
    </MemoryRouter>
  );
}

test('navigates to MatrixTransition on correct passcode', async () => {
  jest.useFakeTimers();
  setup();
  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, 'thereisnospoon');
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
  jest.runAllTimers();
  expect(await screen.findByText(/booting simulated reality/i)).toBeInTheDocument();
  jest.useRealTimers();
});

test('shows access denied when passcode is wrong', async () => {
  setup();
  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, 'wrong');
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});

test('shows quote automatically when access stored in localStorage', async () => {
  localStorage.setItem('matrixAccess', 'true');
  render(<MatrixTerminal />, { wrapper: MemoryRouter });
  const message = await screen.findByText(/access granted/i);
  expect(message.textContent).toMatch(/Naoe/);
});
