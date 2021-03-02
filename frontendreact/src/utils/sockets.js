
import io from 'socket.io-client';
const socket = io(process.env.URL,{path:'/socket.io'}); // eslint-disable-line no-use-before-define
console.log(socket);
socket.on('connect', (message) =>  {
    console.log(6,message)
    let sessionID = socket.id;
    console.log(sessionID);
    //messages.appendChild(msg)
    
})
let respuesta = null 
socket.on('mensaje', function(payload) {
    console.log(payload)
    respuesta =payload
})



        /* const form = document.getElementById('form')
        const input = document.getElementById('input')
        let messages = document.getElementById('messages')

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            if (input.value) {
                socket.emit('mensaje del chat', input.value)
                input.value = ''
            }

        }) */

