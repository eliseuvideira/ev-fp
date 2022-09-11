import { stat } from "./stat";

export const exists = async (filepath: string): Promise<boolean> => {
  try {
    await stat(filepath);

    return true;
  } catch (err: any) {
    if (err && err.code == "ENOENT") {
      return false;
    }

    throw err;
  }
};
