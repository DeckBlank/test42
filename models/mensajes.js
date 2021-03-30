import {Schema,Types} from 'mongoose'
import { ecommerce } from '../config/mongo'
const ObjectId = Types.ObjectId;
const mensajesSchema = new Schema({
    _id : {type:ObjectId},
    email : {type:String},
    mensaje : {type:String},
    fecha : {type:Date},
    updatedAt : {type:Date,default:Date.now},
    createdAt : {type:Date,default:Date.now}
})

export const Mensajes = ecommerce.model('mensajes',mensajesSchema,'mensajes')