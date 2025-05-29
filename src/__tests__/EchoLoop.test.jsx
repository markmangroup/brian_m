import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EchoLoop from '../components/EchoLoop';
import EchoVerify from '../components/EchoVerify';

function setup(initialEntries = ['/echo-loop']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/echo-loop" element={<EchoLoop />} />
        <Route path="/echo-verify" element={<EchoVerify />} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  localStorage.clear();
  jest.useRealTimers();
});

test('option A navigates to verify and stores flag', async () => {
  jest.useFakeTimers();
  setup();
  await userEvent.click(screen.getByRole('button', { name: /option a/i }));
  expect(localStorage.getItem('echoSuccess')).toBe('true');
  act(() => jest.advanceTimersByTime(500));
  expect(await screen.findByText(/verification complete/i)).toBeInTheDocument();
});

test('option B triggers shake effect', async () => {
  setup();
  await userEvent.click(screen.getByRole('button', { name: /option b/i }));
  const container = screen.getByText(/choose your path/i).parentElement.parentElement;
  expect(container.className).toMatch(/animate-shake/);
});

test('option C shows error then resets', async () => {
  jest.useFakeTimers();
  setup();
  await userEvent.click(screen.getByRole('button', { name: /option c/i }));
  expect(screen.getByText(/error/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(800));
  expect(screen.queryByText(/error/i)).toBeNull();
});
