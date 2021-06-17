import db from '../../config/optionMariaDB'
import { ProductosCollection } from '../../config/mongo'
const dbType = process.env.DB_TYPE

<<<<<<< HEAD

=======
>>>>>>> test29
class productos {
    constructor(type) {
        this.productos = []
        this.dbType = type
    }
    async getLastId() {
        let respuesta = null
        switch (this.dbType) {
            case 'mariadb':
                break;
            case 'mongodb':
                respuesta = await ProductosCollection.find({},{id:1},{ sort: { id: -1 } ,limit:1 })
                break;
            default:
                respuesta = this.productos
                break;
        }
        return respuesta
    }
    async getItems() {
<<<<<<< HEAD

=======
>>>>>>> test29
        let respuesta = null
        switch (this.dbType) {
            case 'mariadb':
                respuesta = await db.find()
                break;
            case 'mongodb':
                respuesta = await ProductosCollection.find()
                break;
            default:
                respuesta = this.productos
                break;
        }
        if (!respuesta.length) {
            return this.noItems()
        }
        return respuesta

    }
    async getItemsById(id) {
        let data = this.validacionEsquema('get', { id })
        if (!data) return this.error()
        let respuesta = null
        switch (this.dbType) {
            case 'mariadb':
                respuesta = await db.findById(data.id)
                return respuesta
                break;
            case 'mongodb':
                respuesta = await ProductosCollection.findOne(data)
                return respuesta
                break;
            default:
                if (!this.productos.length) return this.noItems()
                let filtered = this.productos.filter((producto) => { return producto.id === data.id; });
                if (filtered.length === 0) return this.itemNotFound()
                return filtered[0]
                break;
        }

    }
    async addItem(obj) {
        let data = this.validacionEsquema('post', obj)
        if (!data) return this.error()
        let newProducto = null
        let id = null
        switch (this.dbType) {
            case 'mariadb':
                id = await db.insert(data)
                newProducto = { ...id, ...data }
                break;
            case 'mongodb':
<<<<<<< HEAD
                id = await ProductosCollection.create(data)
                newProducto = { ...id, ...data }
=======
                let cant = await this.getLastId();
                cant = cant.length?(cant[0].id+1):1
                data = {...data,id:cant}
                id = await ProductosCollection.create(data);
                newProducto = { id:id._id, ...data }
>>>>>>> test29
                break;
            default:
                id = this.productos.length;
                if (id != 0) {
                    let maxId = this.productos.reduce(function (prev, current) {
                        return (prev.id > current.id) ? prev : current
                    })
                    id = parseInt(maxId.id) + 1
                }
                newProducto = { ...data, id }
                this.productos = [...this.productos, { ...newProducto }]
                break;
        }
        return newProducto
    }
    async putItemById(obj) {
        let data = this.validacionEsquema('put', obj)
        if (!data) return this.error()
        let respuesta = null
        switch (this.dbType) {
            case 'mariadb':
                respuesta = await db.update(data.id, data)
                break;
            case 'mongodb':
                let busqueda = {id:data.id}
                let update  = {$set:data}
                let options  = { upsert: true }
                respuesta = await ProductosCollection.updateOne(busqueda,update, options)
                break;
            default:
                let indexEncontrado = this.productos.findIndex((producto) => { return producto.id === data.id; });
                if (indexEncontrado === -1) return this.itemNotFound()
                this.productos[indexEncontrado] = { ...data }

                break;
        }
        return data

    }
    async deleteItemById(id) {
        let data = this.validacionEsquema('delete', { id })
        if (!data) return this.error()
        let respuesta = null
        switch (this.dbType) {
            case 'mariadb':
                respuesta = await db.remove(data.id)
                respuesta = await db.find();
                return respuesta
                break;
            case 'mongodb':
                respuesta = await ProductosCollection.deleteOne({id:data.id})
                respuesta = await ProductosCollection.find();
                return respuesta
                break;
            default:
                let indexEncontrado = this.productos.findIndex((producto) => { return producto.id === data.id; });
                if (indexEncontrado === -1) return this.itemNotFound()
                this.productos.splice(indexEncontrado, 1)
                return this.productos
                break;
        }

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

export const Productos = new productos(dbType);
