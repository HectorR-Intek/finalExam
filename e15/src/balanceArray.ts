export function balanceArray(arr: number[]) {
  if (arr.length <= 1)
    throw new Error("Input array must contain at least 2 numbers");
  if (arr.some((element) => typeof element !== "number"))
    throw new Error("Every element of the input array must be a number");

  let left: Array<number>;
  let right: Array<number>;

  let leftSum,
    rightSum = 0;

  for (let i = 1; i <= arr.length; i++) {
    left = arr.slice(0, i);
    right = arr.slice(i, arr.length);
    leftSum = left.reduce((num, acc) => (acc += num), 0);
    rightSum = right.reduce((num, acc) => (acc += num), 0);
    if (leftSum === rightSum) return i - 1;
  }
  return -1;
}

const testArr = [1, 2, 3, 4, 9, 9, 2, 7, 10, 13];

console.log(balanceArray(testArr));
