import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import QualityDashboard from '../pages/matrix-v1/QualityDashboard';

// Simple smoke test for the view modal metadata

test('opens view modal showing node metadata', async () => {
  render(
    <MemoryRouter>
      <QualityDashboard />
    </MemoryRouter>
  );
  const detailsButton = await screen.findByRole('button', { name: /details/i });
  await userEvent.click(detailsButton);
  expect(await screen.findByText(/narrative tier/i)).toBeInTheDocument();
  expect(screen.getByText(/world:/i)).toBeInTheDocument();
  expect(screen.getByText(/updated:/i)).toBeInTheDocument();
});
