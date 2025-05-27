import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatrixTransition from '../components/MatrixTransition';
import { UserProvider } from '../components/UserContext';

function setup(initialEntries = ['/the-matrix/transition']) {
  render(
    <UserProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/the-matrix/transition" element={<MatrixTransition />} />
          <Route path="/the-matrix/portal" element={<div>Portal</div>} />
        </Routes>
      </MemoryRouter>
    </UserProvider>
  );
}

test('navigates to the portal after timeout', async () => {
  jest.useFakeTimers();
  setup();
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(await screen.findByText(/portal/i)).toBeInTheDocument();
  jest.useRealTimers();
});
