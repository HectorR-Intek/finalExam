import { taskFactorySample, runTasks } from "./tasks.js";

async function main() {
  /*Each of these taskFactorySample is a function, not a function call, i.e. not a promise.
  Each can be called to return a promise. */
  const tasks = [
    taskFactorySample(500, true, 1),
    taskFactorySample(1000, true, 2),
    taskFactorySample(5000, false, "error 1"),
    taskFactorySample(2000, true, 4),
    taskFactorySample(1000, false, "error 2"),
    taskFactorySample(1000, false, "error 3"),
  ];

  const results = await runTasks(tasks, 2);

  results.forEach((r) => console.log(r));
}

main();
