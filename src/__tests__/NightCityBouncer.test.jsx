import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NightCityBouncer from '../pages/matrix-v1/NightCityBouncer';
import NightCityNetdiver from '../pages/matrix-v1/NightCityNetdiver';

function setup() {
  render(
    <MemoryRouter initialEntries={['/matrix-v1/night-city/bouncer']}>
      <Routes>
        <Route path="/matrix-v1/night-city/bouncer" element={<NightCityBouncer />} />
        <Route path="/matrix-v1/night-city/netdiver" element={<NightCityNetdiver />} />
      </Routes>
    </MemoryRouter>
  );
}

test('access granted proceeds to netdiver', async () => {
  jest.useFakeTimers();
  setup();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  await userEvent.click(screen.getByRole('button', { name: /offer data chip/i }));
  expect(await screen.findByText(/access granted/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /enter the afterlife/i }));
  expect(await screen.findByText(/netrunner dive/i)).toBeInTheDocument();
  jest.useRealTimers();
});
