'use strict'
const fs  = require('fs');

export class files{
    constructor(archivo){
        this.archivo = archivo;
        this.isObject = (obj)=>{
            return obj != null && obj.constructor.name === "Object"
        }
    }
    leer (){
        return new Promise((resolve,reject)=>{
            fs.readFile(this.archivo, 'utf8', (err,data)=>{
                if (err) reject([]);
                resolve(data);
              });
        })
    }
    guardar(producto){
        return new Promise(async (resolve,reject)=>{
            if(!this.isObject(producto)){
                return reject('texto no valido')
            }
            try {
                let data = await this.leer();
                data = data.length?JSON.parse(data):data;
                producto = [...data,{...producto}];
                fs.writeFile(this.archivo, JSON.stringify(producto), (err) =>{
                    if(err) return reject('Hubo un error')
                    return resolve('done')
                }); 
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


