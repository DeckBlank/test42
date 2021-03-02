const socket = io('localhost:8080',{path:'/socket.io'});
//var socket =  io.connect('https://intranet.igp.gob.pe', {path:"/serwebsockets/socket.io"});//
var sessionID = null;
console.log(socket);
socket.on('connect', function() {
  console.log('CONECTADO');
  sessionID = socket.id;
  console.log(sessionID);
  
  socket.on(sessionID, function (info) {
       console.log(info);
  });
  
});



boton1.addEventListener('click',async ()=>{
  console.log('registrado');
  let respuesta = await socket.emit('registrarse', 'deckblank@gmail.com');
  console.log(respuesta);

  
})
boton.addEventListener('click',async ()=>{
  console.log('guardado');

  socket.emit('chat', 'me conecte');
  
})

let query = async (query, method, json) => {

  let options = {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...json })
  };
  switch (method.toLowerCase()) {
    case "get":
      delete options.headers;
      delete options.body;
      break;
    case "delete":
      delete options.headers;
      delete options.body;
      break;
  }
  try {
    let resp = await fetch(query, options);
    return resp.json();
  } catch (error) {
    console.log(error);
    return false;
  }
};
