import { IncomingMessage, ServerResponse } from "http";
import { baca } from './file';

export function bacaService(req: IncomingMessage, res: ServerResponse){

    res.write(baca().toString())
    res.end()
}