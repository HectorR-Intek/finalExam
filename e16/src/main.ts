import { hasLoop, Node } from "./loop";

let head = new Node(5);
head.next = new Node(7);
head.next.next = new Node(8);
head.next.next.next = new Node(9);
head.next.next.next = head.next;

console.log(hasLoop(head));
