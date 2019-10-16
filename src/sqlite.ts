import { Database } from 'sqlite3';
import { rejects } from 'assert';

export interface Siswa {
    id?: number;
    name: string;
    classroom: string;
}

export interface Query {
    limit?: string | string[];
    offset?: string | string[];
    sortBy?: string | string[];
    sortDirection?: string | string[];
    classroom?: string | string[];
}

export enum SORT_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum SISWA_SORT_BY {
    NAME = 'name',
    CLASSROOM = 'classroom'
}

export class SQLite {
    db: Database;
    constructor(path: string) {
        this.db = new Database(path);

    }

    insertRow(name: string | string[], classroom: string | string[]) {
        const sql = `INSERT INTO siswa(name, classroom) VALUES (?,?)`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [name, classroom], (err) => {
                if (err) {
                    console.log("Gagal memasukan data");
                    reject(err);
                } else {
                    resolve(true);
                }
            });

        });
    }


    updateRow(name: string | string[], classroom: string | string[]) {
        const sql = `UPDATE siswa SET classroom = '${classroom}' WHERE name = '${name}'`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) {
                    console.log("Gagal memasukan data");
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }


    deleteRowByName(nama: string | string[]) {
        const sql = `DELETE FROM siswa WHERE name=?`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, nama, (err) => {
                if (err) {
                    console.log(`Gagal menghapus ${nama}`);
                    reject(err);
                }
                resolve(true);
            })
        });
    }

    getRow(name: string | string[]) {
        const sql = `SELECT * FROM siswa WHERE name = ?`;
        return new Promise((resolve, reject) => {
            this.db.get(sql, [name], (err, row) => { //this.db.get buat 1 row
                if (err) {
                    console.log('Error saat mengambil nama siswa');
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getRows(query: Query) { //sortBy bikin enum
        let sql = `SELECT * FROM siswa `;
        //kemudian tambhakan ke query sql
        if (query.classroom) {
            sql += `WHERE classroom = '${query.classroom}' `;
        }
        if (query.sortBy && query.sortBy == SISWA_SORT_BY.NAME || query.sortBy == SISWA_SORT_BY.CLASSROOM) {
            sql += `ORDER BY ${query.sortBy} `;
        }
        if (query.sortDirection && query.sortDirection == SORT_DIRECTION.ASC || query.sortDirection == SORT_DIRECTION.DESC) {
            sql += `${query.sortDirection} `;
        }
        if (query.limit) { //&& isNaN(parseInt(query.limit))
            sql += `LIMIT ${query.limit} `;
        }
        if (query.offset) {
            sql += `OFFSET ${query.offset} `;
        }
        console.log(sql);
        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => { //this.db.get buat row
                if (err) {
                    console.log(`Error saat mengambil dataa ${err}`);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        })
    }
}