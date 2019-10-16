import { Database } from 'sqlite3';

export interface Siswa {
    id?: number,
    name: string,
    classroom: string
}

interface ReturnListSiswa extends Siswa {

}

export enum SORT_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum SISWA_SORT_BY {
    name = "name",
    classroom = "classroom"
}
export class SQLite {
    private db: Database;

    constructor(dbpath: string) {
        this.db = new Database(dbpath);

    }

    getRow(name: string): Promise<Siswa> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM siswa WHERE name=?`
            this.db.get(sql, [name], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            })
        });
    }

    getRows(sortBy: SISWA_SORT_BY = SISWA_SORT_BY.name, sortDirection: SORT_DIRECTION = SORT_DIRECTION.ASC, limit: number = 30, offset: number = 0, classroom?: string): Promise<Siswa[]> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM siswa ` + (classroom ? `WHERE classroom=?` : ``) + ` ORDER BY ${sortBy} ${sortDirection} LIMIT ${offset},${limit}`;
            this.db.all(sql, [classroom], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            })
        });
    }
    insertRow(siswa: Siswa): Promise<any> {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO siswa(name, classroom) VALUES(?, ?)`
            this.db.run(sql, [siswa.name, siswa.classroom], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            })
        });
    }

    deleteRow(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM siswa WHERE name=?`
            this.db.run(sql, [name], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            })
        });
    }

    updateRow(name: string, classroom: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const sqlSearch = `SELECT name FROM siswa WHERE name=?`
            const sql = `UPDATE siswa SET classroom=? WHERE name=?`
            this.db.get(sqlSearch, [name], (err, row) => {
                if (!row) {
                    reject("Error no record found");
                } else {
                    this.db.run(sql, [classroom, name], (err2) => {
                        if (err2) {
                            reject(err2);
                        }
                        else {
                            resolve();
                        }
                    })
                }
            })
        });
    }

}