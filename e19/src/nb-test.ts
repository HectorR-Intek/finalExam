(function (global: any) {
  const root = document.getElementById("results")!;

  const result = (text: string, pass?: boolean): HTMLLIElement => {
    const el = document.createElement("li");
    el.textContent = text;
    if (pass !== undefined) el.style.color = pass ? "green" : "red";
    return el;
  };

  const baseAssert = (
    pass: boolean | undefined,
    message: string,
    container: HTMLElement
  ): HTMLLIElement => {
    const el = result(message, pass);
    container.appendChild(el);
    return el;
  };

  function globalAssert(
    pass: boolean | undefined,
    message: string
  ): HTMLLIElement {
    return baseAssert(pass, message, root);
  }

  function test(description: string, testBlock: Function): void {
    const testItem = baseAssert(undefined, description, root);
    const nestedList = document.createElement("ul");
    testItem.appendChild(nestedList);

    const prevAssert = global.assert;
    const prevSetTimeout = global.setTimeout.bind(global);

    const localAssert = (pass: boolean | undefined, message: string) =>
      baseAssert(pass, message, nestedList);

    global.assert = localAssert;

    global.setTimeout = function (
      handler: TimerHandler,
      timeout?: number,
      ...args: any[]
    ) {
      const assertRef = global.assert;

      if (typeof handler === "function") {
        const wrapped = function (this: any, ...cbArgs: any[]) {
          const saved = global.assert;
          global.assert = assertRef;
          try {
            return (handler as Function).apply(this, cbArgs);
          } finally {
            global.assert = saved;
          }
        };
        return prevSetTimeout(wrapped, timeout, ...args);
      } else {
        return prevSetTimeout(handler, timeout, ...args);
      }
    };

    try {
      testBlock();
    } finally {
      global.setTimeout = prevSetTimeout;
      global.assert = prevAssert;
    }
  }

  global.assert = globalAssert;
  global.test = test;
})(window);
