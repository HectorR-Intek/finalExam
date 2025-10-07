export class Node {
  data: string | number;
  next: Node | null;
  constructor(newData: string | number) {
    this.data = newData;
    this.next = null;
  }
}

export function isPalindrome(head: Node): boolean {
  let currentNode = head;
  let stack: Array<string | number> = [];

  if (!head) return false;
  if (!(head instanceof Node))
    throw new Error("Input parameter head must be a SLL");

  while (currentNode !== null) {
    stack.push(currentNode.data);
    currentNode = currentNode.next!;
  }

  while (head !== null) {
    let dataFromStack = stack.pop();
    if (head.data !== dataFromStack) return false;
    head = head.next!;
  }

  return true;
}

const head = new Node(3);

console.log(head instanceof Node);
