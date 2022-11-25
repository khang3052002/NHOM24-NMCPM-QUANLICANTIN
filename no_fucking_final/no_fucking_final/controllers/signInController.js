// authRoutes.post('/', async (req, res, next) => {
//     try {


//         // console.log(rs);
//         var username = req.body.username;
//         var password = req.body.password;
//       //  console.log(username,password);
//         const uDb = await user.queryUser(username);
//         console.log(uDb);

//         const passwordDb = uDb[0].f_Password;
//         console.log(passwordDb);
//         const salt = passwordDb.slice(hashLength);
//         console.log(passwordDb);
//         const passwordSalt = password + salt;
//         const passwordHashed = CryptoJS.SHA3(passwordSalt, { outputLength: hashLength * 4 }).toString
//             (CryptoJS.enc.Hex);
//         console.log(passwordHashed+salt);
//         if (passwordDb === (passwordHashed + salt)) {
//             if(parseInt(uDb[0].f_Permission)){
//                 req.session.user ='admin';
//             }
//             else{
//                 req.session.user ='user'
//             }
//              //{'role':'admin', "id":'id','cart':'cart'};
//             //req.session.uid = uDb[0].f_ID;
//             res.redirect('/product-details?id=10')
//             // res.render('main', {
//             //     admin: true, //admin= true if you are admin, false if you are user.
//             //     show: false   //false if you are logged-in.
//             // })
//         }
//             //check username and password if they are in the db or not ?
//             if (!(username && password)) {
//                 res.redirect('/');
//             }
//             //check user in database logic here:
//             //...
//             //
//             // else if (isInDB(username, rs)) {
//             //     console.log('yes')
//             //     req.session.user = 'admin'  //assign session.user= admin if you are admin.
//             //     res.render('adminMain', {
//             //         admin: true, //admin= true if you are admin, false if you are user.
//             //         show: false   //false if you are logged-in.
//             //     });
//             // }
//             // else {
//             //     req.session.user = 'user' //assign session.user= user if you are admin.
//             //     res.render('main', {
//             //         admin: false,
//             //         show: false  //false if you are logged-in.
//             //     });
//             // }
//         }
//     catch (err) { 
//         console.log(err);
//     }
//     })



const dbModel = require('../models/dbHelpers/dbHelpers');
const CryptoJS = require("crypto-js");
const hashLength = 64;
const loadSignInPage = async (req, res, next) => {
    try {
        res.render('signInPage');
    }
    catch (err) {
        next()
    }

}
const authentication = async (req, res, next) => {
    try {
        var username = req.body.username;
        var password = req.body.password;
        var role = req.body.role;
        user = {
            username: username,
            password: password
        }
        var uDb;
        
        if (role == 'user') {
            uDb = await dbModel.userAuthentication(user);
        }
        else if (role == 'admin') {
            uDb = await dbModel.adminAuthentication(user);
        }

        console.log(uDb);
        if (uDb.length == 0) {
            res.send('tai khoan hoac mat khau khong dung');
        }
        const passwordDb = uDb[0].mat_khau;
        const salt = passwordDb.slice(hashLength);
        const passwordSalt = password + salt;
        const passwordHashed = CryptoJS.SHA3(passwordSalt, { outputLength: hashLength * 4 }).toString
            (CryptoJS.enc.Hex);
        console.log(passwordHashed + salt);
        if (passwordDb === (passwordHashed + salt)) {
            if (uDb[0].id.includes('CTMS')) {
                req.session.user = 'user';
                // req.session.user = { 'role': 'user', 'id': uDb[0].id, 'cartID': uDb[0].id_gio_hang };
            }
            else if (uDb[0].id.includes('ADMS')) {
                req.session.user = { 'role': 'admin', 'id': uDb[0].id }
            }
            //{'role':'admin', "id":'id','cart':'cart'};
            //req.session.uid = uDb[0].f_ID;
            res.send('login successfully');
            // res.render('main', {
            //     admin: true, //admin= true if you are admin, false if you are user.
            //     show: false   //false if you are logged-in.
            // })
        }
        res.send('wtf bros');
        //check username and password if they are in the db or not ?
        // if (!(username && password)) {
        //     res.redirect('/');
        // }
        //check user in database logic here:
        //...
        //
        // else if (isInDB(username, rs)) {
        //     console.log('yes')
        //     req.session.user = 'admin'  //assign session.user= admin if you are admin.
        //     res.render('adminMain', {
        //         admin: true, //admin= true if you are admin, false if you are user.
        //         show: false   //false if you are logged-in.
        //     });
        // }
        // else {
        //     req.session.user = 'user' //assign session.user= user if you are admin.
        //     res.render('main', {
        //         admin: false,
        //         show: false  //false if you are logged-in.
        //     });
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    authentication, loadSignInPage
}