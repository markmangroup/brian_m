import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MatrixPortal from '../components/MatrixPortal';

// basic smoke test
it('displays links to main features', () => {
  render(
    <MemoryRouter>
      <MatrixPortal />
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: /trail/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /pixel lab/i })).toBeInTheDocument();
});
