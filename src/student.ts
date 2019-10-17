import { Database } from "sqlite3";

export interface StudentInterface {
  id?: number;
  name?: string;
  classroom?: string;
}

export enum SORT_BY{
  NAME = 'name',
  CLASSROOM = 'classroom'
}

export enum SORT_DIRECTION{
  ASC = 'ASC',
  DESC = 'DESC'
}

interface Condition {
  name?: string;
  classroom?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: SORT_DIRECTION;
}

export class Student {
  db: Database;
  constructor() {
    this.db = new Database('./database.db');
  }

  findAll(callback: Function) {
    const sql = `SELECT * FROM students`;
    this.db.all(sql, (err, rows) => {
      if (err) () => { throw err };
      callback(rows);      
    });
  }

  find(id: number, callback: Function) {
    const sql = `SELECT * FROM students WHERE id = ?`;
    this.db.get(sql, [id], (err, row) => {
      if (err) () => { throw err };
      callback(row);
    });
  }

  where(conditions: Condition, callback: Function) {
    let sql = `SELECT * FROM students`;
    const fieldConditions = Object.keys(conditions)
      .filter(key => ['name', 'classroom'].includes(key))
      .reduce((obj, key) => { return { ...obj, [key]: conditions[key] } }, {});

    // update SQL query
    for (let [key, value] of Object.entries(fieldConditions)) {
      sql += ` ${sql.includes('WHERE') ? 'AND' : 'WHERE'} ${key} = ?`;
      console.log(sql);
    }
    if (conditions.hasOwnProperty('sortBy')) {
      sql += ` ORDER BY ${conditions.sortBy}`;
      console.log(sql);
    }
    if (conditions.hasOwnProperty('sortDirection')) {
      sql += ` ${conditions.sortDirection}`;
      console.log(sql);
    }
    if (conditions.hasOwnProperty('limit')) {
      let offset = `, ${conditions.offset}`;
      sql += ` LIMIT ${conditions.limit}${conditions.hasOwnProperty('offset') ? offset : ''} `
      console.log(sql);
    }

    this.db.all(sql, Object.values(fieldConditions), (err, rows) => {
      if (err) () => { throw err };
      callback(rows);
    });
  }

  create(name: string, classroom: string, callback: Function) {
    const sql = `INSERT INTO students(name, classroom) VALUES (?, ?)`;
    this.db.run(sql, [name, classroom], (err) => {
      if (err) callback(false, err);
      callback(true, 'Data successfully created');
    });
  }

  update(id: number, name: string, classroom: string, callback: Function) {
    const sql = `UPDATE students SET name = '${name}', classroom = '${classroom}' WHERE id = '${id}'`;
    this.db.run(sql, (err) => {
      if (err) callback(false, err);
      callback(true, 'Data successfully updated');
    });
  }

  delete(id: number, callback: Function) {
    const sql = `DELETE FROM students WHERE id = ?`;
    this.db.run(sql, [id], (err) => {
      if (err) callback(false, err);
      callback(true, 'Data successfully deleted');
    });
  }

  // not crud function
  getName(id: number, callback: Function) {
    const sql = `SELECT name FROM students WHERE id = ?`;
    this.db.get(sql, [id], (err, row) => {
      if (err) () => { throw err };
      callback(row);
    });
  }
}