import { createServer } from 'http';
import { parse } from 'url';
import { getRowsService, getDetailService, insertSiswaService, deleteSiswaService, updateSiswaService } from './db_service';

const server = createServer((req, res) => {
    const url = parse(req.url, true);
    switch (url.pathname) {
        case '/siswa':
            getDetailService(req, res);
            break;
        case '/siswa/list':
            getRowsService(req, res);
            break;
        case '/siswa/add':
            insertSiswaService(req, res);
            break;
        case '/siswa/update':
            updateSiswaService(req, res);
            break;
        case '/siswa/delete':
            deleteSiswaService(req, res);
            break;
        default:
            res.statusCode = 400;
            res.end();
            break;
    }
})

const port = 3000;
server.listen(port);

server.on('listening', () => console.log(`listen on ${port}`));