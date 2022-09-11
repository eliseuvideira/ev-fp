export abstract class Maybe<T> {
  static of<T>(value: T) {
    return new Something<T>(value);
  }

  static null() {
    return new Nothing<null>();
  }

  static nothing<T>(maybe: Maybe<T>): maybe is Nothing<T> {
    return maybe.nothing();
  }

  static something<T>(maybe: Maybe<T>): maybe is Something<T> {
    return maybe.something();
  }

  public abstract type: "nothing" | "something";

  public abstract unwrap(): T | null;

  private nothing() {
    return this.type === "nothing";
  }

  private something() {
    return this.type === "something";
  }
}

export class Nothing<T> extends Maybe<T> {
  public type: "nothing";

  constructor() {
    super();

    this.type = "nothing";
  }

  public unwrap(): null {
    return null;
  }

  public map<Q>(_: (value: T) => Q): Maybe<T> {
    return new Nothing<T>();
  }
}

export class Something<T> extends Maybe<T> {
  public type: "something";
  private value: T;

  constructor(value: T) {
    super();

    this.value = value;
    this.type = "something";
  }

  public unwrap(): T {
    return this.value;
  }

  public map<Q>(fn: (value: T) => Q): Something<Q> {
    return new Something(fn(this.value));
  }
}
