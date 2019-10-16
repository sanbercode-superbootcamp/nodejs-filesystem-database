# Webservice Siswa with FS and DB

## Getting Started
```
npm install
npm run build
npm start
```

## to test webservice :

| Endpoint        | Method           | Param  | Example
| ------------- |:-------------:| -----:| -----:|
| /siswa      | GET | name: string | /siswa?name=bambang
| /siswa/list      | GET | sortBy: string, sortDirection: string, limit: number, offset: number, classroom?: string | /siswa/list?sortBy=name&sortDirection=DESC
| /siswa/add      | GET | name: string, classroom: string | /siswa/add?name=bambang&classroom=1A
| /siswa/update      | GET | name: string, classroom: string | /siswa/update?name=bambang&classroom=1B
| /siswa/delete      | GET | name: string | /siswa/delete?name=bambang