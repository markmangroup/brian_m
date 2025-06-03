import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NodeEditor from '../pages/matrix-v1/NodeEditor';

function setup() {
  render(
    <MemoryRouter initialEntries={['/matrix-v1/node-editor']}>
      <Routes>
        <Route path="/matrix-v1/node-editor" element={<NodeEditor />} />
      </Routes>
    </MemoryRouter>
  );
}

test('renders node editor heading', () => {
  setup();
  expect(screen.getByRole('heading', { name: /node editor/i })).toBeInTheDocument();
});
