export class TreeNode {
  value: string;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: string) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export type TraversalOrder = "pre" | "in" | "post";

export function parseTree(str: string): TreeNode | null {
  if (!str || str === "") return null;
  str = str.trim();

  if (!str.startsWith("(")) {
    return new TreeNode(str);
  }

  str = str.slice(1, -1);

  let parts: string[] = [];
  let balance = 0;
  let current = "";

  for (let ch of str) {
    if (ch === "(") balance++;
    if (ch === ")") balance--;
    if (ch === "," && balance === 0) {
      parts.push(current);
      current = "";
    } else {
      if (!(ch === "," && balance === 0)) current += ch;
    }
  }
  parts.push(current);

  const node = new TreeNode(parts[0]!);
  node.left = parts[1] ? parseTree(parts[1]) : null;
  node.right = parts[2] ? parseTree(parts[2]) : null;

  return node;
}

function prefix(node: TreeNode | null, result: string[] = []): string[] {
  if (!node) return result;
  result.push(node.value);
  prefix(node.left, result);
  prefix(node.right, result);
  return result;
}

function infix(node: TreeNode | null, result: string[] = []): string[] {
  if (!node) return result;
  infix(node.left, result);
  result.push(node.value);
  infix(node.right, result);
  return result;
}

function postfix(node: TreeNode | null, result: string[] = []): string[] {
  if (!node) return result;
  postfix(node.left, result);
  postfix(node.right, result);
  result.push(node.value);
  return result;
}

export function printTree(tree: string, order: TraversalOrder) {
  const root = parseTree(tree);
  if (!root) return [];

  switch (order) {
    case "pre":
      return prefix(root);
    case "in":
      return infix(root);
    case "post":
      return postfix(root);
    default:
      return [];
  }
}
