import { writeFileSync, readFileSync } from "fs";

const fileName = './assets/logs.txt';

interface ResponseReadFile {
    data: string;
    status: boolean;
}

export function tulis(data: string | string[]) {
    try {
        writeFileSync(fileName, `${data}\n`, { flag: 'a' });
        return true;
    } catch (err) {
        console.log(`Error saat menulis: ${err}`);
        return false;
    }
}

export function bacaFile(): ResponseReadFile {
    try {
        const data = readFileSync(fileName);
        const response = {
            data: data.toString(),
            status: true
        }
        return response;
    } catch (err) {
        console.log(`Error saat baca file: ${err}`);
        const response = {
            data: null,
            status: false
        }

        return response;
    }
}