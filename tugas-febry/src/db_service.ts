import { IncomingMessage, ServerResponse } from "http";
import { parse, resolve } from "url";
import * as moduleDb from "./sqlite"
import { tulis } from "./file";

const db = new moduleDb.SQLite('./database/siswa.db');

function getCurrentDateTime(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, '0');
    // const currentHours = today.getHours();
    // const hours = ("0" + currentHours).slice(-2);
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    const date = mm + '/' + dd + '/' + yyyy;
    const currentDateTime = date + ' ' + time;
    return currentDateTime;
}

export function getRowsService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    let objParam: moduleDb.GetRowsParam = query;
    console.log(objParam);

    db.getRows(objParam)
        .then((rows) => {
            const length = Object.keys(rows).length;
            console.log(rows);
            console.log(length);


            tulis(getCurrentDateTime() + ' User melihat list siswa');
            if (length > 0) {
                res.write(JSON.stringify(rows));
            } else {
                res.write('data kosong');
            }
            res.end();
        })
        .catch((err) => {
            res.statusCode = 400;
            res.end();
        });
}

export function getDetailService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if (!query['name']) {
        res.statusCode = 400;
        res.end();
        return;
    }

    db.getDetail(query['name'])
        .then((row) => {
            const length = Object.keys(row).length;
            console.log(length);
            console.log(row);
            tulis(getCurrentDateTime() + ' User melihat detail siswa');
            if (length > 0) {

                res.write(JSON.stringify(row));
            } else {
                res.write('data kosong');
            }
            res.end();
        })
        .catch((err) => {
            console.log(err);

            res.statusCode = 400;
            res.end();
        })
}

export function insertSiswaService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if (!query['name'] || !query['classroom']) {
        res.statusCode = 400;
        res.end();
        return;
    }

    tulis(getCurrentDateTime() + ' User menambahkan siswa ' + query['name'].toString().toUpperCase());
    db.insertData(query).then((resolve) => {
        console.log(resolve);
    }).catch((err) => {
        console.log(err);

    });
    res.end();
}

export function updateSiswaService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if (!query['siswa'] || !query['classroom']) {
        res.statusCode = 400;
        res.end();
        return;
    }

    db.updateData(query)
        .then((resolve) => {
            tulis(getCurrentDateTime() + ' User mengubah kelas ' + query['siswa'].toString().toUpperCase() + ' menjadi ' + query['classroom']);
            console.log(resolve);
        })
        .catch((err) => {
            console.log(err);
        });
    res.end();
}

export function deleteSiswaService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if (!query['name']) {
        res.statusCode = 400;
        res.end();
        return;
    }


    db.deleteData(query['name'])
        .then((resolve) => {
            console.log(resolve);
            tulis(getCurrentDateTime() + ' User menghapus siswa ' + query['name'].toString().toUpperCase());
            res.end();

        }).catch((err) => {
            console.log(err);
            res.statusCode = 400;
            res.end();
        });
}