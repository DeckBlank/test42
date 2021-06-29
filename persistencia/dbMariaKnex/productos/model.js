import knex  from 'knex';
import {MariaDB} from '../config';


MariaDB.schema
.createTable('productos',tbl=>{
    tbl.increments('id').nullable()
    tbl.text('title',128).notNullable();
    tbl.text('tumbnails',128).notNullable();
    tbl.integer('price',128).notNullable();
    tbl.timestamps(true,true);
})
.then(()=>{
  console.log('Tabla creada ');
})
.catch((err)=>{
  console.log('La tabla ya existe');
})
.finally(()=>{
  //MariaDB.destroy();
})

export const productosTable = MariaDB;

