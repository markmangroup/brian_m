import { render, screen } from '@testing-library/react';
import MatrixRouteBanner from '../components/MatrixRouteBanner';

test('renders title, subtitle, and status', () => {
  render(<MatrixRouteBanner title="Title" subtitle="Sub" status="Active" />);
  expect(screen.getByText(/Title/)).toBeInTheDocument();
  expect(screen.getByText(/Sub/)).toBeInTheDocument();
  expect(screen.getByText(/Active/)).toBeInTheDocument();
});
