const session = require("express-session");

const loadHomePage=(req,res,next)=>{
    try{
        console.log(req.session)
        if(!(req.session&&req.session.role=='admin')){
            var isLoggedIn=false;
            if(req.session.role=='user'){
                isLoggedIn=true;
            }
            res.render('homePageNeutral',{
                isLoggedIn:isLoggedIn
            });
        }
        else if(req.session&&req.session.role=='admin'){
            res.render('homeAdminPage',{
                isLoggedIn:true
            });
        }
    }catch(err){
        console.log(err);
    }
}
module.exports={loadHomePage};