import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import GuardianCall from '../pages/matrix-v1/GuardianCall';

function setup() {
  render(
    <MemoryRouter initialEntries={['/matrix-v1/guardian-call']}>
      <Routes>
        <Route path="/matrix-v1/guardian-call" element={<GuardianCall />} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  localStorage.clear();
  if (Math.random.mockRestore) Math.random.mockRestore();
});

test('shows already linked message when flag set', () => {
  localStorage.setItem('guardianLinked', 'true');
  setup();
  expect(screen.getByText(/already linked/i)).toBeInTheDocument();
});

test('offers retry after incorrect selection', async () => {
  jest.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0.2);
  setup();
  const cells = screen.getAllByRole('button');
  await userEvent.click(cells[2]);
  await userEvent.click(cells[3]);
  expect(await screen.findByRole('button', { name: /retry sync/i })).toBeInTheDocument();
});
