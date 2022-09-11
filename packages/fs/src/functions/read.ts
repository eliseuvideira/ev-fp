import fs from "fs";

export interface ReadOptions {
  encoding?: BufferEncoding;
}

export const read = async (
  filepath: string,
  options?: ReadOptions,
): Promise<Buffer> =>
  fs.promises.readFile(filepath, options).then((buffer) => Buffer.from(buffer));
