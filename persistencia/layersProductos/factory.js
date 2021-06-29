import {MongoDB} from '../dbMongoMongoose/productos/DAO'
import { productosSQL } from '../dbMariaKnex/productos/DAO';
class db {
    constructor(type){
        this.dbType = type;
        switch (this.dbType) {
            case 'mongodb':
                return MongoDB
            case 'mariadb':
                return productosSQL
            default:
                return {
                    getItems:"getItems",
                    getItemsById:"getItemsById",
                    getLastId:"getLastId",
                    addItem:"addItem",
                    putItemById:"putItemById",
                    deleteItemById:"deleteItemById",
                }
                break;
        }
    }
}

export const productos = db;