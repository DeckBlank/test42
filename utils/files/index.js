'use strict'
const fs  = require('fs');
import { resolve } from 'path';
import db from '../../config/optionSQLite'
export class files{
    constructor(archivo){
        this.archivo = archivo;
        this.isObject = (obj)=>{
            return obj != null && obj.constructor.name === "Object"
        }
    }
    leer (type){
        return new Promise(async (resolve,reject)=>{
            switch (type) {
                case 'sqlite':
                    try {
                        let data = await db.find();
                        resolve(data)
                        break;
                        
                    } catch (error) {
                        reject(error)
                    }
            
                default:
                
                        fs.readFile(this.archivo, 'utf8', (err,data)=>{
                            if (err) reject([]);
                            resolve(data);
                        });
                
                    break;
            }
        })
        
    }
    guardar(producto,type){
        return new Promise(async (resolve,reject)=>{
            if(!this.isObject(producto)){
                return reject('texto no valido')
            }
            try {
                let data = null
                switch (type) {
                    case 'sqlite':
                        data = await db.insert(producto)
                        data = await db.find();
                        return resolve(data)
                        break;
                    default:
                        data = await this.leer();
                        data = data.length?JSON.parse(data):data;
                        let total  = [...data,{...producto}];
                        fs.writeFile(this.archivo, JSON.stringify(total), (err) =>{
                            if(err) return reject('Hubo un error')
                            return resolve(total)
                        }); 
                        break;
                }
                
            } catch (error) {
                return reject('el archivo no existe')
            }
        })
       
        
    }
    async borrar(){
        try {
            let respuesta = await fs.unlinkSync(this.archivo)
            return 'el archivo se elimino'
          } catch(err) {
            return 'no se pudo eliminar el archivo'
          }
    }

}


