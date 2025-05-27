import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Factions from '../pages/matrix-v1/Factions';
import Align from '../pages/matrix-v1/Align';

function setup() {
  render(
    <MemoryRouter initialEntries={['/matrix-v1/factions']}>
      <Routes>
        <Route path="/matrix-v1/factions" element={<Factions />} />
        <Route path="/matrix-v1/align-:slug" element={<Align />} />
      </Routes>
    </MemoryRouter>
  );
}

test('selecting a faction navigates to align page', async () => {
  setup();
  await userEvent.click(screen.getByLabelText(/select signal brokers/i));
  expect(await screen.findByText(/aligned with signal brokers/i)).toBeInTheDocument();
});
