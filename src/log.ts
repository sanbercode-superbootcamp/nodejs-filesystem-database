import { appendFileSync, readFileSync } from "fs";

const filename = 'logs.txt';

export function writeLog(data: string | string[]): Boolean {
  try {
    appendFileSync(filename, `${data} \n`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function readLog(): string {
  try {
    return readFileSync(filename).toString();
  } catch (error) {
    return error;
  }
}