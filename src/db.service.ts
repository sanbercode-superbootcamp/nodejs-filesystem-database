import { Database } from 'sqlite3';
import { IncomingMessage, ServerResponse } from 'http';
import { Query, SQLite } from './sqlite';
import { parse } from 'url';
import { writeFile, readFile } from 'fs';

const dbSiswa = new SQLite('./db/siswa.db');

const NO_NAME_ERR = 'Tidak ada query \'name\'';
const NO_ADD_PARAMETER = 'Tidak ada query name dan classroom';

export const filePath = './assets/logs.txt';

export function detailSiswaService(req: IncomingMessage, res: ServerResponse, callback: Function) {
    const url = parse(req.url, true);
    const query = url.query;
    //cek apa querynya ada nama 
    if (!query['name']) {
        callback(new Error(NO_NAME_ERR), null);
    }
    //console.log(typeof query['name']);
    dbSiswa.getRow(query['name'])
        .then((rows) => {
            const message = new Date().toLocaleString() + ` User melihat detail siswa ${query['name']}\n`;
            writeFile(filePath, message, { flag: 'a' }, (err) => {
                if (err) console.log(err);
                console.log(message);
            });
            callback(null, rows);
        })
        .catch((err) => {
            callback(err, null);
        });
}

export function listSiswaService(req: IncomingMessage, res: ServerResponse, callback: Function) {
    const url = parse(req.url, true);
    const query = url.query;

    const options: Query = query;

    dbSiswa.getRows(options)
        .then((rows) => {
            const message = new Date().toLocaleString() + ` User melihat list siswa.\n`;
            writeFile(filePath, message, { flag: 'a' }, (err) => {
                if (err) console.log(err);
                console.log(message);
            });
            callback(null, rows);
        })
        .catch((err) => {
            callback(err, null);
        });
}

export function addSiswaService(req: IncomingMessage, res: ServerResponse, callback: Function) {
    const url = parse(req.url, true);
    const query = url.query;
    //cek apa querynya ada nama dan kelas
    if (!query['name'] && !query['classroom']) {
        callback(new Error(NO_ADD_PARAMETER), null);
    }

    //console.log(query);
    dbSiswa.insertRow(query['name'], query['classroom'])
        .then((status) => {
            const message = new Date().toLocaleString() + ` User menambahkan siswa ${query['name']}\n`;
            writeFile(filePath, message, { flag: 'a' }, (err) => {
                if (err) console.log(err);
                console.log(message);
            });
            callback(null, message);
        })
        .catch((err) => {
            callback(err, null);
        });
}


export function deleteSiswaService(req: IncomingMessage, res: ServerResponse, callback: Function) {
    const url = parse(req.url, true);
    const query = url.query;
    //cek apa querynya ada nama dan kelas
    if (!query['name']) {
        callback(new Error(NO_NAME_ERR), null);
    }

    console.log(query);
    dbSiswa.deleteRowByName(query['name'])
        .then((status) => {
            const message = new Date().toLocaleString() + ` User menghapus siswa ${query['name']}\n`;
            writeFile(filePath, message, { flag: 'a' }, (err) => {
                if (err) console.log(err);
                console.log(message);
            });
            callback(null, message);
        })
        .catch((err) => {
            callback(err, null);
        });
}


export function updateSiswaService(req: IncomingMessage, res: ServerResponse, callback: Function) {
    const url = parse(req.url, true);
    const query = url.query;
    //cek apa querynya ada nama dan kelas
    if (!query['name'] && !query['classroom']) {
        callback(new Error(NO_ADD_PARAMETER), null);
    }

    dbSiswa.updateRow(query['name'], query['classroom'])
        .then((status) => {
            const message = new Date().toLocaleString() + ` User mengubah kelas ${query['name']} menjadi ${query['classroom']}\n`;
            writeFile(filePath, message, { flag: 'a' }, (err) => {
                if (err) console.log(err);
                console.log(message);
            });
            callback(null, message);
        })
        .catch((err) => {
            callback(err, null);
        });
}

export function logsService(req: IncomingMessage, res: ServerResponse, callback: Function) {
    readFile(filePath, callback());
}