export function reverseBlocks<T extends {}>(arr: T[], blockSize: number) {
  if (arr.length < blockSize) {
    throw new Error("blockSize has to be lesser than the array's length");
  }
  if (blockSize <= 0) {
    throw new Error("blockSize has to be greater than zero");
  }

  let blocks = 0;

  while (arr.length - blocks * blockSize >= blockSize) {
    let indecs = blocks * blockSize;
    let temp;
    let last = indecs + blockSize - 1;
    for (let j = indecs; j < indecs + blockSize - 1; j++) {
      temp = arr[j];
      arr[j] = arr[last] as T;
      arr[last] = temp as T;
      last--;
    }
    blocks++;
  }

  return arr;
}
