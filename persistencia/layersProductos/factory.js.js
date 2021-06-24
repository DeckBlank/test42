const dbType = process.env.DB_TYPE
import {productos} from './dbDTO'
const Productos = new productos(dbType)

class factory {
    constructor() {
        this.productos = []
    }
    async getLastId() {
        let respuesta = null
        respuesta = await Productos.getLastId();
        return respuesta
    }
    async getItems() {
        let respuesta = null
        respuesta = await Productos.find()
        if (!respuesta.length) {
            return this.noItems()
        }
        return respuesta;
    }
    async getItemsById(id) {
        let data = this.validacionEsquema('get', { id })
        if (!data) return this.error()
        let respuesta = null
        respuesta = await Productos.getItemsById(data.id)
        return respuesta
    }
    async addItem(obj) {
        let data = this.validacionEsquema('post', obj)
        if (!data) return this.error()
        let newProducto = null
        let id = null
        let cant = await this.getLastId();
                cant = cant.length?(cant[0].id+1):1
                data = {...data,id:cant}
                id = await ProductosCollection.create(data);
                newProducto = { id:id._id, ...data }
        return newProducto
    }
    async putItemById(obj) {
        let data = this.validacionEsquema('put', obj)
        if (!data) return this.error()
        let respuesta = null;
        respuesta = await Productos.updateOne(data);
        return data;
    }
    async deleteItemById(id) {
        let data = this.validacionEsquema('delete', { id })
        if (!data) return this.error()
        let respuesta = null
        respuesta = await Productos.deleteOne(data.id)
        respuesta = await Productos.find();
        return respuesta
    }
    itemNotFound() {
        return {
            error: 'producto no encontrado'
        }
    }
    noItems() {
        return {
            'error': 'no hay productos cargados'
        }
    }
    isObject(obj) {
        return obj != null && obj.constructor.name === "Object"
    }
    error() {
        return { message: "algo salio mal" }
    }
    validacionEsquema(metodo, data) {
        let datoValidado = {}
        let esquema = {
            id: "number",
            title: "string",
            price: "number",
            tumbnails: "string"
        }
        try {
            if(dbType==='mongodb'){
                datoValidado = { id: data['id'] }
            }else{
                datoValidado = { id: parseInt(data['id']) }
            }
            switch (metodo) {
                case 'post':
                    datoValidado = {
                        title: data['title'].toString(),
                        price: parseInt(data['price']),
                        tumbnails: data['tumbnails'].toString()
                    }
                    break;
                case 'put':
                    datoValidado = {
                        ...datoValidado,
                        title: data['title'].toString(),
                        price: parseInt(data['price']),
                        tumbnails: data['tumbnails'].toString()
                    }
                    break;
            }
            return datoValidado;
        } catch (error) {
            return false;
        }
    }
}

export const NewProductos = new factory();
