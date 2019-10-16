import { SQLite, Siswa, SORT_BY, SORT_TYPE } from "./sqlite";

const dbSiswa = new SQLite('./dist/db/siswa.db');

 export function read(siswa: Siswa) {
    console.log(siswa);
}

// dbSiswa.infoSiswa(read, 'hasan');
dbSiswa.selectAllSiswa(read);
// dbSiswa.selectSiswa(read, 'A1', SORT_BY.id, SORT_TYPE.asc, 3, 1);
// dbSiswa.insertSiswa('gugum','A1');
// dbSiswa.deleteSiswa('gugum');
// dbSiswa.updateSiswa('gugum', 'A2');