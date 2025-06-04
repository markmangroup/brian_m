import { getNodeSummary } from '../utils/getNodeSummary';

const mockGetWorldDialogue = (dialogue) => Array.isArray(dialogue) ? dialogue : Object.values(dialogue).flat();

test('returns summary when present', () => {
  const data = { summary: 'hello', description: 'desc', setting: 'here' };
  expect(getNodeSummary(data, 'matrix', mockGetWorldDialogue)).toBe('hello');
});

test('falls back to description', () => {
  const data = { description: 'desc', setting: 'here' };
  expect(getNodeSummary(data, 'matrix', mockGetWorldDialogue)).toBe('desc');
});

test('falls back to setting', () => {
  const data = { setting: 'here' };
  expect(getNodeSummary(data, 'matrix', mockGetWorldDialogue)).toBe('here');
});

test('uses dialogue length', () => {
  const data = { dialogue: ['a', 'b', 'c'] };
  expect(getNodeSummary(data, 'matrix', mockGetWorldDialogue)).toBe('3 dialogue lines');
});

test('returns null when missing', () => {
  const data = {};
  expect(getNodeSummary(data, 'matrix', mockGetWorldDialogue)).toBeNull();
});
