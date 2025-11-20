import { getPrimes, progressBar } from "./primes";

describe("Function getPrimes", () => {
  it("returns an array of prime numbers", () => {
    expect(getPrimes(5)).toStrictEqual([2, 3, 5, 7, 11]);
    expect(getPrimes(15)).toStrictEqual([
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
    ]);
  });
});

describe("progressBar", () => {
  let writeSpy: jest.SpyInstance;
  let clearSpy: jest.SpyInstance;
  let cursorSpy: jest.SpyInstance;

  beforeEach(() => {
    writeSpy = jest
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);
    clearSpy = jest
      .spyOn(process.stdout, "clearLine")
      .mockImplementation(() => false);
    cursorSpy = jest
      .spyOn(process.stdout, "cursorTo")
      .mockImplementation(() => false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("prints a progress bar with correct percentage and colors", () => {
    progressBar(3, 10); // 30%

    expect(clearSpy).toHaveBeenCalledWith(0);
    expect(cursorSpy).toHaveBeenCalledWith(0);

    // Verify that write has been invoked
    expect(writeSpy).toHaveBeenCalled();

    const output = writeSpy.mock.calls[0][0] as string;

    // red(<33%)
    expect(output.startsWith("\x1b[31m")).toBe(true);
    expect(output).toContain("[#########---------------------]");
    expect(output).toContain("30.0%");
  });
});
