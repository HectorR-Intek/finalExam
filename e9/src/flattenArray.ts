export function flattenArray(input) {
  let result = [];
  for (const el of input) {
    console.log(typeof el);
    if (typeof el !== "object") {
      result = [...result, el];
    } else {
      const temp = flattenArray(el);
      result = [...result, ...temp];
    }
  }
  console.log(result);
  return result;
}
