const express = require('express')
const app = express()
const port = 3000

// const client = require('./config/db/db')

// client.connectDB();

// const db = require('./config/db/db')
// db.connect()




const loginRouter = require('./routers/login.r')
const signupRouter = require('./routers/signup.r')
app.use('/login', loginRouter)
app.use('/signup',signupRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


// var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

// var conString = "postgres://jvpaazmn:VFAyfQX1fWnKY9wb3KrgjaxGiFs9Kvua@rosie.db.elephantsql.com/jvpaazmn";//bkzignwxxysloi:d9f8f59f0177f70013be77b74fbb15db49287193c75e6be70358cf36dffe51cf@ec2-52-205-98-159.compute-1.amazonaws.com:5432/dd8e4ihb5t3jsh" //Can be found in the Details page
// var client = new pg.Client(conString);
// client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT * FROM PUBLIC."KHACH_HANG"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });