import socketIO from 'socket.io'
export const startSocket = (server)=>{
    return socketIO(server)
}