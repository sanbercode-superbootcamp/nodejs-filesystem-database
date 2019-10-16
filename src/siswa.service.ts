import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { getSiswa, getSiswaAll, addSiswa, updateSiswa, deleteSiswa } from "./siswa";
import { SORT_DIRECTION, SISWA_SORT_BY } from "./sqlite";
import { writeLogs, readLogs } from "./log-writer";


export async function getSiswaService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if (!query['name']) {
        _400(res);
        return;
    }

    const name = query['name'].toString();

    res.setHeader("Content-Type", "application/json");
    try {
        const row = await getSiswa(name);
        console.log(row);
        writeLogs('./logs/logs.txt', "User melihat detail siswa");
        res.write(JSON.stringify(row));
        res.end();
    } catch (err) {
        res.write(err);
        res.end();
    }
}

export async function getSiswaAllService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;
    console.log(query);

    let sortBy: SISWA_SORT_BY = SISWA_SORT_BY.name;


    if (query['sortBy'] && (query['sortBy'].toString() != SISWA_SORT_BY.classroom && query['sortBy'].toString() != SISWA_SORT_BY.name)) {
        _400(res);
        return;
    } else if (query['sortBy'] && query['sortBy'].toString() == SISWA_SORT_BY.classroom) {
        sortBy = SISWA_SORT_BY.classroom;
    }

    let sortDirection: SORT_DIRECTION; SORT_DIRECTION.ASC;

    if (query['sortDirection'] && (query['sortDirection'].toString() != SORT_DIRECTION.DESC && query['sortDirection'].toString() != SORT_DIRECTION.ASC)) {
        _400(res);
        return;
    } else if (query['sortDirection'] && query['sortBy'].toString() == SORT_DIRECTION.DESC) {
        sortDirection = SORT_DIRECTION.DESC;
    }

    let limit: number;
    if (query['limit']) {
        console.log("LIMIT", query['limit'])
        const check = parseInt(query['limit'].toString());
        if (isNaN(check)) {
            _400(res);
            return;
        }
        limit = check;
    }

    let offset: number;
    if (query['offset']) {
        const check = parseInt(query['offset'].toString());
        if (isNaN(check)) {
            _400(res);
            return;
        }
        offset = check;
    }

    let classroom;
    if (query['classroom']) {
        classroom = query['classroom'].toString();
    }
    // const name = query['name'].toString();

    res.setHeader("Content-Type", "application/json");
    try {
        const rows = await getSiswaAll(sortBy, sortDirection, limit, offset, classroom);
        console.log(rows);
        writeLogs('./logs/logs.txt', "User melihat list siswa");
        res.write(JSON.stringify(rows));
        res.end();
    } catch (err) {
        res.write(err);
        res.end();
    }
}

export async function addSiswaService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if (!query['name'] || !query['classroom']) {
        _400(res);
        return;
    }

    const name = query['name'].toString();
    const classroom = query['classroom'].toString();

    res.setHeader("Content-Type", "application/json");
    try {
        const row = await addSiswa({ name: name, classroom: classroom });
        console.log(row);
        writeLogs('./logs/logs.txt', `User menambahkan siswa ${name}`);
        res.write(JSON.stringify(row));
        res.end();
    } catch (err) {
        res.write(err);
        res.end();
    }
}

export async function updateSiswaService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if (!query['name'] || !query['classroom']) {
        _400(res);
        return;
    }

    const name = query['name'].toString();
    const classroom = query['classroom'].toString();

    res.setHeader("Content-Type", "application/json");
    try {
        const row = await updateSiswa(name, classroom);
        console.log(row);
        writeLogs('./logs/logs.txt', `User mengubah kelas ${name} menjadi ${classroom}`);
        res.write(JSON.stringify(row));
        res.end();
    } catch (err) {
        res.write(err);
        res.end();
    }
}

export async function deleteSiswaService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    if (!query['name']) {
        _400(res);
        return;
    }

    const name = query['name'].toString();

    res.setHeader("Content-Type", "application/json");
    try {
        const row = await deleteSiswa(name);
        console.log(row);
        writeLogs('./logs/logs.txt', `User menghapus siswa ${name}`);
        res.write(JSON.stringify(row));
        res.end();
    } catch (err) {
        res.write(err);
        res.end();
    }
}

export async function logsService(req: IncomingMessage, res: ServerResponse) {
    const url = parse(req.url, true);
    const query = url.query;

    res.setHeader("Content-Type", "application/json");
    try {
        const row = await readLogs('./logs/logs.txt');
        console.log(row);
        res.write(JSON.stringify(row));
        res.end();
    } catch (err) {
        res.write(err);
        res.end();
    }
}

function _400(res: ServerResponse) {
    res.statusCode = 400;
    res.end();
}
