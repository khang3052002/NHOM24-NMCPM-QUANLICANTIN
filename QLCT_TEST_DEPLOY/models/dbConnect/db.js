const  Pool  = require('pg').Pool;
const pool = new Pool({
  user: 'jvpaazmn',
  host: 'rosie.db.elephantsql.com',
  database: 'jvpaazmn',
  password: 'VFAyfQX1fWnKY9wb3KrgjaxGiFs9Kvua',
  port: 5432,
})
module.exports =pool

