class TreeNode {
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

function parseTree(str: string): TreeNode | null {
  if (!str || str.trim() === "") return null;
  str = str.trim();

  let balance = 0;
  for (const ch of str) {
    if (ch === "(") balance++;
    else if (ch === ")") balance--;
    if (balance < 0)
      throw new Error(`Invalid structure: extra ')' in "${str}"`);
  }
  if (balance !== 0)
    throw new Error(`Invalid structure: unbalanced parentheses in "${str}"`);

  if (!str.startsWith("(")) {
    return new TreeNode(str);
  }

  if (!str.endsWith(")"))
    throw new Error(`Invalid structure: missing closing ')' in "${str}"`);
  str = str.slice(1, -1).trim();

  const parts: string[] = [];
  balance = 0;
  let current = "";

  for (let ch of str) {
    if (ch === "(") balance++;
    if (ch === ")") balance--;
    if (ch === "," && balance === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      if (!(ch === "," && balance === 0)) current += ch;
    }
  }
  parts.push(current.trim());

  if (parts.length === 2) {
    throw new Error(
      `Invalid structure: missing explicit root before children in "${str}"`
    );
  }

  if (parts.length < 1 || parts.length > 3) {
    throw new Error(`Invalid structure: expected 1 to 3 parts in "${str}"`);
  }

  const [value, leftStr = "", rightStr = ""] = parts;

  if (!value)
    throw new Error(`Invalid structure: missing root value in "${str}"`);

  const node = new TreeNode(value);
  node.left = leftStr ? parseTree(leftStr) : null;
  node.right = rightStr ? parseTree(rightStr) : null;

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
