export async function queryRetry<R>(
  urlQuery: () => Promise<R>,
  maxRetry: number,
  delay: number,
  useIncrement: boolean
) {
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function callUrl() {
    try {
      const res = await urlQuery();
      if (!res.ok) {
        console.log(`Server Error: ${res.status}`);
        return false;
      }
      console.log("Succesful fetch");
      return true;
    } catch (err) {
      console.log(`Error: ${err}`);
      return false;
    }
  }
  let success = await callUrl();
  for (let i = 0; i <= maxRetry - 1; i++) {
    if (success) {
      return "Successful fetch";
    } else if (useIncrement) {
      console.log(`Retrying in ${(delay * (i + 1)) / 1000} seconds`);
      await sleep(delay * (i + 1));
      success = await callUrl();
    }
  }
  return "Fetch failed: Maximum amount of tries has been reached";
}
