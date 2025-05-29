import { saveVisited, getVisited, getCurrentNode, setCurrentNode, resetProgress } from '../utils/MatrixRouteMemory';

afterEach(() => {
  localStorage.clear();
});

test('tracks visited nodes', () => {
  expect(getVisited()).toEqual([]);
  saveVisited('a');
  saveVisited('b');
  saveVisited('a');
  expect(getVisited()).toEqual(['a', 'b']);
});

test('stores current node', () => {
  expect(getCurrentNode()).toBe('');
  setCurrentNode('c');
  expect(getCurrentNode()).toBe('c');
});

test('resetProgress clears all data', () => {
  saveVisited('x');
  setCurrentNode('y');
  resetProgress();
  expect(getVisited()).toEqual([]);
  expect(getCurrentNode()).toBe('');
});
