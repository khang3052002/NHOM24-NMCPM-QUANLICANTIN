const {Client}=require('pg');
const  client=new  Client({
  host:'localhost',
  user:'postgres',
  port:5432,
  password:'khoacr123',
  database:'DB_QuanLySanPham'
})

module.exports=client;
//client.connect();
// client.query('SELECT * FROM "Categories"',(err,res)=>{
//     if(!err){
//         console.log(res.rows);
//     }
//     else{
//         console.log(err.message);
//     }
// })