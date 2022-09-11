export abstract class Either<T> {
  static of<T>(value: T): Right<T> {
    return new Right<T>(value);
  }

  static error<T, E extends Error>(error: E): Left<T> {
    return new Left<T, E>(error);
  }

  static right<T>(either: Either<T>): either is Right<T> {
    return either.right();
  }

  static left<T>(either: Either<T>): either is Left<T> {
    return either.left();
  }

  public abstract unwrap(): T | never;

  public abstract map<Q>(fn: (value: T) => Q): Right<Q> | Left<T>;

  public abstract type: "left" | "right";

  private left() {
    return this.type === "left";
  }

  private right() {
    return this.type === "right";
  }
}

export class Left<T, E extends Error = Error> extends Either<T> {
  public error: E;

  public type: "left";

  constructor(error: E) {
    super();

    this.type = "left";

    this.error = error;
  }

  public unwrap(): never {
    throw this.error;
  }

  public map<Q>(_: (value: T) => Q): Left<T, E> {
    return new Left(this.error);
  }
}

export class Right<T> extends Either<T> {
  private value: T;

  public type: "right";

  constructor(value: T) {
    super();

    this.type = "right";

    this.value = value;
  }

  public unwrap(): T {
    return this.value;
  }

  public map<Q>(fn: (value: T) => Q): Right<Q> {
    return new Right(fn(this.value));
  }
}
