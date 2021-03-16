import dotenv from "dotenv";
dotenv.config();
import {files} from '../files'
class usuarios extends files{ 
    constructor(archivo){
        super(archivo)
        this.usuarios = []
    }
    nuevaConexion(id){
        this.usuarios = [...this.usuarios,{id,email:''}]
        return {message: `nueva conexion con ${id}`}
    }
    validarAcceso(id){

        let indexEncontrado = this.usuarios.findIndex((usuario) => { return usuario.id === id; });

        if(indexEncontrado>-1) return indexEncontrado
        return false
    }
    getEmailbyId(id){
        let indexEncontrado = this.usuarios.findIndex((usuario) => { return usuario.id === id; });

        if(indexEncontrado>-1) return this.usuarios[indexEncontrado].email
        return ''
    }
    newUser(email,id){
        let indexEncontrado = this.validarAcceso(id)
        if(indexEncontrado===false) return this.error()
        this.usuarios[indexEncontrado]['email'] = email
        return true
    }

    deleteUser(id){
        let indexEncontrado = this.usuarios.findIndex((usuario) => { return usuario.id === id; });
        if(indexEncontrado===-1) return false
        this.usuarios.splice(indexEncontrado,1)
        return true
    }
    isObject(obj){
        return obj != null && obj.constructor.name === "Object"
    }
    error(){
        return {message:"el usuario ya existe"}
    }
}

export const Usuarios = new usuarios(process.env.PATH_CHAT)