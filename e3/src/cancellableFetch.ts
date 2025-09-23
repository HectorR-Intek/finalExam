export function cancellableFetch(url: string) {
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = fetch(url, { signal: signal });

  return {
    promise,
    cancel: () => controller.abort(),
  };
}
