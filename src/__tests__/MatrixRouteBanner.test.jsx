import { render, screen } from '@testing-library/react';
import MatrixRouteBanner from '../components/MatrixRouteBanner';

it('renders title, subtitle, status and icon', () => {
  render(
    <MatrixRouteBanner
      title="Sync"
      subtitle="System Link Active"
      status="🛠 in progress"
      icon="🛡️"
    />
  );

  expect(screen.getByText(/sync/i)).toBeInTheDocument();
  expect(screen.getByText(/system link active/i)).toBeInTheDocument();
  expect(screen.getByText(/🛠 in progress/)).toBeInTheDocument();
  expect(screen.getByText('🛡️')).toBeInTheDocument();
});
