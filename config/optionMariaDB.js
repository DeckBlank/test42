import knex  from 'knex'

const optionMariaDB = {
  client: 'mysql',
  connection: {
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'coder'
  },
  useNullAsDefault: true,
/*   migrations:{
    directory: './DB/migrations/mensajes'
  } */
}
const MariaDB = knex(optionMariaDB,{pool:{min:0,max:7}})

MariaDB.schema.createTable('productos',tbl=>{
    tbl.increments('id').nullable()
    tbl.text('title',128).notNullable();
    tbl.text('tumbnails',128).notNullable();
    tbl.integer('price',128).notNullable();
})
.then(()=>{
  console.log('Tabla creada ');
})
.catch((err)=>{
  console.log('TABLA YA CREADA');
})
.finally(()=>{
  //MariaDB.destroy();
})


module.exports = {
  find,
  findById,
  insert,
  update,
  remove
}

function find(){
  return MariaDB('productos')
}
function findById(){
  return MariaDB('productos').where({id:Number(id)})
}
function insert(post){
  return MariaDB('productos')
  .insert(post)
  .then(ids =>({id:ids[0]}))
}

function update(id, post){
  console.log(post);
  return MariaDB('productos')
  .where('id',Number(id))
  .update(post)
}

function remove(id){
  return MariaDB('productos')
  .where('id',Number(id))
  .del();
}