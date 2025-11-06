import { reverseBlocks } from "./blocks";

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const blockSize = 3;
console.log(reverseBlocks(arr, blockSize));

/**
 * Expected result:
 * [2,1,0,5,4,3,8,7,6,9]
 */

const arrTwo = [0, 1, 2, 3, 4];
const blockTwo = 2;
console.log(reverseBlocks(arrTwo, blockTwo));

const arrThree = [0, 1, 2];
const blockThree = 3;
console.log(reverseBlocks(arrThree, blockThree));
