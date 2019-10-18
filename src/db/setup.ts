import { Database } from "sqlite3";

const dbSiswa = new Database('./dist/db/siswa.db');

const sql = `CREATE TABLE IF NOT EXISTS siswa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    classroom TEXT
)`;
dbSiswa.run(sql, (error) => {
    if(error){
        console.log(`gagal membuat tabel siswa: ${error}`);
    }
    console.log(`berhasil membuat tabel siswa`);
})

const initInsert = `INSERT INTO siswa (name, classroom) VALUES ('hasan', 'A1'),('husein', 'A2'),('budi','A1'),('adi','A1'),('ilham', 'A2'),('el', 'A2')`;
dbSiswa.run(initInsert, (error) => {
    if(error){
        console.log(`gagal membuat siswa: ${error}`);
    }
    console.log('berhasil membuat siswa');
})

dbSiswa.close();