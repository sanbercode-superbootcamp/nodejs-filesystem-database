import { Siswa, SQLite, SISWA_SORT_BY, SORT_DIRECTION } from "./sqlite";


const instanceSQL = new SQLite('./database/db-siswa.db');
interface SimpleResponse {
    status: boolean,
    message: string,
    data?: any
}
export async function addSiswa(siswa: Siswa): Promise<SimpleResponse> {
    try {
        const res = await instanceSQL.insertRow(siswa);

        return { status: true, message: "Record Inserted Successfuly" };
    } catch (err) {
        console.log("Add Error", err);
        return { status: false, message: err };
    }
}

export async function updateSiswa(name: string, classroom: string): Promise<SimpleResponse> {
    try {
        const res = await instanceSQL.updateRow(name, classroom);

        return { status: true, message: "Record Updated Successfuly", data: { _id: name, _changed_data: classroom } };
    } catch (err) {
        console.log("Update Error", err);
        return { status: false, message: err };
    }
}

export async function deleteSiswa(name: string): Promise<SimpleResponse> {
    try {
        const res = await instanceSQL.deleteRow(name);

        return { status: true, message: "Record Deleted Successfuly", data: { _id: name } };
    } catch (err) {
        console.log("Delete Error", err);
        return { status: false, message: err };
    }
}

export async function getSiswa(name: string): Promise<SimpleResponse> {
    try {
        const res = await instanceSQL.getRow(name)
        if (!res) {
            return { status: false, message: "Get Record Not Exist" };
        }
        return { status: true, message: "Get Record Exist", data: res };

    } catch (err) {
        console.log("Get Record Error", err);
        return { status: false, message: err };
    }
}

export async function getSiswaAll(sortBy: SISWA_SORT_BY, sortDirection: SORT_DIRECTION, limit: number, offset: number, classroom?: string): Promise<SimpleResponse> {
    try {
        const res = await instanceSQL.getRows(sortBy, sortDirection, limit, offset, classroom);
        if (res.length <= 0) {
            return { status: false, message: "List Records Not Exist" };
        }
        return { status: true, message: "List Records Exist", data: res };

    } catch (err) {
        console.log("Get Record Error", err);
        return { status: false, message: err };
    }
}