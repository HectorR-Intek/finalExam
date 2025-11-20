describe("setTimeout wrapper", () => {
  test("setTimeout uses the local reference to assert callback", (done) => {
    const llamadas: string[] = [];

    // simulated local assert
    const localAssert = (pass: boolean | undefined, msg: string) => {
      llamadas.push(msg);
    };

    // simulated global assert
    (globalThis as any).assert = () => {};

    function wrapSetTimeout(assertRef: any) {
      const prev = globalThis.setTimeout;

      globalThis.setTimeout = function (handler: any, timeout?: number) {
        if (typeof handler === "function") {
          const wrapped = () => {
            const saved = (globalThis as any).assert;
            (globalThis as any).assert = assertRef;
            try {
              handler();
            } finally {
              (globalThis as any).assert = saved;
            }
          };
          return prev(wrapped, timeout);
        }
        return prev(handler, timeout);
      };
    }

    wrapSetTimeout(localAssert);

    //This callback is executed with local assert:
    setTimeout(() => {
      (globalThis as any).assert(true, "async-ok");

      expect(llamadas).toContain("async-ok");
      done();
    }, 0);
  });
});
