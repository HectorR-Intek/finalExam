export type Task<R> = (
  delay: number,
  resolve: boolean,
  val: string | number
) => () => Promise<R>;

export type TaskResult<R> = { value: R } | { error: Error };

export const taskFactorySample: Task<string | number> =
  (delay: number, resolve: boolean, val: string | number) => () =>
    new Promise((res, rej) => setTimeout(resolve ? res : rej, delay, val));

export async function runTasks<R>(
  tasks: (() => Promise<R>)[],
  sizePool: number
): Promise<TaskResult<R>[]> {
  const results: (R | Error)[] = [];
  let index = 0;

  async function solver() {
    while (index < tasks.length) {
      const currentIndex = index++;
      try {
        const result = await tasks[currentIndex]();
        //results[currentIndex] = result;
        results[currentIndex] = { value: result };
      } catch (error) {
        results[currentIndex] = {
          //error instanceof Error ? error : new Error(String(error));
          error: String(error),
        };
      }
    }
  }

  const solvers = Array.from({ length: sizePool }, () => solver());
  await Promise.all(solvers);
  console.log("All tasks have been completed");

  return results;
}
