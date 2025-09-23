import { cancellableFetch } from "./cancellableFetch";

import { cancellableFetch } from "./cancellableFetch";

beforeEach(() => {
  global.fetch = jest.fn();
});

test("Resolves the promise succesfully", async () => {
  const mockResponse = new Response(JSON.stringify({ foo: "bar" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

  const result = cancellableFetch("http://fake.url");

  const res = await result.promise;
  const data = await res.json();

  expect(data).toEqual({ foo: "bar" });
  expect(global.fetch).toHaveBeenCalledWith(
    "http://fake.url",
    expect.any(Object)
  );
});

test("cancels with AbortError", async () => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(
    new DOMException("The operation was aborted.", "AbortError")
  );

  const result = cancellableFetch("http://fake.url");
  result.cancel();

  await expect(result.promise).rejects.toThrow("The operation was aborted.");
});
