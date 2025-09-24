import { mergeArrays } from "./merger";

const largeArray = [1, , 3, , 5];
const smallArray = [2, 4];
const largeArraySize = largeArray.length;
const smallArraySize = smallArray.length;

console.log(mergeArrays(largeArray, smallArray));
console.log(largeArray); // Expecting: [0,1,2,3,4,5,6,7,8,9]
console.log(largeArraySize === largeArray.length);
