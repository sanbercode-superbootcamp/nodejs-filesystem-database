import { writeFileSync, readFileSync } from 'fs';

const filename = './assets/logs.txt';

export function tulis(data:string | string[]): Boolean {
    try{
        let previousData = baca().toString();
        
        if(previousData == ''){
            writeFileSync(filename, data);
            return true;
        }else{
            let currentData = previousData + '\n' + data;
            writeFileSync(filename, currentData);
            return true;
        }   
        
    }catch(err){
        console.log(`Lagi Error : ${err}`)
        return false
    }   
}

export function baca(){
    try{
        return readFileSync(filename);
    }catch(err){
        console.log(`my error : ${err}`);
    }
}