import fs from "fs";

export interface RmOptions {
  force?: boolean;
  recursive?: boolean;
}

export const rm = async (
  filepath: string,
  options?: RmOptions,
): Promise<void> => fs.promises.rm(filepath, options);
