import { Database } from 'sqlite3'
import { SQLite, Siswa } from './sqlite'

const db = new Database('./database/siswa.db')

// const sql = ` CREATE TABLE IF NOT EXISTS siswa(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     classroom TEXT
// )`

// db.run(sql, (err) => {
//     if(err){
//         console.log('gagal buat table')
//     }
//     console.log('sukses buat table')
// })

// const insertSQL = `INSERT INTO siswa(name, classroom) VALUES (?, ?)`

// db.run(insertSQL, ['kevin', '9a'], (err) => {
//     if(err){
//         console.log(`gagal insert ke table ${err}`)
//     } else{
//         console.log('sukses insert ke table')
//     }
    
// })

const dbSiswa = new SQLite('./database/siswa.db')
function read(siswa:Siswa) {
    console.log(siswa)
}

// dbSiswa.getRow(read, 'kevin')
// dbSiswa.insertRow('risma', '1a')
// dbSiswa.getRow(read, 'risma')
// dbSiswa.getRows(read)
// dbSiswa.updateRow('kevin', '4z')

db.close()