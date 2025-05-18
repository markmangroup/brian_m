import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatrixTerminal from '../components/MatrixTerminal';
import MatrixTransition from '../components/MatrixTransition';

// helper to submit passcode within router
async function submitCode(code) {
  render(
    <MemoryRouter initialEntries={["/matrix-terminal"]}>
      <Routes>
        <Route path="/matrix-terminal" element={<MatrixTerminal />} />
        <Route path="/matrix-transition" element={<MatrixTransition />} />
      </Routes>
    </MemoryRouter>
  );
  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, code);
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
}

test('navigates to transition screen on correct passcode', async () => {
  await submitCode('thereisnospoon');
  const quote = await screen.findByText(/Naoe/, {}, { timeout: 5000 });
  expect(quote).toBeInTheDocument();
});

test('shows access denied when passcode is wrong', async () => {
  await submitCode('wrong');
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});
