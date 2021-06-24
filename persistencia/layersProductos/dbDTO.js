import {MongoDB} from '../dbMongoMongoose/productos/DAO'
class db {
    constructor(type){
        this.dbType = type;
        switch (this.dbType) {
            case 'mongodb':
                return MongoDB
            case 'madiadb':
                return {
                    getItems:"getItems",
                    getItemsById:"getItemsById",
                    getLastId:"getLastId",
                    addItem:"addItem",
                    putItemById:"putItemById",
                    deleteItemById:"deleteItemById",
                }
                break;
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



//DB = new db(dbType)

export const productos = db;
/* let a  = new db('mongodb')
a.getItems().then((res)=>{
    console.log(res);
}) */