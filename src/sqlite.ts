import { Database } from "sqlite3";
import { appendFileSync } from 'fs';

const filename = 'logs.txt';

export interface Siswa {
    id?:number;
    name:string;
    classroom:string;
}

export enum SORT_BY {
    id = 'id',
    name = 'name',
    classroom = 'classroom'
}

export enum SORT_TYPE {
    asc = 'ASC',
    desc = 'DESC',
}

export class SQLite {
    db: Database;
    constructor(path: string) {
        this.db = new Database(path);
    }

    infoSiswa(name: string | string[], callback: Function) {
        const sql = `SELECT * FROM siswa WHERE name= ?`;
        
        this.db.get(sql, [name], (err, row) => {
            if(err){
                console.log(`Error mengambil data siswa: ${err}`)
                callback(err)
            } else {
                callback(null, row);
            }
        })
    };

    selectAllSiswa(callback: Function) {
        const sql = `SELECT * FROM siswa`;
        this.db.all(sql, (err, rows) => {
            if(err){
                console.log(`Error saat mengambil data siswa: ${err}`)
            } else {
                callback(rows);
            }
        })
    }

    selectSiswa(classroom: string | string[], sortBy: string | string[] = SORT_BY.id, sortType: string | string[] = SORT_TYPE.asc, limit, offset, callback: Function) {
        limit = parseInt(limit);
        offset = parseInt(offset);
        const sql = `SELECT * FROM siswa WHERE classroom = '${classroom}' ORDER BY ${sortBy} ${sortType} LIMIT ${limit} OFFSET ${offset}`;
        console.log(sql)
        this.db.all(sql, (err, rows) => {
            if(err){
                console.log(`Error saat mengambil data siswa: ${err}`)
                callback(err);
            } else {
                callback(rows);
            }
        })
    }

    insertSiswa(name: string | string[], classroom: string | string[], callback: Function) {
        const sql = `INSERT INTO siswa (name, classroom) VALUES (?,?)`;
        this.db.run(sql, [name, classroom], (err) => {
            if(err){
                callback(false)
                console.log(`Error membuat data siswa: ${err}`)
            } else {
                console.log(`Berhasil menambahkan siswa`);
                callback(true)
            }
        })
    }

    deleteSiswa(name: string | string[], callback: Function) {
        const sql = `DELETE FROM siswa WHERE name = ?`;
        this.db.run(sql, [name], (err) => {
            if(err){
                callback(false)
                console.log(`Error saat menghapus data siswa: ${err}`)
            } else {
                console.log(`Berhasil menghapus siswa ${name}`);
                callback(true)
            }
        })
    }

    updateSiswa(name: string | string[], classroom: string | string[], callback: Function) {
        const sql = `UPDATE siswa SET classroom = ? WHERE name = ?`;
        this.db.run(sql, [classroom, name], (err) => {
            if(err){
                callback(false)
                console.log(`Error saat mengubah kelas siswa: ${err}`)
            } else {
                console.log(`Berhasil mengubah kelas siswa ${name}`);
                callback(true)
            }
            console.log
        })
    }
};

export function outputLog(data: string | string[]): Boolean {

    try {
        console.log('data masuk');
        appendFileSync(filename, data);
        return true; 
    } catch(error) {
        console.log('ini error: ' + error);
        return error;
    }
}