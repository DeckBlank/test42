import { enviroment } from './enviroment'
import cors from 'cors'

var whitelist = enviroment.PERMITIDOS.split(' ')
var corsOptions = {
  origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1||typeof origin ==='undefined') {
          callback(null, true)
        } else {
          callback(new Error('No permitido por CORS'))
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
module.exports = whitelist;
module.exports = corsOptions
