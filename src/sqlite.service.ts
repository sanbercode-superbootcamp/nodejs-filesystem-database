import { IncomingMessage, ServerResponse } from "http";
import { SQLite, Siswa, SISWA_SORT_BY, SORT_DIRECTION} from './sqlite';
import { parse } from 'url';
import { tulis } from './file';

const dbSiswa = new SQLite('./database/siswa.db');

function mydate(){
    let current_datetime = new Date();
    return current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
}

export function siswaService(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;
    if(!query['name']){
        res.statusCode = 400;
        res.end();
    }

    dbSiswa.getSiswa(readSiswa, query['name'])

    function readSiswa(siswa : Siswa){
        tulis(`${mydate()}-User melihat detil siswa ${query['name']}`)
        res.write(JSON.stringify(siswa));
        res.end();
    }
}

export function listService(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;

    if(!query['sortby']){
        res.statusCode = 400;
        res.end();
    }
    dbSiswa.getList(readList, Number(query['limit']) , Number(query['offset']), query['sortby'], query['sortdir'], query['classroom']);

    function readList(siswa : Siswa){
        tulis(`${mydate()}-User melihat list siswa`)
        res.write(JSON.stringify(siswa));
        res.end();
    }
}

export function addService(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;
    if(!query['name'] || !query['classroom']){
        res.statusCode = 400;
        res.end();
    }
    dbSiswa.addSiswa(add, query['name'], query['classroom']);
    function add(status : Boolean){
        if(!status){
            res.statusCode = 400;
            res.end();
        }
        tulis(`${mydate()}-User menambahkan siswa ${query['name']}`)
        res.write('Siswa telah ditambahkan');
        res.end();
    }
}

export function deleteService(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;
    if(!query['name']){
        res.statusCode = 400;
        res.end();
    }
    dbSiswa.deleteSiswa(del, query['name']);
    function del(status : Boolean){
        if(!status){
            res.statusCode = 400;
            res.end();
        }
        tulis(`${mydate()}-User menghapus siswa ${query['name']}`)
        res.write(`Siswa ${query['name']} telah dihapus`);
        res.end();
    }
}

export function updateService(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;
    if(!query['name'] || !query['classroom']){
        res.statusCode = 400;
        res.end();
    }
    dbSiswa.updateSiswa(update, query['name'], query['classroom']);
    function update(status : Boolean){
        if(!status){
            res.statusCode = 400;
            res.end();
        }
        tulis(`${mydate()}-User mengubah kelas ${query['name']} menjadi ${query['classroom']} `)
        res.write(`Siswa ${query['name']} telah di-update`);
        res.end();
    }
}
