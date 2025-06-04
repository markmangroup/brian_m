import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AfterlifeAccessGranted from '../pages/matrix-v1/night-city/AfterlifeAccessGranted';
import AfterlifeInterior from '../pages/matrix-v1/night-city/AfterlifeInterior';

test('CTA navigates to Afterlife interior', async () => {
  render(
    <MemoryRouter initialEntries={['/matrix-v1/night-city/afterlife-access-granted']}>
      <Routes>
        <Route path="/matrix-v1/night-city/afterlife-access-granted" element={<AfterlifeAccessGranted />} />
        <Route path="/matrix-v1/night-city/afterlife-interior" element={<AfterlifeInterior />} />
      </Routes>
    </MemoryRouter>
  );

  await userEvent.click(screen.getByRole('link', { name: /enter the afterlife/i }));
  expect(await screen.findByText(/afterlife interior/i)).toBeInTheDocument();
});
