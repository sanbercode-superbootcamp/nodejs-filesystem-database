import { expect } from 'chai';
import { get } from 'request-promise-native';
import { StatusCodeError } from 'request-promise-native/errors';
import { addSiswa, updateSiswa, deleteSiswa, getSiswa, getSiswaAll } from './siswa';
import { SISWA_SORT_BY, SORT_DIRECTION } from './sqlite';


describe('Siswa Unit Test', () => {
    it('should add new siswa named bambang and classroom of 1A', async () => {
        const res = await addSiswa({ name: "bambang", classroom: "1A" });
        expect(res.status).to.be.eq(true);
        expect(res.message).to.be.eq("Record Inserted Successfuly");
    })
    it('should update bambang\'s classroom to be 1B', async () => {
        const res = await updateSiswa("bambang", "1B");
        expect(res.status).to.be.eq(true);
        expect(res.message).to.be.eq("Record Updated Successfuly");
    })
    it('should show bambang\'s detail', async () => {
        const res = await getSiswa("bambang");
        expect(res.status).to.be.eq(true);
        expect(res.data).to.be.not.empty;
    })
    it('should show list of siswa', async () => {
        const res = await getSiswaAll(SISWA_SORT_BY.name, SORT_DIRECTION.DESC, 30, 0);
        expect(res.status).to.be.eq(true);
        expect(res.data).to.be.not.empty;
    })
    it('should delete siswa named bambang', async () => {
        const res = await deleteSiswa("bambang");
        expect(res.status).to.be.eq(true);
        expect(res.message).to.be.eq("Record Deleted Successfuly");
    })
})