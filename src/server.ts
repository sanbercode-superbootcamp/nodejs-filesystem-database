import { parse } from 'url'
import { createServer } from 'http'
import { siswaService, insertRowService, updateRowService, deleteRowService, logService, getListService } from './sqlite.service'

const server = createServer(function (req, res) {
    const url = parse(req.url, true)
    switch (url.pathname) {
        case '/siswa':
            siswaService(req, res)
            break;

        case '/siswa/list' :
            getListService(req, res)
            break;
        
        case '/siswa/insert' :
            insertRowService(req, res)
            break;

        case '/siswa/update' :
            updateRowService(req, res)
            break;

        case '/siswa/delete' :
            deleteRowService(req, res)
            break;

        case '/logs' :
            logService(req, res)
            break;

        default:
            res.statusCode = 404
            res.end()
    }
})

server.listen(3000)