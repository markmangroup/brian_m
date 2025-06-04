import { render, screen } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar';

it('renders progress bar with correct width and label', () => {
  const { container } = render(
    <ProgressBar value={50} max={100} color="bg-red-500" label="Halfway" />
  );
  const bar = container.querySelector('.bg-red-500');
  expect(bar).toBeInTheDocument();
  expect(bar.style.width).toBe('50%');
  expect(screen.getByText('Halfway')).toBeInTheDocument();
});

it('calculates width based on max prop', () => {
  const { container } = render(
    <ProgressBar value={25} max={50} color="bg-blue-500" />
  );
  const bar = container.querySelector('.bg-blue-500');
  expect(bar.style.width).toBe('50%');
});
