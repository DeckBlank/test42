import { config } from "dotenv";
config();
import minimist from "minimist";
let args = minimist(process.argv.slice(2),{
    alias:{
        d :'dedo',
        p:'port',

    },
    default:{
        port : '8080'
    }
})


const enviroment = {
    "PORT" : args.p,
    "PUBLIC" : process.env.PUBLIC,
    "PERMITIDOS" : process.env.PERMITIDOS,
    "PATH_CHAT" : process.env.PATH_CHAT,
    "DB_BDG" : process.env.DB_BDG,
    "DB_TYPE" : process.env.DB_TYPE,
    "clientID" : process.env.clientID,
    "clientSecret" : process.env.clientSecret,
    "callbackURL" : process.env.callbackURL,
}
console.log(enviroment);
export default enviroment 