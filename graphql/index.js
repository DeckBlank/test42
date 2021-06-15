
import { buildSchema } from "graphql";
import {Productos}  from '../utils/productos'

export const schema = buildSchema(`
type Query{
    getListaProductos:[listaProductos]
    getProductosById(id:Int!):listaProductos
}
type listaProductos {
    title: String
    price : Int
    id : Int
    tumbnails : String
}
type Mutation{
    addProducto(data:inputNewProducto!):listaProductos
    updateProducto(data:updateDataProducto!):listaProductos
    deleteProducto(id:Int!):String
}

input inputNewProducto {
    title: String
    price : Int
    tumbnails : String
}
input updateDataProducto {
    title: String
    price : Int
    tumbnails : String
    id : Int!
}

`)

export const rootValue = {
 getListaProductos: async ()=>(await Productos.getItems()),
 getProductosById: async ({id})=>(await Productos.getItemsById(id)),
 addProducto: async(arg)=>(await Productos.addItem(arg.data)),
 updateProducto: async(arg)=>(await Productos.putItemById(arg.data)),
 deleteProducto:async({id})=>{
     await Productos.deleteItemById(id)
     return 'ok'
 }
}