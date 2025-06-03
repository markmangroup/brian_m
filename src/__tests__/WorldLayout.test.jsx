import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../theme/ThemeContext';
import WorldLayout from '../components/WorldLayout';
import { themes } from '../theme/themes';

const Wrapper = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

test('renders children with world background', () => {
  const { container } = render(
    <Wrapper>
      <WorldLayout>
        <div>World Content</div>
      </WorldLayout>
    </Wrapper>
  );

  expect(screen.getByText('World Content')).toBeInTheDocument();
  expect(container.firstChild).toHaveStyle(`background: ${themes.matrix.background}`);
});
