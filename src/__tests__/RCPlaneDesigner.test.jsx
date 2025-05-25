import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RCPlaneDesigner from '../components/RCPlaneDesigner';
import Navigation from '../components/Navigation';

function setup(path = '/rc-plane') {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Navigation />
      <Routes>
        <Route path="/rc-plane" element={<RCPlaneDesigner />} />
      </Routes>
    </MemoryRouter>
  );
}

test('renders RC Plane Designer heading', () => {
  setup();
  expect(screen.getByRole('heading', { name: /rc plane designer/i })).toBeInTheDocument();
});

test('navigation has RC Plane link', () => {
  setup();
  expect(screen.getByRole('link', { name: /rc plane/i })).toBeInTheDocument();
});
