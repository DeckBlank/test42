import mongoose from 'mongoose'
import {ecommerce} from '../config.js'
const ObjectId = mongoose.Types.ObjectId
const productosSchema = new mongoose.Schema({
     id : {type:Number},
     title : {type:String},
     tumbnails : {type:String},
     price : {type:Number},
     stock : {type:Number},
     updatedAt : {type:Date,default:Date.now},
     createdAt : {type:Date,default:Date.now}
 })
 
 export const ProductosCollection = ecommerce.model('productos',productosSchema,'productos')