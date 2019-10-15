import { createServer } from 'http';
import { parse } from 'url';
import { siswaService, listService, 
    addService, deleteService,
    updateService } from './sqlite.service';
import { bacaService } from './file.service';


const server = createServer(function(req, res){
    const url = parse(req.url);
    switch (url.pathname) {
        case '/siswa':
            siswaService(req, res);
            break;
        case '/siswa/list':
            listService(req, res);
            break;
        case '/siswa/add':
            addService(req, res);
            break;
        case '/siswa/delete':
            deleteService(req, res);
            break;
        case '/siswa/update':
            updateService(req, res);
            break;
        case '/logs':
            bacaService(req, res);
            break;
        default:
            res.statusCode = 404;
            res.end()
    }
});



server.listen(3000);


// import { Database } from 'sqlite3';


// const queryCreateTable = `CREATE TABLE IF NOT EXISTS siswa(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     classroom TEXT
// )`

// db.run(queryCreateTable, (err) => {
//     if(err){
//         console.log(`Gagal membuat table ${err}`);
//     }else{
//         console.log('Sukses membuat table')
//     }
    
// })
