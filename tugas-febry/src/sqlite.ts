import { Database } from 'sqlite3';
import { ParsedUrlQuery } from 'querystring';

export interface Siswa {
    id?: number;
    name: string;
    classroom: string;
}

export enum SISWA_SORT_BY {
    NAME = 'name',
    CLASSROOM = 'classroom'
}

export enum SORT_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface GetRowsParam {
    sortBy?: string | string[];
    sortDirection?: string | string[];
    limit?: number;
    offset?: number;
    classroom?: string | string[];
}

export class SQLite {
    db: Database;
    constructor(path: string) {
        this.db = new Database(path);
    }

    insertData(data: ParsedUrlQuery) {
        const sql = `INSERT INTO siswa(name, classroom) VALUES(?,?)`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [data['name'], data['classroom']], (err) => {
                if (err) {
                    reject('gagal memasukkan data');
                }
                resolve('sukses memasukkan data');
            })
        })

    }

    getRows(objParam: GetRowsParam) {
        let sql = `SELECT * FROM siswa`;
        if (objParam.classroom != null) {
            sql += ` WHERE classroom = '${objParam.classroom}'`;
        }
        if (objParam.sortBy != null) {
            sql += ` ORDER BY ${objParam.sortBy}`;
        }
        if (objParam.sortDirection != null) {
            sql += ` ${objParam.sortDirection}`;
        }
        if (objParam.limit != null) {
            sql += ` LIMIT ${objParam.limit}`;
        }
        if (objParam.limit != null && objParam.offset != null) {
            sql += ` OFFSET ${objParam.offset}`;
        }
        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    getDetail(name: string | string[]) {
        const sql = `SELECT * FROM siswa WHERE name = '${name}'`;
        return new Promise(((resolve, reject) => {
            this.db.get(sql, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        }));
    }

    deleteData(name: string | string[]) {
        const sql = `DELETE FROM siswa WHERE name='${name}'`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('berhasil')
                }
            })
        })
    }

    updateData(data: ParsedUrlQuery) {
        const sql = `UPDATE siswa SET classroom = '${data['classroom']}' WHERE name='${data['siswa']}'`;
        console.log(sql);

        return new Promise((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('berhasil')
                }
            })
        })
    }
}