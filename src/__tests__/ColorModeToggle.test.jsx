import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColorModeToggle from '../components/ColorModeToggle';
import { ColorModeProvider } from '../theme/ColorModeContext';

function setup() {
  render(
    <ColorModeProvider>
      <ColorModeToggle />
    </ColorModeProvider>
  );
}

test('toggles light and dark modes', async () => {
  setup();
  const button = screen.getByRole('button', { name: /toggle dark mode/i });
  expect(document.documentElement.getAttribute('data-color-mode')).toBe('dark');
  await userEvent.click(button);
  expect(document.documentElement.getAttribute('data-color-mode')).toBe('light');
});
