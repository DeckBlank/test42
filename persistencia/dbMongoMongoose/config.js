import mongoose from 'mongoose'
import {logger} from '../../config/logger.js'


export const ecommerce = mongoose.createConnection(process.env.DB_BDG,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

ecommerce.on('open',()=>logger.info('ecommerce conected'))
ecommerce.on('error',(error)=>logger.error(`An error: ${error}`))