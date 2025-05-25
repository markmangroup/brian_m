import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TheMatrix from '../components/TheMatrix';
import MatrixTerminal from '../components/MatrixTerminal';
import { UserProvider } from '../components/UserContext';


function setup() {
  render(
    <UserProvider>
      <MemoryRouter initialEntries={["/the-matrix"]}>
        <Routes>
          <Route path="/the-matrix" element={<TheMatrix />} />
          <Route path="/the-matrix/terminal" element={<MatrixTerminal />} />
        </Routes>
      </MemoryRouter>
    </UserProvider>
  );
}

async function enterName(name = 'Neo') {
  await userEvent.type(screen.getByPlaceholderText(/player name/i), name);
  await userEvent.click(screen.getByRole('button', { name: /enter/i }));
}

test('choosing the red pill navigates to the terminal', async () => {
  jest.useFakeTimers();
  setup();
  await enterName();

  // advance through the story
  for (let i = 0; i < 4; i++) {
    act(() => jest.runOnlyPendingTimers());
    await userEvent.click(await screen.findByRole('button', { name: /next/i }));
  }

  act(() => jest.runOnlyPendingTimers());
  const red = await screen.findByRole('button', { name: /red pill/i });
  await userEvent.click(red);

  expect(await screen.findByText(/matrix terminal/i)).toBeInTheDocument();
  jest.useRealTimers();
});
