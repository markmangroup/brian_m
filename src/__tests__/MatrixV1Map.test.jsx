import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Map from '../pages/matrix-v1/Map';

afterEach(() => {
  localStorage.clear();
});

function setup(initialEntries = ['/matrix-v1/map']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/map" element={<Map />} />
      </Routes>
    </MemoryRouter>
  );
}

test('highlights current node from localStorage', () => {
  localStorage.setItem('currentNodeId', 'start');
  setup();
  expect(document.querySelector('.matrix-glow-green')).toBeInTheDocument();
});

test('toggles dev view legend', async () => {
  setup();
  const button = screen.getByRole('button', { name: /dev view/i });
  expect(screen.queryByText(/legend/i)).not.toBeInTheDocument();
  await userEvent.click(button);
  expect(screen.getByText(/legend/i)).toBeInTheDocument();
});
