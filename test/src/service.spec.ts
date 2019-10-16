import { expect } from 'chai';
import { get } from 'request-promise-native';
import { StatusCodeError } from 'request-promise-native/errors';
import { writeFileSync } from 'fs';

describe('E2E Service Testing', () => {
    describe('Siswa Service', () => {
        it('should add new siswa', async () => {
            const res = await get("http://localhost:3000/siswa/add?name=bambang&classroom=1B");
            const actual = JSON.parse(res);
            expect(actual.status).to.be.eq(true)
            expect(actual.message).to.be.eq("Record Inserted Successfuly");
        })
        it('should update classroom siswa', async () => {
            const res = await get("http://localhost:3000/siswa/update?name=bambang&classroom=1A");
            const actual = JSON.parse(res);
            expect(actual.status).to.be.eq(true)
            expect(actual.message).to.be.eq("Record Updated Successfuly");
        })
        it('should return siswa named bambang', async () => {
            const res = await get("http://localhost:3000/siswa?name=bambang");
            const actual = JSON.parse(res);
            expect(actual.status).to.be.eq(true)
            expect(actual.message).to.be.eq("Get Record Exist");
            expect(actual.data.name).to.be.eq("bambang");
        })
        it('should return list of siswa sorted by name DESC', async () => {
            const res = await get("http://localhost:3000/siswa/list?sortBy=name&sortDirection=DESC");
            const actual = JSON.parse(res);
            // console.log(res);
            expect(actual.status).to.be.eq(true)
        })
        it('should delete siswa named bambang', async () => {
            const res = await get("http://localhost:3000/siswa/delete?name=bambang");
            const actual = JSON.parse(res);
            expect(actual.status).to.be.eq(true)
        })
    })
    describe('Show Logs Service', () => {
        let filepath = './logs/logs.txt';
        beforeEach(() => {
            writeFileSync(filepath, '');
        })
        it('should add new line to logs.txt', async () => {
            await get("http://localhost:3000/siswa/list?sortBy=name&sortDirection=DESC");

            let logData = await get("http://localhost:3000/logs");
            logData = JSON.parse(logData);
            expect(logData.status).to.be.eq(true);
            expect(logData.data).to.be.not.empty;
        })
    })
})