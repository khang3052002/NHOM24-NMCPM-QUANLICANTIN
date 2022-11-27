const dbModel = require('../models/dbHelpers/dbHelpers');
const CryptoJS = require("crypto-js");
const hashLength = 64;
const loadSignInPage = async (req, res, next) => {
    try {
        res.render('signInPage',{user:{}});
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

        if (uDb.length == 0) {
            res.send('tai khoan hoac mat khau khong dung');
        }
        const passwordDb = uDb[0].mat_khau;
        const salt = passwordDb.slice(hashLength);
        const passwordSalt = password + salt;
        const passwordHashed = CryptoJS.SHA3(passwordSalt, { outputLength: hashLength * 4 }).toString
            (CryptoJS.enc.Hex);
        if (passwordDb === (passwordHashed + salt)) {
            if (uDb[0].id.includes('CTMS')) {
 
                //req.session.user = 'user';
                req.session.user = { 'role': 'user', 'id': uDb[0].id, 'cartID': uDb[0].id_gio_hang,'img_url':uDb[0].img_url };
                req.session.role='user'
            }
            else if (uDb[0].id.includes('ADMS')) {
                req.session.user = { 'role': 'admin', 'id': uDb[0].id,'img_url':uDb[0].img_url }
                req.session.role='admin'
            }
            //{'role':'admin', "id":'id','cart':'cart'};
            //req.session.uid = uDb[0].f_ID;
            res.send('login successfully');
            // res.render('main', {
            //     admin: true, //admin= true if you are admin, false if you are user.
            //     show: false   //false if you are logged-in.
            // })
        }
       //res.send('wtf bros');
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