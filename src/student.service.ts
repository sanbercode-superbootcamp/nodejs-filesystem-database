import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import { Student, StudentInterface } from "./student";
import { writeLog } from "./log";

const student = new Student();

const writelog = (message) => {
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  writeLog(`${timestamp} - ${message}`);
}

export const studentDetailService = (req:IncomingMessage, res:ServerResponse) => {
  const url = parse(req.url, true);
  const query = url.query;
  const id = query['id'];

  if (!id) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const callback = (student: StudentInterface) => {
    writelog(`User melihat detail siswa`);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(student));
    res.end();
  }
  student.find(Number(id), callback);
}

export const studentListService = (req:IncomingMessage, res:ServerResponse) => {
  const url = parse(req.url, true);
  const query = url.query;

  const callback = (student: StudentInterface) => {
    // u may process how data would be displayed, here
    writelog(`User melihat list siswa`);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(student));
    res.end();
  }

  const conditions = JSON.parse(JSON.stringify(query));
  console.log(conditions);
  student.where(conditions, callback);
}

export function addService(req:IncomingMessage, res:ServerResponse) {
  const url = parse(req.url, true);
  const query = url.query;

  const name = query['name'].toString();
  const classroom = query['classroom'].toString();

  if (!name || !classroom) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const callbackStatus = (status: Boolean, message: String) => {
    if(!status){
      res.statusCode = 400;
      res.end();
    }
    writelog(`User menambahkan siswa ${name}`);
    res.write(message);
    res.end();
  }

  student.create(name, classroom, callbackStatus);
}

export function updateService(req:IncomingMessage, res:ServerResponse) {
  const url = parse(req.url, true);
  const query = url.query;
  const id = query['id'];
  const name = query['name'];
  const classroom = query['classroom'];

  if (!id || !name || !classroom) {
    res.statusCode = 400;
    res.end('Parameter should include id, name and classroom');
    return;
  }

  const callbackStatus = (status: Boolean, message: String) => {
    if(!status){
      res.statusCode = 400;
      res.end();
    }

    student.getName(Number(id), (student: StudentInterface) => {
      writelog(`User mengubah data siswa ${student.name}`);
    });
    res.write(message);
    res.end();
  }

  student.update(Number(id), name.toString(), classroom.toString(), callbackStatus);
}

export function deleteService(req:IncomingMessage, res:ServerResponse) {
  const url = parse(req.url, true);
  const query = url.query;
  const id = Number(query['id']);

  if (!query['id']) {
    res.statusCode = 400;
    res.end();
  }

  const callbackStatus = (status: Boolean, message: String) => {
    if(!status){
      res.statusCode = 400;
      res.end();
    }

    student.getName(id, (student: StudentInterface) => {
      writelog(`User menghapus siswa ${student.name}`);
    });
    res.write(message);
    res.end();
  }

  student.delete(id, callbackStatus);
}