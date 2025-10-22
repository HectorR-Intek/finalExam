export function getPrimes(N: number) {
  let primes = [2];
  let count = 3;
  while (primes.length < N) {
    const sqrt = Math.floor(Math.sqrt(count));
    for (let prime of primes) {
      if (prime > sqrt) {
        primes.push(count);
        progressBar(primes.length, N);
        break;
      }
      if (count % prime === 0) break;
    }
    count++;
  }
  return primes;
}

export function progressBar(completed: number, total: number) {
  const percent = (completed / total) * 100;
  const barLength = 30;
  const filledLength = Math.round((barLength * percent) / 100);
  const bar = "#".repeat(filledLength) + "-".repeat(barLength - filledLength);

  const color =
    percent < 33 ? "\x1b[31m" : percent < 66 ? "\x1b[93m" : "\x1b[32m";

  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(`${color}[${bar}] ${percent.toFixed(1)}%\x1b[0m`);
}
