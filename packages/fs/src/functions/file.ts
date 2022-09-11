import { stat } from "./stat";

export const file = async (filepath: string): Promise<boolean> => {
  const stats = await stat(filepath);

  return stats.isFile();
};
