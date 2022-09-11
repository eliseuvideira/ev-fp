import fs from "fs";

export const chown = async (
  filepath: string,
  uid: number,
  gid: number,
): Promise<void> => fs.promises.chown(filepath, uid, gid);
