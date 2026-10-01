import { accessSync, constants } from 'node:fs';

/** Throw unless /dev/kvm is readable and writable by this process. */
export function checkKvm(path = '/dev/kvm') {
  accessSync(path, constants.R_OK | constants.W_OK);
}
