import { expect } from "chai";
import { get } from "request-promise-native";


describe('Test webservice', () => {
    describe('get siswa', () => {
        it('dapat menampilkan detail semua siswa', async() => {
            const res = await get('http://localhost:3000/siswa/list/')
            expect(res).to.be.exist;
        })
        it("dapat menampilkan detail siswa", async () => {
            const res = await get("http://localhost:3000/siswa?name=hasan");
            expect(res).to.be.exist;
        });
        it("dapat menampilkan siswa dengan filter", async () => {
            const res = await get("http://localhost:3000/siswa/list?classroom=hasan&sortBy=id&sortType=desc&limit=5&offset=0");
            expect(res).to.be.exist;
        });
        it("dapat menambahkan siswa", async () => {
            const res = await get("http://localhost:3000/siswa/add?name=ryan&classroom=B1");
            expect(res).to.be.equal('siswa ryan dengan kelas B1 berhasil ditambahkan');
        });
        it("dapat menghapus siswa", async () => {
            const res = await get("http://localhost:3000/siswa/delete?name=ryan");
            expect(res).to.be.equal('siswa ryan berhasil dihapus');
        });
        it("dapat mengupdate data siswa", async () => {
            const res = await get("http://localhost:3000/siswa/update?name=hasan&classroom=A2");
            expect(res).to.be.equal('kelas siswa hasan diubah menjadi A2');
        });
    })
    
})