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
  expect(results[0]).toBe("a");
  expect(results[1]).toBeInstanceOf(Error);
  expect(results[2]).toBe("b");
});
