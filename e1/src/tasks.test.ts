import { taskFactorySample, runTasks } from "./tasks";

test("taskFactorySample resolves correctly", async () => {
  const task = taskFactorySample(100, true, "ok");
  await expect(task()).resolves.toBe("ok");
});

test("taskFactorySample rejects correctly", async () => {
  const task = taskFactorySample(100, false, "fail");
  await expect(task()).rejects.toBe("fail");
});

test("runTasks executes tasks with sizePool=2", async () => {
  const tasks = [
    taskFactorySample(50, true, "a"),
    taskFactorySample(30, false, "err"),
    taskFactorySample(20, true, "b"),
  ];
  const results = await runTasks(tasks, 2);

  expect(results).toHaveLength(3);
  expect(results[0]).toEqual({ value: "a" });
  expect(results[1]).toEqual({ error: "err" });
  expect(results[2]).toEqual({ value: "b" });
});

test("no more than n solvers active", async () => {
  let active = 0;
  let maxActive = 0;

  const tasks = Array.from({ length: 10 }, (_, i) => {
    return () =>
      new Promise<number>((res) => {
        active++;
        maxActive = Math.max(maxActive, active);
        setTimeout(() => {
          active--;
          res(i);
        }, 100);
      });
  });

  const sizePool = 2;
  await runTasks(tasks, sizePool);

  expect(maxActive).toBeLessThanOrEqual(sizePool);
});
