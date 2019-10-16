import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { SQLite, Siswa, tulis, baca } from './sqlite'

function getDateTime() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    return dateTime
}

const dbSiswa = new SQLite('./database/siswa.db')
function read(siswa:Siswa) {
    console.log(siswa)
}

export function siswaService(req:IncomingMessage, res:ServerResponse) {
    const status = tulis(String(getDateTime()) + '\tMenampilkan data Siswa')
    if(!status){
        res.statusCode = 400
        res.end()
    }

    dbSiswa.getRows(read)
    res.write('menampilkan semua data')
    res.end()
}

export function getListService(req: IncomingMessage, res: ServerResponse){
    const url = parse(req.url, true);
    const query = url.query;

    if(!query['sortby']){
        res.statusCode = 400;
        res.end();
    }

    dbSiswa.getList(
        read,
        parseInt(String(query['limit'])), 
        parseInt(String(query['offset'])), 
        String(query['sortby']), 
        String(query['sortdir']), 
        String(query['classroom']))
    res.write('menampilkan data pilihan')
    res.end()
}

export function insertRowService(req:IncomingMessage, res:ServerResponse) {
    const url = parse(req.url, true)
    const query = url.query
    if(!query['name'] || !query['classroom']){
        res.statusCode = 400
        res.end()
    }

    const status = tulis(String(getDateTime()) + '\tMenambah data Siswa')
    if(!status){
        res.statusCode = 400
        res.end()
    }

    dbSiswa.insertRow(String(query['name']), String(query['classroom']))
    res.write('berhasil menambah data')
    res.end()
}

export function updateRowService(req:IncomingMessage, res:ServerResponse) {
    const url = parse(req.url, true)
    const query = url.query
    if(!query['name'] || !query['classroom']){
        res.statusCode = 400
        res.end()
    }

    const status = tulis(String(getDateTime()) + '\tMenyunting data Siswa')
    if(!status){
        res.statusCode = 400
        res.end()
    }

    dbSiswa.updateRow(String(query['name']), String(query['classroom']))
    res.write('berhasil update data')
    res.end()
}

export function deleteRowService(req:IncomingMessage, res:ServerResponse) {
    const url = parse(req.url, true)
    const query = url.query
    if(!query['name']){
        res.statusCode = 400
        res.end()
    }

    const status = tulis(String(getDateTime()) + '\tMenghapus data Siswa')
    if(!status){
        res.statusCode = 400
        res.end()
    }

    dbSiswa.deleteRow(String(query['name']))
    res.write('berhasil hapus data')
    res.end()
}

export function logService(req: IncomingMessage, res: ServerResponse) {
    const status = baca()
    res.write(status.toString())
    res.end()
}