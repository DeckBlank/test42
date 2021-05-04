
import  { Types, Schema, model } from 'mongoose'
import { ecommerce } from '../config/mongo'

const userSchema = new Schema({
    nombre: {type:String},
    password: {type:String},
    facebookId: {type:String},
})

export const User = ecommerce.model('user',userSchema,'user')