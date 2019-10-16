import { Database } from 'sqlite3'
import { read } from 'fs'
import { writeFileSync, readFileSync, fstat, appendFile, appendFileSync } from 'fs'

const filename = './assets/logs.txt'

export interface Siswa {
    id? : number
    name : string
    classroom : string
    
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
    db : Database
    constructor(path : string){
        this.db = new Database(path)
    }

    //get 1 row
    getRow(callback: Function, name: string) {
        const sql = `SELECT * FROM siswa WHERE name = ?`
        this.db.get(sql, [name], (err, row) => {
            if (err) {
                console.log(err)
            } else {
                callback(row)
            }
        })
    }

    //select all
    getRows(callback: Function){
        const sql = `SELECT * FROM siswa`
        this.db.all(sql, (err, row) => {
        if (err) {
            console.log(err)
        }
        callback(row)
        })
    }

    //getlist
    getList(callBack:Function, limit: number, offset: number, sort_by:string | string[], sortDir: string | string[], classroom: string|string[]){
        const sql = `SELECT * FROM siswa WHERE classroom='${classroom}' ORDER BY ${sort_by} ${sortDir} LIMIT ${offset},${limit}`
        this.db.all(sql, (err, row) => {
            if(err){
                console.log(err);
            }
            callBack(row);
        })
    }

    //insert
    insertRow(name: string, classroom: string){
        const sql = `INSERT INTO siswa(name, classroom) VALUES (?, ?)`
        this.db.get(sql, name, classroom, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('sukses tambah data')
            }
        })
    }

    //deleteRow
    deleteRow(name: string){
        const sql = `DELETE from siswa WHERE name = ?`
        this.db.get(sql, name, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('sukses hapus data')
            }
        })
    }

    //updateRow
    updateRow(name: string, classroom: string){
        const sql = `UPDATE siswa SET classroom = ? WHERE name = ?`
        this.db.get(sql, classroom, name, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('sukses edit data')
                // this.getRows(read)
            }
        })
    }
}

export function tulis(data: string | string[]) : Boolean {
    try {
        // writeFileSync(filename, data)
        appendFileSync(filename, data + "\n")
        return true
    } catch (err) {
        console.log(`errornya : ${err}`)
        return false
    }
}

export function baca() {
    try {
        // readFileSync(filename)
        return readFileSync(filename)
    } catch (err) {
        console.log(`errornya : ${err}`)
        return false
    }
}