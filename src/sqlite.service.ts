import { IncomingMessage, ServerResponse } from "http";
import { parse } from 'url';
import { SQLite, Siswa, outputLog } from './sqlite';

const dbSiswa = new SQLite('./dist/db/siswa.db');

// export function readOne(error: string, siswa: Siswa) {
//     console.log(siswa);
// }

export function infoSiswaSVC(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if(!query['name']){
        res.statusCode = 400;
        res.end();
    }
    const name = query['name'];
   
    dbSiswa.infoSiswa(name, (error: string, siswa: Siswa) => {
        if(error){
            console.log(error)
            res.statusCode = 400;
            res.end();
            return;
        }
        res.write(JSON.stringify(siswa));
        let log = `${dateString()} ${timeString()} - User melihat detail siswa ${name}.\n`
        console.log(log);
        outputLog(log);
        res.end();
    });
    
}

export function selectAllSiswaSVC(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    // const query = url.query;

    // if(!query['name']){
    //     res.statusCode = 400;
    //     res.end();
    // }
    // const name = query['name'].toString();
   
    dbSiswa.selectAllSiswa( data => {
        let log = `${dateString()} ${timeString()} - User melihat detail semua siswa.\n`
        console.log(log);
        outputLog(log);
        res.write(JSON.stringify(data))
        res.end();
    });
    
}

export function selectSiswaSVC(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if(!query['classroom'] || !query['sortBy'] || !query['sortType'] || !query['limit'] || !query['offset']){
        res.statusCode = 400;
        res.end();
    }
    const classroom = query['classroom'];
    const sortBy = query['sortBy'];
    const sortType = query['sortType'];
    const limit = query['limit'];
    const offset = query['offset'];
    
    dbSiswa.selectSiswa(classroom, sortBy, sortType, limit, offset, (siswa: Siswa, error: string) => {
        if(error){
            console.log(error)
            res.statusCode = 400;
            res.end();
            return;
        }
        let log = `${dateString()} ${timeString()} - User melihat detail siswa dengan filter ${classroom}, ${sortBy}, ${sortType}, limit=${limit}, offset=${offset}.\n`
        console.log(log);
        outputLog(log);
        res.write(JSON.stringify(siswa))
        res.end();
    });
    
}

export function insertSiswaSVC(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if(!query['name'] || !query['classroom']){
        res.statusCode = 400;
        res.end();
    }
    const classroom = query['classroom'].toString()
    const name = query['name'].toString()

    dbSiswa.insertSiswa(name, classroom, (status) => {
        if(!status){
            res.statusCode = 400;
            res.end();
        }
        let log = `${dateString()} ${timeString()} - User menambahkan siswa ${name} di kelas ${classroom}.\n`
        console.log(log);
        outputLog(log);
        res.write(`siswa ${name} dengan kelas ${classroom} berhasil ditambahkan`);
        res.end();
    })   
}

export function deleteSiswaSVC(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if(!query['name']){
        res.statusCode = 400;
        res.end();
    }
    const name = query['name'].toString()

    dbSiswa.deleteSiswa(name, (status) => {
        if(!status){
            res.statusCode = 400;
            res.end();
        }
        let log = `${dateString()} ${timeString()} - User menghapus siswa ${name}.\n`
        console.log(log);
        outputLog(log);
        res.write(`siswa ${name} berhasil dihapus`);
        res.end();
    })   
}

export function updateSiswaSVC(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if(!query['name'] || !query['classroom']){
        res.statusCode = 400;
        res.end();
    }
    const name = query['name'].toString()
    const classroom = query['classroom'].toString()

    dbSiswa.updateSiswa(name, classroom, (status) => {
    console.log(status)
        if(!status){
            res.statusCode = 400;
            res.end();
        }
        let log = `${dateString()} ${timeString()} - User mengubah kelas ${name} menjadi ${classroom}.\n`
        console.log(log);
        outputLog(log);
        res.write(`kelas siswa ${name} diubah menjadi ${classroom}`);
        res.end();
    })   
}

function dateString() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth(); //Be careful! January is 0 not 1
    let year = currentDate.getFullYear();

    return `${date}-${(month + 1)}-${year}`;
}

function timeString() {
    let currentTime = new Date;
    let seconds = currentTime.getSeconds();
    let minutes = currentTime.getMinutes();
    let hour = currentTime.getHours();

    return `${hour}:${minutes}:${seconds}`;
}