import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Basic test to ensure world background class is applied

test('applies matrix world background by default', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.world-background-matrix')).toBeInTheDocument();
});
