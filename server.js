"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

var _socket2 = require("./socket");

var _cors = _interopRequireDefault(require("cors"));

var _cors2 = _interopRequireDefault(require("./config/cors.js"));

var _usuarios = require("./utils/usuarios");

var _http = _interopRequireDefault(require("http"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

var io = (0, _socket["default"])(server);
app.use(_express["default"].json());
app.use(_express["default"]["static"]('./frontendreact/build/'));
app.use((0, _cors["default"])(_cors2["default"]));
app.get("/productos", function (req, res) {
  var path = "index.html";
  res.sendFile(path, {
    root: './frontendreact/build/'
  });
});
io.on('connect', function (client) {
  console.log('cliente', client.id);
  console.log(_usuarios.Usuarios.nuevaConexion(client.id));
  client.on('disconnect', function () {
    console.log('adios', client.id);
    console.log(_usuarios.Usuarios.deleteUser(client.id));
  });
  client.on('registrarse', function (email) {
    var estado = _usuarios.Usuarios.newUser(email, client.id);

    console.log(estado, client.id);

    if (estado === true) {
      io.sockets.emit(client.id, {
        message: 'email aceptado'
      });
    } else {
      io.sockets.emit('error', {
        message: 'email ya usado'
      });
    }
  });
  client.on('chat', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mensaje) {
      var email, mensajeChat, guardado;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              email = _usuarios.Usuarios.getEmailbyId(client.id);
              console.log('cliente', mensaje, client.id, email);

              if (!(email === '')) {
                _context.next = 7;
                break;
              }

              console.log({
                message: 'usuario no registrado'
              });
              io.sockets.emit('error', {
                message: 'usuario no registrado'
              });
              _context.next = 12;
              break;

            case 7:
              mensajeChat = {
                email: email,
                fecha: new Date(),
                mensaje: mensaje
              };
              _context.next = 10;
              return _usuarios.Usuarios.guardar(mensajeChat);

            case 10:
              guardado = _context.sent;
              io.sockets.emit('resp-chat', guardado);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});
var PORT = process.env.PORT || 8080;
server.listen(PORT, function () {
  console.log("Aplicacion en puerto ".concat(PORT));
});
app.use("/api/productos", _routes.productos, function (req, res, next) {
  var message = req.message;
  console.log(message);
  io.sockets.emit('mensaje', message);
});
app.use("/chat", _routes.routeChat);
/*
console.log(
  
  Usuarios.newUser({
    id:'algo',
    email:'aaaa',
    fecha:'121212',
    mensaje:'aaaaaa'
  })
);
console.log(
  
  Usuarios.newUser({
    id:'algo',
    email:'aaaa',
  })
);

console.log( 
  Usuarios.guardar(
    {
      email:'aaaa',
      fecha:'121212',
      mensaje:'aaaaaa'
    }
  )
); */
