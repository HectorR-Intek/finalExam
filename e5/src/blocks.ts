export function reverseBlocks<T>(arr: T[], blockSize: number) {
  if (arr.length < blockSize) {
    return "blockSize has to be lesser than the array's length";
  }
  if (blockSize <= 0) {
    return "blockSize has to be greater than zero";
  }

  if (arr.length == blockSize) {
    return arr.reverse();
  }

  let blocks = 0;
  while (arr.length - blocks * blockSize >= blockSize) {
    let temp = arr
      .slice(blocks * blockSize, blockSize * (blocks + 1))
      .reverse();
    //console.log(`Temp reversed is: ${temp}`);

    arr.splice(blocks * blockSize, blockSize, temp);
    arr = arr.flat();

    blocks = blocks + 1;
  }

  return arr;
}
