import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Terminal from '../pages/matrix-v1/Terminal';

function setup(initialEntries = ['/matrix-v1/terminal']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/terminal" element={<Terminal />} />
        <Route path="/matrix-v1/transition" element={<div>Transition</div>} />
      </Routes>
    </MemoryRouter>
  );
}

async function submit(code) {
  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, code);
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
}

afterEach(() => {
  localStorage.clear();
  jest.useRealTimers();
});

test('shows access denied with wrong code', async () => {
  setup();
  await submit('wrong');
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});

test('accepts code and navigates to transition', async () => {
  jest.useFakeTimers();
  setup();
  await submit('thereisnospoon');
  expect(screen.getByText(/access granted/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(2500));
  expect(await screen.findByText(/transition/i)).toBeInTheDocument();
  jest.useRealTimers();
});

test('shows agent after three failed attempts', async () => {
  setup();
  await submit('wrong1');
  await submit('wrong2');
  await submit('wrong3');
  expect(screen.getByText(/agent echo/i)).toBeInTheDocument();
  expect(screen.getByText(/not supposed to be here/i)).toBeInTheDocument();
});

