import { queryRetry } from "./retry";

afterEach(() => {
  jest.clearAllMocks();
});

test("returns the result immediately if the first call is successful", async () => {
  const urlQuery = jest.fn().mockResolvedValue({ ok: true });

  const result = await queryRetry(urlQuery, 3, 1, true);

  expect(urlQuery).toHaveBeenCalledTimes(1);
  expect(result).toEqual({ ok: true });
});

test("retries once and then succeeds", async () => {
  const urlQuery = jest
    .fn()
    .mockResolvedValueOnce({ ok: false, status: 500 })
    .mockResolvedValueOnce({ ok: true });

  const result = await queryRetry(urlQuery, 3, 1, true);

  expect(urlQuery).toHaveBeenCalledTimes(2);
  expect(result).toEqual({ ok: true });
});

test("retries up to the maximum and throws after all attempts fail", async () => {
  const urlQuery = jest.fn().mockResolvedValue({ ok: false, status: 500 });

  // maxRetry=2 -> 3 intentos
  await expect(queryRetry(urlQuery, 2, 1, true)).rejects.toThrow(
    /Fetch failed after 3 attempts/
  );
  expect(urlQuery).toHaveBeenCalledTimes(3);
});

test("handles exceptions thrown by urlQuery and retries accordingly", async () => {
  const urlQuery = jest.fn().mockRejectedValue(new Error("Network error"));

  // maxRetry=1 -> 2 intentos (delay fijo por useIncrement=false)
  await expect(queryRetry(urlQuery, 1, 1, false)).rejects.toThrow(
    /Fetch failed after 2 attempts/
  );
  expect(urlQuery).toHaveBeenCalledTimes(2);
});
