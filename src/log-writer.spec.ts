import * as chai from 'chai';
import * as chaiFS from 'chai-fs';
import { expect } from 'chai';
import { get } from 'request-promise-native';
import { StatusCodeError } from 'request-promise-native/errors';
import { writeFileSync } from 'fs';
import { writeLogs, readLogs } from './log-writer';
chai.use(chaiFS);


const filename = './logs/logs.txt';
describe('Log Writer Unit Testing', () => {
    describe('Writer', () => {
        beforeEach(() => {
            writeFileSync(filename, '');
        })
        it('should write a line to logs.txt', async () => {
            const input = "test";
            let res = await writeLogs(filename, input);
            expect(filename).to.be.not.empty;
            expect(res.status).to.be.eq(true);
        })
    })
    describe('Reader', () => {
        beforeEach(() => {
            writeFileSync(filename, '');
            writeFileSync(filename, 'oke');
        })
        it('should got some value from logs.txt', async () => {
            let res = await readLogs(filename)
            expect(res.status).to.be.eq(true);
            expect(res.data).to.be.not.empty;

        })
    })
})
