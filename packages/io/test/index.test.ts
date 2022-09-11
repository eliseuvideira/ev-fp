import { Either } from "@ev-fp/either";
import { IO } from "../src/index";

describe("IO", () => {
  it("lifts a value with `IO.of` to an `IO` and doesn't immediatly fire side-effects", () => {
    expect.assertions(2);

    const input = { id: Math.random() };

    const fn = jest.fn();

    const io = IO.of(input).map(fn);

    expect(io).toBeInstanceOf(IO);
    expect(fn).not.toHaveBeenCalled();
  });

  it("returns a `Either.right` value when run succeeds", async () => {
    expect.assertions(5);

    const input = { id: Math.random() };

    const output = { id: Math.random() };

    const fn = jest.fn(async (_) => output);

    const io = IO.of(input).map(fn);

    expect(fn).not.toHaveBeenCalled();

    const result = await io.run();

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledWith(input);
    expect(Either.right(result)).toBe(true);

    if (!Either.right(result)) {
      fail();
    }

    const value = result.unwrap();

    expect(value).toBe(output);
  });

  it("returns a `Either.left` value when run fails", async () => {
    expect.assertions(6);

    const input = { id: Math.random() };

    const error = new Error(`error: ${Math.random()}`);

    const fn = jest.fn((_) => {
      throw error;
    });

    const io = IO.of(input).map(async (...args) => fn(...args));

    expect(fn).not.toHaveBeenCalled();

    const output = await io.run();

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledWith(input);
    expect(Either.left(output)).toBe(true);

    if (!Either.left(output)) {
      fail();
    }

    expect(output.error).toBe(error);

    try {
      output.unwrap();

      fail();
    } catch (err) {
      expect(err).toBe(error);
    }
  });

  it("it stops propagation after first error", async () => {
    expect.assertions(5);

    const error1 = new Error(`error: ${Math.random()}`);

    const error2 = new Error(`error: ${Math.random()}`);

    const fn1 = jest.fn((_): any => {
      throw error1;
    });

    const fn2 = jest.fn((_): any => {
      throw error2;
    });

    const io = IO.of(async () => "Hello World")
      .map(async (...args) => fn1(...args))
      .map(async (...args) => fn2(...args));

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();

    const result = await io.run();

    expect(fn1).toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();

    if (!Either.left(result)) {
      fail();
    }

    expect(result.error).toBe(error1);
  });

  it("it continues transforming until reaches final output", async () => {
    expect.assertions(7);

    const original = { id: Math.random() };
    const transform1 = { id: Math.random() };
    const transform2 = { id: Math.random() };

    const fn1 = jest.fn((_): any => {
      return transform1;
    });

    const fn2 = jest.fn((_): any => {
      return transform2;
    });

    const io = IO.of(original)
      .map(async (...args) => fn1(...args))
      .map(async (...args) => fn2(...args));

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();

    const result = await io.run();

    expect(fn1).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(original);
    expect(fn2).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith(transform1);

    if (!Either.right(result)) {
      fail();
    }

    const value = result.unwrap();

    expect(value).toBe(transform2);
  });

  it("works for multiple chained maps", async () => {
    expect.assertions(151);

    const transforms = new Array(50)
      .fill(null)
      .map(() => ({ id: Math.random() }));

    const fns = new Array(50)
      .fill(null)
      .map((_, i) => jest.fn((_: any) => transforms[i]));

    const original = { id: Math.random() };

    const io = fns.reduce(
      (io, fn) => io.map(async (...args) => fn(...args)),
      IO.of(original),
    );

    fns.forEach((fn) => {
      expect(fn).not.toHaveBeenCalled();
    });

    const result = await io.run();

    fns.forEach((fn, i) => {
      expect(fn).toHaveBeenCalled();
      expect(fn).toHaveBeenCalledWith(i === 0 ? original : transforms[i - 1]);
    });

    if (!Either.right(result)) {
      fail();
    }

    const unwrapped = result.unwrap();

    expect(unwrapped).toBe(transforms[transforms.length - 1]);
  });

  it("works for multiple chained maps when errors", async () => {
    expect.assertions(151);

    const transforms = new Array(50)
      .fill(null)
      .map(() => ({ id: Math.random() }));

    const fns = new Array(50)
      .fill(null)
      .map((_, i) => jest.fn((_: any) => transforms[i]));

    const index = Math.floor(Math.random() * (fns.length - 3)) + 3;

    const error = new Error(`error: ${Math.random()}`);

    fns[index] = jest.fn((_) => {
      throw error;
    });

    const original = { id: Math.random() };

    const io = fns.reduce(
      (io, fn) => io.map(async (...args) => fn(...args)),
      IO.of(original),
    );

    fns.forEach((fn) => {
      expect(fn).not.toHaveBeenCalled();
    });

    const result = await io.run();

    fns.slice(0, index + 1).forEach((fn, i) => {
      expect(fn).toHaveBeenCalled();
      expect(fn).toHaveBeenCalledWith(i === 0 ? original : transforms[i - 1]);
    });

    fns.slice(index + 1).forEach((fn, i) => {
      expect(fn).not.toHaveBeenCalled();
      expect(fn).not.toHaveBeenCalledWith(transforms[index + 1 + i]);
    });

    if (!Either.left(result)) {
      fail();
    }

    expect(result.error).toBe(error);
  });
});
