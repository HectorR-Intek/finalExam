import { Node, isPalindrome } from "./palindrome";

test("Returns true for SLL with just one element", () => {
  const head = new Node(1);
  expect(isPalindrome(head)).toBe(true);
});

test("Returns false for null SLL", () => {
  const head = null;
  expect(isPalindrome(head)).toBe(false);
});

test("Returns true for palindromes with even number of elements", () => {
  const head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(2);
  head.next.next.next = new Node(1);

  expect(isPalindrome(head)).toBe(true);
});

test("Returns true for palindromes with odd number of elements", () => {
  const head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(3);
  head.next.next.next = new Node(2);
  head.next.next.next.next = new Node(1);

  expect(isPalindrome(head)).toBe(true);
});

test("Returns false for SLL that are not palindromes", () => {
  const head = new Node(1);
  head.next = new Node(9);
  head.next.next = new Node(2);
  head.next.next.next = new Node(8);

  expect(isPalindrome(head)).toBe(false);
});

test("Returns false for asymmetrical repeated values", () => {
  const head = new Node(1);
  head.next = new Node(2);
  head.next.next = new Node(1);
  head.next.next.next = new Node(2);

  expect(isPalindrome(head)).toBe(false);
});

test("Throws error if input is not a SLL", () => {
  const head = "This is a string";

  () => expect(isPalindrome(head)).toThrow();
});
