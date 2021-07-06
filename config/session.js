import session from 'express-session'
import MongoStore from 'connect-mongo'
import { enviroment } from './enviroment'

export default sesion  =>  (session({
    secret: 'supersecreta',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    },
    store:MongoStore.create({ mongoUrl: enviroment.DB_BDG })
}))