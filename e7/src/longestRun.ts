export function longestRunOfTwoNumbers(input: string) {
  if (input.length == 0)
    throw new Error("Input string must have at least one element");

  if (!/^[0-9]+$/.test(input)) {
    throw new Error("Input must only consist of numerical characters");
  }

  let tempOne = "";
  let tempTwo = "";
  let counter = 0;
  let hiScore = 0;
  let streak = 1;
  let i = -1;
  let lastIndex = 0;

  for (const char of input) {
    i++;
    if (tempOne.length === 0) {
      counter++;
      tempOne = tempOne + char;
      continue;
    }
    if (tempTwo.length === 0 && char !== tempOne) {
      counter++;
      streak = 1;
      tempTwo = tempTwo + char;
      continue;
    }
    if (char === tempOne || char === tempTwo) {
      counter++;
      if (char == input[i - 1]) streak++;
      else streak = 1;
      continue;
    } else {
      if (counter > hiScore) {
        hiScore = counter;
        counter = streak + 1;
        lastIndex = i;

        input[lastIndex - 1] == tempOne ? (tempTwo = char) : (tempOne = char);

        streak = 1;
        continue;
      }

      input[i - 1] == tempOne ? (tempTwo = char) : (tempOne = char);
      counter = streak + 1;
      streak = 1;
    }
  }
  if (counter > hiScore) {
    hiScore = counter;
    lastIndex = i + 1;
  }

  const answer = input.slice(lastIndex - hiScore, lastIndex);
  return answer;
}
