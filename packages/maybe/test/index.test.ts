import { Maybe } from "../src/index";

describe("Maybe", () => {
  it("lifts a value with `Maybe.of` to an `Maybe` as `Something` value", () => {
    expect.assertions(5);

    const original = { id: Math.random() };

    const value = Maybe.of(original);

    expect(value).toBeDefined();
    expect(value.type).toBe("something");
    expect(Maybe.something(value)).toBe(true);
    expect(Maybe.nothing(value)).toBe(false);

    if (Maybe.nothing(value)) {
      fail();
    }

    const unwraped = value.unwrap();

    expect(unwraped).toBe(original);
  });

  it("lifts a value with `Maybe.null` to an `Maybe` as `Nothing` value", () => {
    expect.assertions(5);

    const value = Maybe.null();

    expect(value).toBeDefined();
    expect(value.type).toBe("nothing");
    expect(Maybe.something(value)).toBe(false);
    expect(Maybe.nothing(value)).toBe(true);

    if (Maybe.something(value)) {
      fail();
    }

    const unwrapped = value.unwrap();

    expect(unwrapped).toBe(null);
  });

  it("checks an `Maybe` value to be `Nothing` with `Maybe.nothing`", () => {
    expect.assertions(2);

    const original = { id: Math.random() };

    const something = Maybe.of(original);

    expect(Maybe.nothing(something)).toBe(false);

    const nothing = Maybe.null();

    expect(Maybe.nothing(nothing)).toBe(true);
  });

  it("checks an `Maybe` value to be `Something` with `Maybe.something`", () => {
    expect.assertions(2);

    const original = { id: Math.random() };

    const something = Maybe.of(original);

    expect(Maybe.something(something)).toBe(true);

    const nothing = Maybe.null();

    expect(Maybe.something(nothing)).toBe(false);
  });

  it("has `type` attribute", () => {
    expect.assertions(2);

    const original = { id: Math.random() };

    const something = Maybe.of(original);

    expect(something.type).toBe("something");

    const nothing = Maybe.null();

    expect(nothing.type).toBe("nothing");
  });
});

describe("Nothing", () => {
  it("unwraps returning null", () => {
    expect.assertions(1);

    const nothing = Maybe.null();

    const value = nothing.unwrap();

    expect(value).toBe(null);
  });

  it("maps creating a new instace of itself without calling the mapper function", () => {
    expect.assertions(2);

    const nothing = Maybe.null();

    const fn = jest.fn();

    const output = nothing.map(fn);

    expect(Maybe.nothing(output)).toBe(true);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe("Something", () => {
  it("unwraps returning the value", () => {
    expect.assertions(1);

    const original = { id: Math.random() };

    const something = Maybe.of(original);

    const unwrapped = something.unwrap();

    expect(unwrapped).toBe(original);
  });

  it("maps creating a new instace of itself with the transformed value invoking the mapper function", () => {
    expect.assertions(4);

    const original = { id: Math.random() };

    const transformed = { id: Math.random() };

    const something = Maybe.of(original);

    const fn = jest.fn(() => transformed);

    const output = something.map(fn);

    expect(Maybe.something(output)).toBe(true);

    const value = output.unwrap();

    expect(value).toBe(transformed);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(original);
  });
});
