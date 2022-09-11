import fs from "fs";

export const touch = async (
  filepath: string,
  time: Date = new Date(),
): Promise<void> => fs.promises.utimes(filepath, time, time);
