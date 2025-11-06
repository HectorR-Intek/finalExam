export async function queryRetry<R>(
  urlQuery: () => Promise<R>,
  maxRetry: number,
  delay: number,
  useIncrement: boolean
): Promise<R> {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetry; attempt++) {
    try {
      const res = await urlQuery();

      if ((res as any)?.ok === false) {
        const status = (res as any)?.status ?? "unknown";
        throw new Error(`Server responded with status ${status}`);
      }

      return res;
    } catch (err) {
      lastError = err;
      if (attempt < maxRetry) {
        const nextDelay = useIncrement ? delay * (attempt + 1) : delay;
        console.log(
          `Attempt ${attempt + 1} failed. Retrying in ${nextDelay / 1000}s...`
        );
        await sleep(nextDelay);
      }
    }
  }

  throw new Error(
    `Fetch failed after ${maxRetry + 1} attempts. Last error: ${String(
      lastError
    )}`
  );
}
