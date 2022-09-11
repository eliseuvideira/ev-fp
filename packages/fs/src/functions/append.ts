import fs from "fs";

export interface AppendOptions {
  encoding?: BufferEncoding;
  mode?: string;
}

export const append = async (
  filepath: string,
  content: string | Buffer,
  options?: AppendOptions,
): Promise<void> => fs.promises.appendFile(filepath, content, options);
