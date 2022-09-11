import { sayHello } from "../src/index";

describe("sayHello", () => {
  it("prints Hello World to the console", () => {
    expect.assertions(2);

    const log = jest.fn();

    const _ = console.log;
    console.log = log;
    try {
      sayHello();
    } finally {
      console.log = _;
    }

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith("Hello World");
  });
});
