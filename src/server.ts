import { createServer, ServerResponse } from 'http';
import { parse } from 'url';
import { filePath, detailSiswaService, listSiswaService, addSiswaService, deleteSiswaService, updateSiswaService, logsService } from './db.service';
import { readFile, writeFile } from 'fs';

const server = createServer(function (req, res) {
    const url = parse(req.url, true);
    switch (url.pathname) {
        case '/siswa': //detail siswa berdasarkan nama
            detailSiswaService(req, res, (err, data) => {
                if (err) {
                    setError(err, res);
                    return;
                }
                if (!data) {
                    data = 'Tidak ada hasil!';
                }

                res.write(JSON.stringify(data));
                res.end();
            });
            break;
        case '/siswa/list':
            listSiswaService(req, res, (err, datas) => {
                if (err) {
                    setError(err, res);
                    return;
                }
                console.table(datas);
                res.write(JSON.stringify(datas));
                res.end();
            });
            break;
        case '/siswa/add':
            addSiswaService(req, res, (err, message) => {
                if (err) {
                    setError(err, res);
                    return;
                }
                res.write(message);
                res.end();
            });
            break;
        case '/siswa/update':
            updateSiswaService(req, res, (err, message) => {
                if (err) {
                    setError(err, res);
                    return;
                }
                res.write(message);
                res.end();
            });
            break;
        case '/siswa/delete':
            deleteSiswaService(req, res, (err, message) => {
                if (err) {
                    setError(err, res);
                    return;
                }
                res.write(message);
                res.end();
            });
            break;
        case '/logs':
            readFile(filePath, (err, data) => {
                if (err) {
                    setError(err.toString(), res);
                    return;
                }
                res.write(data);
                res.end()
            });
            break;
        default:
            res.statusCode = 404;
            res.end();
            break;
    }
});


server.listen(8000);

function setError(err: string, res: ServerResponse) {
    res.statusCode = 400;
    res.statusMessage = err;
    res.end();
}