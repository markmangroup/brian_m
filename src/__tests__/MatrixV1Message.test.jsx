import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Message from '../pages/matrix-v1/Message';

function setup(hasAccess = false) {
  if (hasAccess) localStorage.setItem('matrixV1Access', 'true');
  render(
    <MemoryRouter initialEntries={['/matrix-v1/message']}>
      <Routes>
        <Route path="/matrix-v1/message" element={<Message />} />
        <Route path="/matrix-v1/terminal" element={<div>Terminal</div>} />
      </Routes>
    </MemoryRouter>
  );
}

test('redirects to terminal without access', async () => {
  setup(false);
  expect(await screen.findByText(/terminal/i)).toBeInTheDocument();
});

test('shows message with access', async () => {
  setup(true);
  expect(await screen.findByText(/first step/i)).toBeInTheDocument();
});
