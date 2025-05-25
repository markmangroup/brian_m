import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Updates from '../components/Updates';
import { ANNOUNCEMENTS } from '../data/announcements';

test('displays announcement titles', () => {
  render(<Updates />);
  ANNOUNCEMENTS.forEach(a => {
    expect(screen.getByText(a.title)).toBeInTheDocument();
  });
});

test('expands and collapses an announcement', async () => {
  render(<Updates />);
  const first = screen.getByText(ANNOUNCEMENTS[0].title);
  await userEvent.click(first);
  expect(screen.getByText(ANNOUNCEMENTS[0].message)).toBeInTheDocument();
  await userEvent.click(first);
  expect(screen.queryByText(ANNOUNCEMENTS[0].message)).toBeNull();
});
