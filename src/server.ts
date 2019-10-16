import { createServer } from 'http';
import { parse } from 'url';
import { selectAllSiswaSVC, infoSiswaSVC, selectSiswaSVC, insertSiswaSVC, deleteSiswaSVC, updateSiswaSVC } from './sqlite.service'

const server = createServer(function(req, res) {
    const url = parse(req.url, true);
    switch (url.pathname){
        case '/siswa/list/':
            selectAllSiswaSVC(req, res);
            //tulisService(req, res);
            break;
        case '/siswa':
            infoSiswaSVC(req, res);
            break;
        case '/siswa/list':
            selectSiswaSVC(req, res);
            break;
        case '/siswa/add':
            insertSiswaSVC(req, res);
            break;
        case '/siswa/delete':
            deleteSiswaSVC(req, res);
            break;
        case '/siswa/update':
            updateSiswaSVC(req, res);
            break;
        default:
            res.statusCode = 404;
            res.end();
    }
});

server.listen(3000);
console.log('Server running on http://localhost:3000');