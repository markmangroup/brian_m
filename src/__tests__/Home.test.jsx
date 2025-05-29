import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';
import { UserProvider } from '../components/UserContext';

test('displays links to main features', () => {
  render(
    <UserProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </UserProvider>
  );

  expect(screen.getByRole('link', { name: /trail/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /pixel lab/i })).toBeInTheDocument();
});
