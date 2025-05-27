import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

it('renders breadcrumbs for nested path', () => {
  render(
    <MemoryRouter initialEntries={[ '/the-matrix/terminal' ]}>
      <Breadcrumbs />
    </MemoryRouter>
  );

  expect(screen.getByText(/the matrix/i)).toBeInTheDocument();
  expect(screen.getByText(/terminal/i)).toBeInTheDocument();
});
