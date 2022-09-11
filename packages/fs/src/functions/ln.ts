import fs from "fs";

export const ln = async (source: string, target: string): Promise<void> =>
  fs.promises.symlink(source, target);
