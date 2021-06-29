import { productosTable } from "./model";

class crud {
  constructor(){

  }
  async getItems (){
      return await productosTable('productos')
  }
  async getItemsById (id){
    return await productosTable('productos').where({id:Number(id)})
  }
  async getLastId (){
    return await productosTable('productos').orderBy('id', 'desc').limit(1);
  }
  async addItem (data){
    return await productosTable('productos')
    .insert(data)
    .then(id =>({...data,id:id[0]}))
  } 
  async putItemById (data){
    return await productosTable('productos')
    .where('id',Number(data.id))
    .update(data)
  }
  async deleteItemById (id){
    return await productosTable('productos')
    .where('id',Number(id))
    .del();
  }  
}

export const productosSQL = new crud();