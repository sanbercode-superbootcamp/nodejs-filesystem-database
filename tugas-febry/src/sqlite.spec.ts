import {
    expect
} from 'chai';
import {
    SQLite
} from './sqlite';

const dbSiswa = new SQLite('./database/siswa.db');

describe('sqlite', function () {

    describe('lihat detail siswa', function () {
        this.timeout(5000);
        this.slow(5000);
        it('harus menghasilkan detail siswa', async function () {
            const hasil = await dbSiswa.getDetail('febry');
            expect(hasil)
                .to.be.deep.eq({
                    id: 5,
                    name: 'febry',
                    classroom: '10A'
                });
        });

        it('harus menghasilkan semua siswa', async function () {
            const hasil = await dbSiswa.getRows({
                sortDirection: 'asc',
                limit: 1,
                sortBy: 'name'
            });
            expect(hasil)
                .to.be.deep.eq([{
                    id: 5,
                    name: 'febry',
                    classroom: '10A'
                }]);
        });

        it('harusnya menambahkan siswa', async function () {
            const arrData = {
                'name': 'febry', 'classroom': '10A'
            };
            const hasil = await dbSiswa.insertData(arrData);
            expect(hasil)
                .to.be.eq('sukses memasukkan data');
        });

        it('harusnya mengupdate siswa', async function () {
            const arrData = {
                'siswa': 'febry', 'classroom': '4A'
            };
            const hasil = await dbSiswa.updateData(arrData);
            expect(hasil)
                .to.be.eq('berhasil');
        });


        it('harusnya menghapus siswa', async function () {
            const hasil = await dbSiswa.deleteData('febry');
            expect(hasil)
                .to.be.eq('berhasil');
        });
    });
});
