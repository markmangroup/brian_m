import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EchoVerify from '../components/EchoVerify';

test('renders verification message', () => {
  render(
    <MemoryRouter>
      <EchoVerify />
    </MemoryRouter>
  );
  expect(screen.getByText(/diagnostic confirmed/i)).toBeInTheDocument();
  expect(screen.getByText(/system integrity verified/i)).toBeInTheDocument();
});
