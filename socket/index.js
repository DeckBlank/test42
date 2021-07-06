import {Usuarios} from '../utils/usuarios'

export class socketFlow {
    constructor(io){
        this.io = io
        this.api = (client)=>{
            client.on('disconnect', function () {
            });
            client.on('registrarse',(email)=>{
              console.log(email, client.id);
              let estado = Usuarios.newUser(email,client.id)
              console.log(estado);
              if(estado ===true){
                this.io.sockets.emit(client.id,{message:'email aceptado'})
              }else{
                this.io.sockets.emit('error',{message:'email ya usado'})
              }
              
            })
            client.on('chat',async (mensaje)=>{
              let email = Usuarios.getEmailbyId(client.id)
              if(email===''){
                this.io.sockets.emit('error',{message:'usuario no registrado'})
              }else{
                let mensajeChat = {
                  email,
                  fecha:new Date(),
                  mensaje
                }
                let guardado = await Usuarios.guardar(mensajeChat,'sqlite')
                this.io.sockets.emit('resp-chat',guardado)
              }
              
            })
        }
    }
}
/* export const socketFlow =  {
    io,
    api : (client) => {
        client.on('disconnect', function () {
        });
        client.on('registrarse',(email)=>{
          console.log(email, client.id);
          let estado = Usuarios.newUser(email,client.id)
          console.log(estado);
          if(estado ===true){
            io.sockets.emit(client.id,{message:'email aceptado'})
          }else{
            io.sockets.emit('error',{message:'email ya usado'})
          }
          
        })
        client.on('chat',async (mensaje)=>{
          let email = Usuarios.getEmailbyId(client.id)
          if(email===''){
            io.sockets.emit('error',{message:'usuario no registrado'})
          }else{
            let mensajeChat = {
              email,
              fecha:new Date(),
              mensaje
            }
            let guardado = await Usuarios.guardar(mensajeChat,'sqlite')
            io.sockets.emit('resp-chat',guardado)
          }
          
        })
      }
} */