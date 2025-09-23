import { queryRetry } from "./retry";

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

test("Returns 'Successful fetch' if first try is succesful", async () => {
  const urlQuery = jest.fn().mockResolvedValue({ ok: true });

  const resultPromise = queryRetry(urlQuery, 3, 1000, true);

  await jest.runAllTimersAsync();
  const result = await resultPromise;

  expect(urlQuery).toHaveBeenCalledTimes(1);
  expect(result).toBe("Successful fetch");
});

test("Retries once and then is succesful", async () => {
  const urlQuery = jest
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 500 })
    .mockResolvedValueOnce({ ok: true });

  const resultPromise = queryRetry(urlQuery, 3, 1000, true);

  await jest.advanceTimersByTimeAsync(1000);

  const result = await resultPromise;

  expect(urlQuery).toHaveBeenCalledTimes(2);
  expect(result).toBe("Successful fetch");
});

test("Returns succesful message after every retry attempt", async () => {
  const urlQuery = jest.fn().mockResolvedValue({ ok: false, status: 500 });

  const resultPromise = queryRetry(urlQuery, 2, 1000, true);

  await jest.advanceTimersByTimeAsync(1000);
  await jest.advanceTimersByTimeAsync(2000);

  const result = await resultPromise;

  expect(urlQuery).toHaveBeenCalledTimes(3);
  expect(result).toBe("Fetch failed: Maximum amount of tries has been reached");
});

test("manages exceptions thrown by urlQuery", async () => {
  const urlQuery = jest.fn().mockRejectedValue(new Error("Network error"));

  const resultPromise = queryRetry(urlQuery, 1, 1000, false);

  await jest.runAllTimersAsync();
  const result = await resultPromise;

  expect(urlQuery).toHaveBeenCalledTimes(1);
  expect(result).toBe("Fetch failed: Maximum amount of tries has been reached");
});
