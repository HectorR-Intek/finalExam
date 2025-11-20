import { getPrimes } from "./primes";

/*
To run this file invoke it (main.js) directly with node from the dist folder.
*/

function main() {
  const target = process.argv[2];
  const targetNumber = Number(target);

  if (targetNumber) {
    const primes = getPrimes(targetNumber);
    console.log("\n");
    console.log(`The first ${primes.length} primes are: `);
    console.log(JSON.stringify(primes));
  } else {
    console.log("A number has to be provided next to the function invocation");
  }
}

main();
