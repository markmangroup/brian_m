import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EchoLoop from '../components/EchoLoop';
import EchoVerify from '../components/EchoVerify';

function setup(initialEntries = ['/matrix-v1/echo-loop']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/echo-loop" element={<EchoLoop />} />
        <Route path="/matrix-v1/echo-verify" element={<EchoVerify />} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  jest.useRealTimers();
});

test('option A navigates to verify screen', async () => {
  jest.useFakeTimers();
  setup();
  await userEvent.click(screen.getByRole('button', { name: /option a/i }));
  act(() => jest.advanceTimersByTime(500));
  expect(await screen.findByText(/diagnostic confirmed/i)).toBeInTheDocument();
});

test('option B triggers shake effect', async () => {
  setup();
  await userEvent.click(screen.getByRole('button', { name: /option b/i }));
  const container = screen.getByText(/choose your path/i).parentElement.parentElement;
  expect(container.className).toMatch(/shake/);
});

test('option C shows error then resets', async () => {
  jest.useFakeTimers();
  setup();
  await userEvent.click(screen.getByRole('button', { name: /option c/i }));
  expect(screen.getByText(/error/i)).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(800));
  expect(screen.queryByText(/error/i)).toBeNull();
});
