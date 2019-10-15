# Tugas 8 File System and Database Integration

## Introduction
This task is about making server which is processing sqlite database and accessing CRUD implementation. Furthemore, this task contains service implementation with Typescript.
Hope you enjoy it!  

## Repository Anatomy

- `dist` - output folder where the compiled ts code stored
- `src` - source code used on training

Getting Started
---------------

``` bash
npm install
npm run build
npm start
```

## How to Use
1. Get Siswa's detail
`HTTP http://localhost:3000/siswa?name=Agung`

2. Get List
`HTTP http://localhost:3000/siswa/list?limit=10&offset=0&sortby=name&sortdir=asc&classroom=9A`

3. Add Siswa
`HTTP http://localhost:3000/siswa/add?name=Agung&classroom=7A`

4. Delete Siswa
`HTTP http://localhost:3000/siswa/delete?name=Agung`

5. Update Siswa
`HTTP http://localhost:3000/siswa/update?name=Agung&classroom=8A`

6. Reading logs
`HTTP http://localhost:3000/logs`



Keywords : File System, SQLite Database, Server, Typescript, Chai, Mocha.
---
***created by arifintahu***


The presentation slide can be seen [here](https://drive.google.com/open?id=1cxuA_uxQSpfXB9LBXkU-SPD6dhgFTzov8wzC5zlpcnA)