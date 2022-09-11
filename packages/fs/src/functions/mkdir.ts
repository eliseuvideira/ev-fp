import fs from "fs";

export interface MkdirOptions {
  recursive?: boolean;
  mode?: string;
}

export const mkdir = async (
  path: string,
  options?: MkdirOptions,
): Promise<void> => {
  await fs.promises.mkdir(path, options);
};
