export function reverseBlocks<T extends {}>(arr: T[], blockSize: number) {
  if (arr.length < blockSize) {
    throw new Error("blockSize has to be lesser than the array's length");
  }
  if (blockSize <= 0) {
    throw new Error("blockSize has to be greater than zero");
  }

  if (arr.length == blockSize) {
    let temp;
    let last = arr.length - 1;
    for (let i = 0; i < arr.length; i++) {
      temp = arr[i] as T;
      arr[i] = arr[last] as T;
      arr[last] = temp;
      last--;
    }
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
