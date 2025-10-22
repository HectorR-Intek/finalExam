import { getPrimes } from "./primes";

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
