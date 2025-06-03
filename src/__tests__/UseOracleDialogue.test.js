import { renderHook } from '@testing-library/react';
import { useOracleDialogue } from '../hooks/useOracleDialogue';

test('returns oracle dialogue for node', () => {
  const { result } = renderHook(() => useOracleDialogue('matrix-oracle-seekers'));
  expect(result.current.dialogue).toHaveLength(2);
  expect(result.current.options[0].prompt).toMatch(/Ask about the future/);
});
