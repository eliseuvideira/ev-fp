import { stat } from "./stat";

export const directory = async (filepath: string): Promise<boolean> => {
  const stats = await stat(filepath);

  return stats.isDirectory();
};
