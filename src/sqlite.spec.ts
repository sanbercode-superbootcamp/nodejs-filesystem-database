import { expect } from 'chai';
import { SQLite } from './sqlite';

const dbSiswa = new SQLite('./db/siswa.db');

describe('sqlite', function () {

    describe('lihat detail siswa', function () {
        it('harus menghasilkan detail siswa', async function () {
            const hasil = await dbSiswa.getRow('ardhi');
            expect(hasil).to.be.deep.eq({ id: 1, name: 'ardhi', classroom: '9E' });
        });

        it('harus menghasilkan semua siswa', async function () {
            const hasil = await dbSiswa.getRows({ limit: '1', sortBy: 'name' });
            expect(hasil).to.be.deep.eq([{ id: 1, name: 'ardhi', classroom: '9E' }]);
        });

        it('harusnya menambahkan siswa', async function () {
            const hasil = await dbSiswa.insertRow('nandyo', '4SD');
            expect(hasil).to.be.eq(true);
        });

        it('harusnya menghapus siswa', async function () {
            const hasil = await dbSiswa.deleteRowByName('nandyo');
            expect(hasil).to.be.eq(true);
        });

        it('harusnya mengupdate siswa', async function () {
            const hasil = await dbSiswa.updateRow('febry', '1TSN');
            expect(hasil).to.be.eq(true);
        });

        context('input tidak valid', function () {
            it('harusnya keluar error', function () {
                return expect(addPromise(null, 2))
                    .to.be.rejectedWith(Error, ERR_MSG);
            })
        });
    });
});