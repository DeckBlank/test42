import mongoose from 'mongoose'



export const ecommerce = mongoose.createConnection(process.env.DB_BDG,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

/* let connection = ecommerce.connection */
ecommerce.on('open',()=>console.log('ecommerce conected'))
ecommerce.on('error',(error)=>console.log(`An error: ${error}`))


const ObjectId = mongoose.Types.ObjectId
const productosSchema = new mongoose.Schema({
   /*  _id : {type:ObjectId}, */
    id : {type:Number},
    title : {type:String},
    tumbnails : {type:String},
    price : {type:Number},
    stock : {type:Number},
    updatedAt : {type:Date,default:Date.now},
    createdAt : {type:Date,default:Date.now}
})

export const ProductosCollection = ecommerce.model('productos',productosSchema,'productos')


const mensajesSchema = new mongoose.Schema({
    _id : {type:ObjectId},
    email : {type:String},
    mensaje : {type:String},
    fecha : {type:Date},
    updatedAt : {type:Date,default:Date.now},
    createdAt : {type:Date,default:Date.now}
})

export const MensajesCollection = ecommerce.model('mensajes',mensajesSchema,'mensajes')