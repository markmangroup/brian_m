import { render, screen } from '@testing-library/react';
import ResourcePanel from '../components/ResourcePanel';

it('renders title and children', () => {
  render(
    <ResourcePanel title="Resources">
      <p>Item A</p>
      <p>Item B</p>
    </ResourcePanel>
  );
  expect(screen.getByText('Resources')).toBeInTheDocument();
  expect(screen.getByText('Item A')).toBeInTheDocument();
  expect(screen.getByText('Item B')).toBeInTheDocument();
});

it('applies custom className', () => {
  const { container } = render(
    <ResourcePanel title="Test" className="custom-class">
      <span>hi</span>
    </ResourcePanel>
  );
  expect(container.firstChild).toHaveClass('custom-class');
});
