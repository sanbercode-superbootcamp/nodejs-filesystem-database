import { Database } from 'sqlite3';

export interface Siswa{
    id?: number;
    name: string;
    classroom: string;
}

export enum SISWA_SORT_BY {
    NAME = 'name',
    CLASSROOM = 'classroom'
}

export enum SORT_DIRECTION{
    ASC = 'ASC',
    DESC = 'DESC'
}

export class SQLite{
    db: Database;
    constructor(path: string){
        this.db = new Database(path);
    }

    getSiswa(callBack: Function, name: string | string[]) {
        const sql = 'SELECT * FROM siswa WHERE name = ?';
        this.db.get(sql, [name], (err, row) => {
            if(err){
                console.log('Error saat ambil data siswa');
            }
            callBack(row);
        });
    }

    getList(callBack:Function, limit: number, offset: number, sort_by:string | string[], sortDir: string | string[], classroom: string|string[]){
        const sql = `SELECT * FROM siswa WHERE classroom='${classroom}' ORDER BY ${sort_by} ${sortDir} LIMIT ${offset},${limit}`
        this.db.all(sql, (err, row) => {
            if(err){
                console.log(`Error saat ambil data siswa : ${err}`);
            }
            callBack(row);
        });
    }

    addSiswa(callBack:Function, name:string | string[], classroom:string | string[]){
        const sql = `INSERT INTO siswa(name, classroom) VALUES (?, ?)`
        this.db.run(sql, [name, classroom], (err) => {
            if(err){
                console.log(`Gagal membuat data siswa ${err}`);
                callBack(false)
            }
            callBack(true)
        })
    }

    deleteSiswa(callBack: Function, name: string | string[]){
        const sql = `DELETE FROM siswa WHERE name = ?`;
        this.db.get(sql, [name], (err) => {
            if(err){
                console.log('Error saat hapus data siswa');
                callBack(false);
            }
            callBack(true);
        });
    }

    updateSiswa(callBack: Function, name: string | string[], classroom: string | string[]){
        const sql = `UPDATE siswa SET name = '${name}', classroom = '${classroom}' WHERE name = '${name}'`;
        this.db.run(sql, (err) => {
            if(err){
                console.log('Error saat update data siswa');
                callBack(false);
            }
            callBack(true);
        });
    }
}
