process.env.REACT_APP_MATRIX_CODE = 'thereisnospoon';

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatrixTerminal from '../components/MatrixTerminal';
import { UserProvider } from '../components/UserContext';

function setup(initialEntries = ['/the-matrix/terminal']) {
  render(
    <UserProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/the-matrix/terminal" element={<MatrixTerminal />} />
          <Route path="/the-matrix/transition" element={<div>Transition</div>} />
          <Route path="/the-matrix/portal" element={<div>Portal</div>} />
        </Routes>
      </MemoryRouter>
    </UserProvider>
  );
}

async function submitCode(code) {
  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, code);
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
}

afterEach(() => {
  localStorage.clear();
  jest.useRealTimers();
});

test('shows access denied when passcode is wrong', async () => {
  setup();
  await submitCode('wrong');
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});

test('accepts correct passcode and moves to transition', async () => {
  jest.useFakeTimers();
  setup();
  await submitCode(process.env.REACT_APP_MATRIX_CODE);
  expect(screen.getByText(/access granted/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(2500));
  expect(await screen.findByText(/transition/i)).toBeInTheDocument();
  jest.useRealTimers();
});

test('loads quote from localStorage and moves to transition', async () => {
  jest.useFakeTimers();
  localStorage.setItem('matrixAccess', 'true');
  setup();
  expect(await screen.findByText(/access granted/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(2500));
  expect(await screen.findByText(/transition/i)).toBeInTheDocument();
  jest.useRealTimers();
});

