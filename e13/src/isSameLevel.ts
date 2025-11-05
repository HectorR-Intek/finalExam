export class TreeNode {
  val: number;
  children: TreeNode[];

  constructor(val: number, children: TreeNode[] = []) {
    this.val = val;
    this.children = children;
  }
}

function findDepth(root: TreeNode | null, target: number): number[] {
  if (!root) return [];
  const depths: number[] = [];
  const queue: Array<{ node: TreeNode; depth: number }> = [
    { node: root, depth: 0 },
  ];

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!;
    if (node.val === target) {
      depths.push(depth);
    }
    for (const child of node.children) {
      queue.push({ node: child, depth: depth + 1 });
    }
  }
  return depths;
}

export function isSameLevel(
  root: TreeNode | null,
  n1: number,
  n2: number
): string {
  if (!root) throw new Error("Input parameter root must be a valid TreeNode");

  const d1 = findDepth(root, n1);
  const d2 = findDepth(root, n2);

  if (d1.length === 0 || d2.length === 0) {
    return `At least one of the numbers was not found`;
  }

  if (n1 !== n2) {
    if (d1.some((depth) => d2.includes(depth))) {
      const depth = d1.find((depth) => d2.includes(depth));
      return `Numbers ${n1} and ${n2} were found at depth: ${depth}`;
    }
  } else {
    const counts: Record<number, number> = {};
    for (const depth of d1) {
      counts[depth] = (counts[depth] ?? 0) + 1;
      if (counts[depth] >= 2)
        return `Numbers ${n1} and ${n2} were found at depth ${depth}`;
    }
  }
  return `Numbers ${n1} and ${n2} were not found at the same depth`;
}
