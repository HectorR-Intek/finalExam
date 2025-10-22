import { getPrimes } from "./primes";

test("Returns an array of prime numbers", () => {
  expect(getPrimes(5)).toStrictEqual([2, 3, 5, 7, 11]);
  expect(getPrimes(15)).toStrictEqual([
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
  ]);
});
