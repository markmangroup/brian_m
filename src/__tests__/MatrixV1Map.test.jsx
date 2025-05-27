import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Map from '../pages/matrix-v1/Map';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ text: () => Promise.resolve('graph TD;') })
  );
});

afterEach(() => {
  global.fetch = originalFetch;
});

function setup(initialEntries = ['/matrix-v1/map']) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/matrix-v1/map" element={<Map />} />
      </Routes>
    </MemoryRouter>
  );
}

test('renders matrix story map heading', () => {
  setup();
  expect(screen.getByRole('heading', { name: /matrix story map/i })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalled();
});
