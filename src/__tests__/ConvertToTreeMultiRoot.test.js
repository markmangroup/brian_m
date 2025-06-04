import { convertToTree } from '../utils/convertToTree';
import { analyzeTree } from '../utils/convertToTree';

test('convertToTree creates synthetic world root when multiple depth0 nodes', () => {
  const nodes = [
    { id: 'matrix-root', depth: 0, type: 'scene' },
    { id: 'witcher-root', depth: 0, type: 'scene' },
    { id: 'child', depth: 1, type: 'scene' }
  ];
  const edges = [
    { source: 'matrix-root', target: 'child' }
  ];

  const tree = convertToTree(nodes, edges);

  expect(tree.id).toBe('world-root');
  expect(tree.children.map(c => c.id)).toEqual(expect.arrayContaining(['matrix-root','witcher-root']));

  const stats = analyzeTree(tree);
  const oldMax = Math.max(...nodes.map(n => n.depth));
  expect(stats.maxDepth).toBe(oldMax + 1);
});

