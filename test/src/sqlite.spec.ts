import { expect } from 'chai'
import { get } from 'request-promise-native'

describe('Base Case of Siswa', () => {
    describe('Route Siswa', () => {
        it('Should return all data of siswa', async() => {
            const result = await get('http://localhost:3000/siswa')
            expect(result).to.be.eq('menampilkan semua data')
        })
    })
    describe('Route List', () => {
        it('Should return specific data of siswa', async() => {
            const result = await get('http://localhost:3000/siswa/list?limit=3&offset=0&sortby=name&sortdir=asc&classroom=3d')
            expect(result).to.be.eq('menampilkan data pilihan')
        })
    })
    describe('Insert Query', () => {
        it('Should add new query', async() => {
            const result = await get('http://localhost:3000/siswa/insert?name=nayla&classroom=2b')
            expect(result).to.be.eq('berhasil menambah data')
        })
    })
    describe('Update Query', () => {
        it('Should update query', async() => {
            const result = await get('http://localhost:3000/siswa/update?name=nayla&classroom=5b')
            expect(result).to.be.eq('berhasil update data')
        })
    })
    describe('Delete Query', () => {
        it('Should delete query', async() => {
            const result = await get('http://localhost:3000/siswa/delete?name=nayla')
            expect(result).to.be.eq('berhasil hapus data')
        })
    })
    describe('Show Log', () => {
        it('Should show query of file log', async() => {
            const result = await get('http://localhost:3000/logs');
            expect(result).to.be.exist;
        })
    })
})