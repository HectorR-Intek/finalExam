export type Task<R> = (
  delay: number,
  resolve: boolean,
  val: string | number
) => () => Promise<R>;

export const taskFactorySample: Task<string | number> =
  (delay: number, resolve: boolean, val: string | number) => () =>
    new Promise((res, rej) => setTimeout(resolve ? res : rej, delay, val));

export async function runTasks<R>(
  tasks: (() => Promise<R>)[],
  sizePool: number
): Promise<(R | Error)[]> {
  const results: (R | Error)[] = [];
  let index = 0;

  async function solver() {
    while (index < tasks.length) {
      const currentIndex = index++;
      try {
        const result = await tasks[currentIndex]();
        results[currentIndex] = result;
      } catch (err) {
        results[currentIndex] =
          err instanceof Error ? err : new Error(String(err));
      }
    }
  }

  const solvers = Array.from({ length: sizePool }, () => solver());
  await Promise.all(solvers);
  console.log("All tasks have been completed");

  return results;
}
