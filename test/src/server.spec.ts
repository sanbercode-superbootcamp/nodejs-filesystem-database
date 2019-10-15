import { get } from 'request-promise-native';
import { expect } from 'chai';

describe('Server', function(){
    describe('Tambah data siswa', function(){
        it('harusnya menambahkan siswa Agung', async function(){
            const response = await get('http://localhost:3000/siswa/add?name=Agung&classroom=7A');
            expect(response).to.be.equal('Siswa telah ditambahkan');
        });
    });
    describe('Ubah data siswa Agung', function(){
        it('harusnya mengubah data', async function(){
            const response = await get('http://localhost:3000/siswa/update?name=Agung&classroom=8A');
            expect(response).to.be.equal('Siswa Agung telah di-update');
        });
    });
    describe('Tampil siswa Agung', function(){
        it('harusnya menampilkan data', async function(){
            const response = await get('http://localhost:3000/siswa?name=Agung');
            expect(response).to.be.exist;
        });
    });
    describe('Tampil list', function(){
        it('harusnya menampilkan list', async function(){
            const response = await get('http://localhost:3000/siswa/list?limit=10&offset=0&sortby=name&sortdir=asc&classroom=9A');
            expect(response).to.be.exist;
        });
    });
    describe('Membaca file', function(){
        it('harusnya membaca file', async function(){
            const response = await get('http://localhost:3000/logs');
            expect(response).to.be.exist;
        });
    });
    describe('Hapus siswa', function(){
        it('harusnya menghapus siswa Agung', async function(){
            const response = await get('http://localhost:3000/siswa/delete?name=Agung');
            expect(response).to.be.equal('Siswa Agung telah dihapus');
        });
    });
});