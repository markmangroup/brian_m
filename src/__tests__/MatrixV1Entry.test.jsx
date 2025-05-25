import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Entry from '../pages/matrix-v1/Entry';

function setup() {
  render(
    <MemoryRouter initialEntries={['/matrix-v1']}>
      <Routes>
        <Route path="/matrix-v1" element={<Entry />} />
        <Route path="/matrix-v1/terminal" element={<div>Terminal</div>} />
      </Routes>
    </MemoryRouter>
  );
}

test('red pill navigates to terminal', async () => {
  setup();
  await userEvent.type(screen.getByPlaceholderText(/player name/i), 'neo');
  await userEvent.click(screen.getByRole('button', { name: /enter/i }));
  await userEvent.click(screen.getByRole('button', { name: /red pill/i }));
  expect(await screen.findByText(/terminal/i)).toBeInTheDocument();
});
