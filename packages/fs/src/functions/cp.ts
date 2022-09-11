import fs from "fs";

export interface CpOptions {
  force?: boolean;
  recursive?: boolean;
}

export const cp = async (
  source: string,
  target: string,
  options?: CpOptions,
): Promise<void> => fs.promises.cp(source, target, options);
