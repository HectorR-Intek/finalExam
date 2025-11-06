export function countEmpties<T>(arr: T[]) {
  let empties = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) {
      empties++;
    }
  }
  return empties;
}

export function checkSorted(Arr: number[]) {
  return Arr.every(
    (value: number, index: number, Arr: number[]) =>
      index === 0 || value >= Arr[index - 1] || Arr[index - 1] === undefined
  );
}

function bubbleSort(arr: number[]) {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i]! > arr[i + 1]!) {
        let temp = arr[i];
        arr[i] = arr[i + 1]!;
        arr[i + 1] = temp!;
        swapped = true;
      }
    }
    n--;
  } while (swapped);
  return arr;
}

export function mergeArrays<R>(largeArray: R[], smallArray: R[]) {
  const largeArraySize = largeArray.length;
  const largeArrayEmpties = countEmpties(largeArray);
  const smallArraySize = smallArray.length;
  if (largeArrayEmpties < smallArraySize) {
    return "largeArray must be able to contain small array";
  }

  if (!checkSorted(largeArray) || !checkSorted(smallArray)) {
    return "Input arrays have to be sorted";
  }

  for (let i = 0; i < smallArraySize; i++) {
    for (let j = 0; j < largeArraySize; j++) {
      if (!(j in largeArray)) {
        largeArray[j] = smallArray[i];
        break;
      }
    }
  }
  console.log(largeArray);

  return bubbleSort(largeArray);
}
