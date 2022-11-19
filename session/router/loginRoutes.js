const app=require("express");
const router=app.Router();

router.get('/',(req,res,next)=>{
    try{
        if(req.session.user!=null){
            res.redirect('/logged-in');
        }
        res.render('login')
    }catch(error){
        next(error);
    }

})
router.post('/',(req, res, next) =>{
    // Checking for the session

    // Checking for the authorization
    if (!req.session.user) {

        // Reading username and password
        var username = req.body.account;
        var password = req.body.password;


        //query
        const queryUsername = `select * from nguoi_ban AS KH WHERE KH.tai_khoan = '${username}' `
        const query = `
        SELECT * FROM nguoi_ban  WHERE tai_khoan  = '${username}' AND mat_khau = '${password}'`
        var check = 0;

        pool.query(queryUsername,(error, results) => {
            console.log('query');
            console.log(results.rows);
            if (error) {
                throw error
            }
            if (results.rows.length == 0) {
                res.redirect('/');
            }
            else {
                // const rs = await pool.query(query)
                pool.query(query, (err, rs) => {
                    if (err) throw err
                    else {
                        if (rs.rows.length == 0) {
                            res.redirect('/');
                        }

                    }
                })
            }
            check = 1;
        })
        console.log(check);
        if (Object.keys(req.body).length != 0) {
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
})
module.exports=router