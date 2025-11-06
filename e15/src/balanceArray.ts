export function balanceArray(arr: number[]) {
  if (arr.length <= 1)
    throw new Error("Input array must contain at least 2 numbers");
  if (arr.some((element) => typeof element !== "number"))
    throw new Error("Every element of the input array must be a number");

  let totalSum = 0;
  for (let j = 0; j < arr.length; j++) {
    totalSum += arr[j];
  }

  let partialSum = 0;
  for (let i = 0; i < arr.length; i++) {
    partialSum += arr[i];
    if (totalSum - partialSum === partialSum) return i;
  }
  return -1;
}

const testArr = [1, 2, 3, 4, 9, 9, 2, 7, 10, 13];

console.log(balanceArray(testArr));
