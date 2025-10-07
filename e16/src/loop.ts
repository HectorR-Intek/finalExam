export class Node {
  data: string | number;
  next: Node | null;
  constructor(data: string | number) {
    this.data = data;
    this.next = null;
  }
}

export function hasLoop(head: Node): boolean {
  const visitedNodes = new Set();

  while (head !== null) {
    if (visitedNodes.has(head)) {
      return true;
    }
    visitedNodes.add(head);
    head = head.next;
  }

  return false;
}
