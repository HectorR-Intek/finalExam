export function reverseBlocks<T>(arr: T[], blockSize: number) {
  if (arr.length < blockSize) {
    return "blockSize has to be lesser than the array's length";
  }
  if (blockSize <= 0) {
    return "blockSize has to be greater than zero";
  }

  if (arr.length == blockSize) {
    let temp;
    let last = arr.length - 1;
    for (let i = 0; i < arr.length; i++) {
      temp = arr[i];
      arr[i] = arr[last];
      arr[last] = temp;
      last--;
    }
  }

  let blocks = 0;
  while (arr.length - blocks * blockSize >= blockSize) {
    let temp = arr.slice(blocks * blockSize, blockSize * (blocks + 1));
    for (let i = 0; i < temp.length; i++) {
      let index = blockSize * (blocks + 1) - (i + 1);
      arr[index] = temp[i];
    }
    blocks++;
  }

  return arr;
}
