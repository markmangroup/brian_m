import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatrixTerminal from '../components/MatrixTerminal';
import MatrixPuzzle from '../components/MatrixPuzzle';

function setup(initialEntries = ['/the-matrix/terminal']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/the-matrix/terminal" element={<MatrixTerminal />} />
        <Route path="/the-matrix/puzzle" element={<MatrixPuzzle />} />
        <Route path="/portal" element={<div>Portal</div>} />
      </Routes>
    </MemoryRouter>
  );
}

async function submitCode(code) {
  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, code);
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
}

test('shows access denied when passcode is wrong', async () => {
  setup();
  await submitCode('wrong');
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});

test('accepts correct passcode and moves to puzzle', async () => {
  jest.useFakeTimers();
  setup();
  await submitCode('thereisnospoon');
  expect(screen.getByText(/access granted/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(2500));
  expect(await screen.findByText(/answer this to prove you are the one/i)).toBeInTheDocument();
  jest.useRealTimers();
});

test('loads quote from localStorage and moves to puzzle', async () => {
  jest.useFakeTimers();
  localStorage.setItem('matrixAccess', 'true');
  setup();
  expect(await screen.findByText(/access granted/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(2500));
  expect(await screen.findByText(/answer this to prove you are the one/i)).toBeInTheDocument();
  jest.useRealTimers();
});

test('solving the puzzle navigates to the portal', async () => {
  jest.useFakeTimers();
  setup(['/the-matrix/puzzle']);
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'red');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(await screen.findByText(/correct!/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1000));
  expect(await screen.findByText(/portal/i)).toBeInTheDocument();
  jest.useRealTimers();
});
