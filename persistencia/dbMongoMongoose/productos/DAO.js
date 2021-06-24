import {ProductosCollection} from './model.js'
class crud {
    constructor(){

    }
    async getItems(){
        return await ProductosCollection.find();
    }
    async getItemsById(id){
        return await ProductosCollection.findOne({id})
    }
    async getLastId(){
        return await ProductosCollection.find({},{id:1},{ sort: { id: -1 } ,limit:1 })
    }
    async addItem(data){
        return await ProductosCollection.create(data);
    }
    async putItemById(data){
        let busqueda = {id:data.id}
        let update  = {$set:data}
        let options  = { upsert: true }
        return await ProductosCollection.updateOne(busqueda,update, options)
    }
    async deleteItemById(id){
        return await ProductosCollection.deleteOne({id})
    }
}

export const MongoDB = new crud();