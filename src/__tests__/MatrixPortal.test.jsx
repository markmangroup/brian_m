import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MatrixPortal from '../components/MatrixPortal';
import { UserProvider } from '../components/UserContext';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ text: () => Promise.resolve('graph TD;') })
  );
});

afterEach(() => {
  global.fetch = originalFetch;
});

// basic smoke test
it('displays links to main features', () => {
  render(
    <UserProvider>
      <MemoryRouter>
        <MatrixPortal />
      </MemoryRouter>
    </UserProvider>
  );

  expect(screen.getByRole('link', { name: /trail/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /pixel lab/i })).toBeInTheDocument();
});
