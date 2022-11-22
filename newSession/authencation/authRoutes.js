const app=require('express');
const authRoutes=app.Router();

authRoutes.post('/',(req,res,next)=>{
    try{
        var account=req.body.account;
        var password=req.body.password;
        //check account and password if they are in the db or not ?
        if(!(account&&password)){
            res.redirect('/');
        }
        //check user in database logic here:
        //...
        //
        else if(account=='admin@c.c' && password=='1'){
            req.session.user='admin'  //assign session.user= admin if you are admin.
            res.render('adminMain',{
                admin:true, //admin= true if you are admin, false if you are user.
                show:false   //false if you are logged-in.
            });
        }
        else{
            req.session.user='user' //assign session.user= user if you are admin.
            res.render('main',{
                admin:false, 
                show:false  //false if you are logged-in.
            });
        }
    }
    catch(err){}
})
authRoutes.get('/',(req,res,next)=>{
    try{
        if(req.session){
            req.session.destroy(error=>{
                if(error){
                    console.log(err);
                }
            })

            res.redirect('/'); 
        }
        else{
            res.redirect('/');
        }
    }catch(Err){
        console.log(Err);
    }

})
module.exports=authRoutes;