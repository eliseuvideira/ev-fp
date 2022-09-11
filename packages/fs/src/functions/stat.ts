import fs from "fs";

export const stat = async (filepath: string): Promise<fs.Stats> =>
  fs.promises.stat(filepath);
