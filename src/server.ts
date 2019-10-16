import { createServer } from "http";
import { addSiswa, updateSiswa, deleteSiswa, getSiswa, getSiswaAll } from "./siswa";
import { parse } from "url";
import { getSiswaService, getSiswaAllService, addSiswaService, updateSiswaService, deleteSiswaService, logsService } from "./siswa.service";
import { writeLogs, readLogs } from "./log-writer";


const server = createServer((req, res) => {
    const url = parse(req.url);

    switch (url.pathname) {
        case '/siswa':
            getSiswaService(req, res);
            break;
        case '/siswa/list':
            getSiswaAllService(req, res);
            break;
        case '/siswa/add':
            addSiswaService(req, res);
            break;
        case '/siswa/delete':
            deleteSiswaService(req, res);
            break;
        case '/siswa/update':
            updateSiswaService(req, res);
            break;
        case '/logs':
            logsService(req, res);
            break;
        default:
            res.statusCode = 404;
            res.end();
    }
});
async function ngetest() {
    // const res = await add({ name: "robith", classroom: "1A" });
    // console.log(res);
    // const res = await update("robith", "1B");
    // console.log(res);
    // const res = await deleteSiswa("saban");
    // console.log(res);
    // const res2 = await getSiswa("robith");
    // console.log(res2);
    // const res = await getSiswaAll(undefined, undefined, 30, 0);
    // console.log(res);
    // const res = await writeLogs('./logs/logs.txt', "hihi");
    // console.log(res);
    // const res = await readLogs('./logs/logs.txt');
    // console.log(res);
}

ngetest();

server.listen(3000, () => {
    console.log("server listen on 3000");
})