import { Either } from "@ev-fp/either";

export class IO<T> {
  static of<T>(value: T) {
    return IO.from(async () => value);
  }

  static from<T>(fn: () => Promise<T>) {
    return new IO<T>(fn);
  }

  private effect: () => Promise<T>;

  constructor(fn: () => Promise<T>) {
    this.effect = fn;
  }

  public map<Q>(fn: (value: T) => Promise<Q>) {
    return IO.from(async () => {
      const either = await this.run();

      const unwrapped = either.unwrap();

      const result = await fn(unwrapped);

      return result;
    });
  }

  public async run(): Promise<Either<T>> {
    try {
      const result = await this.effect();

      return Either.of<T>(result);
    } catch (err: any) {
      return Either.error<T, Error>(err);
    }
  }
}
