import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Transition from '../pages/matrix-v1/Transition';

function setup(initialEntries = ['/matrix-v1/transition']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/transition" element={<Transition />} />
        <Route path="/matrix-v1/message" element={<div>Message</div>} />
      </Routes>
    </MemoryRouter>
  );
}

test('auto-navigates to message after timeout', async () => {
  jest.useFakeTimers();
  localStorage.setItem('matrixV1Access', 'true');
  setup();
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(await screen.findByText(/message/i)).toBeInTheDocument();
  jest.useRealTimers();
});
