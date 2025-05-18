import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TheMatrix from '../components/TheMatrix';


function setup() {
  render(
    <MemoryRouter initialEntries={["/the-matrix"]}>
      <Routes>
        <Route path="/the-matrix" element={<TheMatrix />} />

      </Routes>
    </MemoryRouter>
  );
}

async function enterName(name = 'Neo') {
  await userEvent.type(screen.getByPlaceholderText(/player name/i), name);
  await userEvent.click(screen.getByRole('button', { name: /enter/i }));
}

test('choosing the red pill navigates to the terminal', async () => {
  setup();
  await enterName();

  const red = await screen.findByRole('button', { name: /red pill/i });
  await userEvent.click(red);

  expect(await screen.findByText(/matrix terminal/i)).toBeInTheDocument();
});
