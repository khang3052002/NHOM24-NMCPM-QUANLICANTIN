// Importing express module
const express = require("express")

// Importing express-session module
const session = require("express-session")
const ejsmodule = require('ejs')
// Importing file-store module
const filestore = require("session-file-store")(session)
const pool = require('./config/db/db')
const path = require("path")
const loginRoutes = require("./router/loginRoutes");
const pg = require("pg");
// const adminRouter = require("./router/loginAdminR");
// const userRouter = require("./router/loginUserR");

// Setting up the server
var app = express();
app.listen(3000, () => {
    console.log("Server is Starting")
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Creating session 
app.use(session({
    name: "session-id",
    secret: "GFGEnter", // Secret key,
    saveUninitialized: false,
    resave: false,
    store: new filestore()
}))
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

// const login = require('./router/login.r')
//const signupRouter = require('./routers/signup.r')
// app.use('/login', loginRouter)
//app.use('/signup',signupRouter)


// function queryAdmin(username, password) {
//     const queryUsername = `select * from khach_hang AS KH WHERE KH.tai_khoan = '${username}' `
//     const query = `
//   SELECT * FROM khach_hang  WHERE tai_khoan  = '${username}' AND mat_khau = '${password}'  
// `
//     const checkLogin = (request, response) => {
//         pool.query(queryUsername, (error, results) => {
//             if (error) {
//                 throw error
//             }
//             if (results.rows.length == 0) {
//                 response.send({ exist: false })
//             }
//             else {
//                 // const rs = await pool.query(query)
//                 pool.query(query, (err, rs) => {
//                     if (err) throw err
//                     else {
//                         if (rs.rows.length == 0) {
//                             response.send({ connect: false, exist: true })
//                         }
//                         response.send({ connect: true, exist: true })
//                     }
//                 })
//             }
//         })
//     }
// }

app.use('/', loginRoutes);
app.post('/logged-in', auth);
app.get('/logged-in', auth);
app.post('/logout', (req, res, next) => {
    req.session.destroy(function (err) {
        if (err) {
            console.error(err);
        }
    });
    console.log('del session')
    res.redirect(302, '/');
})



async function query_acc(){
    var conString = "postgres://jvpaazmn:VFAyfQX1fWnKY9wb3KrgjaxGiFs9Kvua@rosie.db.elephantsql.com/jvpaazmn"
    // const queryUsername = `select * from nguoi_ban AS KH WHERE KH.tai_khoan = '${username}' `
    // const query = `
    // SELECT * FROM nguoi_ban  WHERE tai_khoan  = '${username}' AND mat_khau = '${password}'`
    var client = new pg.Client(conString);
    var check=0;
    await client.connect();
    const res= await client.query(`select * from nguoi_ban `)
    await client.end();
    console.log(res);
}

function auth(req, res, next) {
    // Checking for the session

    // Checking for the authorization
    if (!req.session.user) {

        // Reading username and password
        var username = req.body.account;
        var password = req.body.password;

        //------------
        query_acc();
        console.log('end query');

        //---------------------------------------
        //query
        // const queryUsername = `select * from nguoi_ban AS KH WHERE KH.tai_khoan = '${username}' `
        // const query = `
        // SELECT * FROM nguoi_ban  WHERE tai_khoan  = '${username}' AND mat_khau = '${password}'`
        // var check = 0;

        // pool.query(queryUsername, async (error, results) => {
        //     console.log('query');
        //     console.log(results.rows);
        //     if (error) {
        //         throw error
        //     }
        //     if (results.rows.length == 0) {
        //         res.redirect('/');
        //     }
        //     else {
        //         // const rs = await pool.query(query)
        //         pool.query(query, (err, rs) => {
        //             if (err) throw err
        //             else {
        //                 if (rs.rows.length == 0) {
        //                     res.redirect('/');
        //                 }

        //             }
        //         })
        //     }
        //     check = 1;
        // })
        // console.log(check);
        //var check=1;
        if (Object.keys(req.body).length != 0) {
            console.log('success');
            if (check == 1) {
                req.session.user = "admin2"
                res.render('admin')
            }
            else {
                // Retry incase of incorrect credentials
                req.session.user = "user"
                res.render('user')
            }
        }
        else {
            res.redirect(302, '/');
        }

    }
    else {
        if (req.session.user === "admin2") {
            res.render('admin')
        }
        else {
            res.render('user')
        }
    }
}

// Middlewares




// Server setup
