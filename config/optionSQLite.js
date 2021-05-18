import knex  from 'knex'
import {logger} from '../config/logger'

const optionSQLite = {
  client: 'sqlite3',
  connection: {
    filename: './DB/mensajes.db',
  },
  useNullAsDefault: true,
/*   migrations:{
    directory: './DB/migrations/mensajes'
  } */
}
const SQLite = knex(optionSQLite)

SQLite.schema.createTable('mensajes',tbl=>{
    tbl.increments('id').nullable()
    tbl.text('email',128).notNullable();
    tbl.text('mensaje',128).notNullable();
    tbl.date('fecha',128).notNullable();
})
.then(()=>{
  logger.info('Tabla creada ');
})
.catch((err)=>{
  logger.info('TABLA YA CREADA');

})
.finally(()=>{
  //SQLite.destroy();
})


module.exports = {
  find,
  findById,
  insert,
  update,
  remove
}

function find(){
  return SQLite('mensajes')
}
function findById(){
  return SQLite('mensajes').where({id:Number(id)})
}
function insert(post){
  return SQLite('mensajes')
  .insert(post)
  .then(ids =>({id:ids[0]}))
}

function update(post){
  return SQLite('mensajes')
  .where('id',Number(id))
  .update(post)
}

function remove(id){
  return SQLite('mensajes')
  .where('id',Number(id))
  .del();
}