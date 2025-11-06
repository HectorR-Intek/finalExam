export class Node {
  data: string | number;
  next: Node | null;
  constructor(data: string | number) {
    this.data = data;
    this.next = null;
  }
}

export function hasLoop(head: Node | null): boolean {
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

export function detectLoopStart(head: Node | null): Node | null {
  let slow: Node | null = head;
  let fast: Node | null = head;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next!;
    if (slow === fast) break;
  }

  //No loop
  if (!fast || !fast.next) return null;

  //Find loop head
  slow = head;
  while (slow !== fast) {
    slow = slow!.next!;
    fast = fast!.next!;
  }

  return slow;
}
