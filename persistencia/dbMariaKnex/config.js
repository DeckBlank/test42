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
export const MariaDB = knex(optionMariaDB,{pool:{min:0,max:7}})
