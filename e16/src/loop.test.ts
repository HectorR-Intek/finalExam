import { Node, /*hasLoop*/ detectLoopStart } from "./loop";

describe("detectLoopStart", () => {
  test("returns false for an empty list", () => {
    expect(detectLoopStart(null)).toBe(null);
  });

  test("returns false for a single node without loop", () => {
    const head = new Node(1);
    expect(detectLoopStart(head)).toBe(null);
  });

  test("returns true for a single node that loops to itself", () => {
    const head = new Node(1);
    head.next = head;
    expect(detectLoopStart(head)).toBe(head);
  });

  test("returns false for a multi-node list without loop", () => {
    const head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    expect(detectLoopStart(head)).toBe(null);
  });

  test("returns true when the last node links back to the head", () => {
    const head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = head; // loop: 3 → 1
    expect(detectLoopStart(head)).toBe(head);
  });

  test("returns true when the last node links to a middle node", () => {
    const head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    head.next.next.next.next = head.next; // loop: 4 → 2
    expect(detectLoopStart(head)).toBe(head.next);
  });
});
