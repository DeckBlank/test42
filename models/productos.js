import  { Types, Schema, model } from 'mongoose'
import { ecommerce } from '../config/mongo'

const ObjectId = Types.ObjectId
const productosSchema = new Schema({
    _id : {type:ObjectId},
    title : {type:String},
    tumbnails : {type:String},
    price : {type:Number},
    stock : {type:Number},
    updatedAt : {type:Date,default:Date.now},
    createdAt : {type:Date,default:Date.now}
})

export const Productos = ecommerce.model('productos',productosSchema,'productos')