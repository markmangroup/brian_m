import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import QualityDashboard from '../pages/matrix-v1/QualityDashboard';

test('missing summary filter toggles node results', async () => {
  render(
    <MemoryRouter>
      <QualityDashboard />
    </MemoryRouter>
  );
  const statusText = await screen.findByText(/Showing/);
  const initial = statusText.textContent;
  const checkbox = screen.getByLabelText(/Show nodes missing summaries/i);
  await userEvent.click(checkbox);
  const afterClick = await screen.findByText(/Showing/);
  expect(afterClick.textContent).not.toEqual(initial);
});
