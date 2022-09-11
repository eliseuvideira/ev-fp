import fs from "fs";

export const chmod = async (filepath: string, mode: string): Promise<void> =>
  fs.promises.chmod(filepath, mode);
