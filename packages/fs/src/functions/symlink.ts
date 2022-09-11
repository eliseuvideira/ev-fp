import { stat } from "./stat";

export const symlink = async (filepath: string): Promise<boolean> => {
  const stats = await stat(filepath);

  return stats.isSymbolicLink();
};
