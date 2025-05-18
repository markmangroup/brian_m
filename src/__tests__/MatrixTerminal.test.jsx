import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MatrixTerminal from '../components/MatrixTerminal';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// helper to render component within a router
function renderWithRouter() {
  render(
    <MemoryRouter initialEntries={["/matrix-terminal"]}>
      <Routes>
        <Route path="/matrix-terminal" element={<MatrixTerminal />} />
        <Route path="/matrix-transition" element={<div>Transition Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

// helper to submit passcode
async function submitCode(code) {
  renderWithRouter();
  const input = screen.getByPlaceholderText(/enter passcode/i);
  await userEvent.type(input, code);
  await userEvent.click(screen.getByRole('button', { name: /hack/i }));
}

test('navigates to transition page when passcode is correct', async () => {
  await submitCode('thereisnospoon');
  expect(await screen.findByText(/transition page/i)).toBeInTheDocument();
});

test('shows access denied when passcode is wrong', async () => {
  await submitCode('wrong');
  expect(screen.getByText(/access denied/i)).toBeInTheDocument();
});
