import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DiagnosticOverlay from '../pages/matrix-v1/DiagnosticOverlay';
import { ThemeProvider } from '../theme/ThemeContext';
import { realMatrixNodes } from '../pages/matrix-v1/realMatrixFlow';

const Wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

test('opens and closes diagnostic overlay', () => {
  render(
    <Wrapper>
      <DiagnosticOverlay nodes={realMatrixNodes} />
    </Wrapper>
  );
  const toggle = screen.getByRole('button', { name: /diag/i });
  expect(toggle).toBeInTheDocument();
  // initially closed
  expect(screen.queryByText(/total:/i)).toBeNull();
  userEvent.click(toggle);
  expect(screen.getByText(/total:/i)).toBeInTheDocument();
  userEvent.click(toggle);
  expect(screen.queryByText(/total:/i)).toBeNull();
});
