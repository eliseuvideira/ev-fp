import { Either, Left, Right } from "../src/index";

describe("Either", () => {
  it("lifts a value with `Either.of` to an `Either` as `Right` value", () => {
    expect.assertions(5);

    const original = { id: Math.random() };

    const value = Either.of(original);

    expect(value).toBeDefined();
    expect(value.type).toBe("right");
    expect(Either.right(value)).toBe(true);
    expect(Either.left(value)).toBe(false);

    if (Either.left(value)) {
      fail();
    }

    const unwraped = value.unwrap();

    expect(unwraped).toBe(original);
  });

  it("lifts a value with `Either.error` to an `Either` as `Left` value", () => {
    expect.assertions(6);

    const error = new Error(`error: ${Math.random()}`);

    const value = Either.error(error);

    expect(value).toBeDefined();
    expect(value.type).toBe("left");
    expect(Either.right(value)).toBe(false);
    expect(Either.left(value)).toBe(true);

    if (Either.right(value)) {
      fail();
    }

    expect(value.error).toBe(error);

    try {
      value.unwrap();

      fail();
    } catch (err) {
      expect(err).toBe(error);
    }
  });

  it("checks an `Either` value to be `Left` with `Either.left`", () => {
    expect.assertions(2);

    const original = { id: Math.random() };

    const right = new Right(original);

    expect(Either.left(right)).toBe(false);

    const error = new Error(`error: ${Math.random()}`);

    const left = new Left(error);

    expect(Either.left(left)).toBe(true);
  });

  it("checks an `Either` value to be `Right` with `Either.right`", () => {
    expect.assertions(2);

    const original = { id: Math.random() };

    const right = new Right(original);

    expect(Either.right(right)).toBe(true);

    const error = new Error(`error: ${Math.random()}`);

    const left = new Left(error);

    expect(Either.right(left)).toBe(false);
  });

  it("has `type` attribute", () => {
    expect.assertions(2);

    const original = { id: Math.random() };

    const right = new Right(original);

    expect(right.type).toBe("right");

    const error = new Error(`error: ${Math.random()}`);

    const left = new Left(error);

    expect(left.type).toBe("left");
  });
});

describe("Left", () => {
  it("unwraps throwing error", () => {
    expect.assertions(1);

    const error = new Error(`error: ${Math.random()}`);

    const left = new Left(error);

    try {
      left.unwrap();

      fail();
    } catch (err) {
      expect(err).toBe(error);
    }
  });

  it("maps creating a new instace of itself with the error without calling the mapper function", () => {
    expect.assertions(3);

    const error = new Error(`error: ${Math.random()}`);

    const left = new Left(error);

    const fn = jest.fn();

    const output = left.map(fn);

    expect(Either.left(output)).toBe(true);
    expect(output.error).toBe(left.error);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe("Right", () => {
  it("unwraps returning the value", () => {
    expect.assertions(1);

    const original = { id: Math.random() };

    const right = new Right(original);

    const unwrapped = right.unwrap();

    expect(unwrapped).toBe(original);
  });

  it("maps creating a new instace of itself with the transformed value invoking the mapper function", () => {
    expect.assertions(4);

    const original = { id: Math.random() };

    const transformed = { id: Math.random() };

    const right = new Right(original);

    const fn = jest.fn(() => transformed);

    const output = right.map(fn);

    expect(Either.right(output)).toBe(true);

    const value = output.unwrap();

    expect(value).toBe(transformed);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(original);
  });
});
