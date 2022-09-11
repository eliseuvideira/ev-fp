import { append } from "../functions/append";
import { chmod } from "../functions/chmod";
import { chown } from "../functions/chown";
import { cp } from "../functions/cp";
import { directory } from "../functions/directory";
import { exists } from "../functions/exists";
import { file } from "../functions/file";
import { ln } from "../functions/ln";
import { mkdir } from "../functions/mkdir";
import { read } from "../functions/read";
import { rm } from "../functions/rm";
import { stat } from "../functions/stat";
import { symlink } from "../functions/symlink";
import { touch } from "../functions/touch";
import { write } from "../functions/write";

export const FS = {
  append,
  chmod,
  chown,
  cp,
  directory,
  exists,
  file,
  ln,
  mkdir,
  read,
  rm,
  stat,
  symlink,
  touch,
  write,
};
