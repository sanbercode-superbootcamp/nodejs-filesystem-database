import { IncomingMessage, ServerResponse } from "http";
import { readLog } from "./log";

export function readLogService(req:IncomingMessage, res:ServerResponse) {
  const output = readLog();
  if (!output) {
    res.statusCode = 400;
    res.end();
  } else {
    res.write(output);
    res.end();
  }
}