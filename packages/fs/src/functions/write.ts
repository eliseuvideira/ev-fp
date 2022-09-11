import fs from "fs";

export interface WriteOptions {
  encoding?: BufferEncoding;
  mode?: string;
}

export const write = async (
  filepath: string,
  content: string | Buffer,
  options?: WriteOptions,
): Promise<void> => fs.promises.writeFile(filepath, content, options);
