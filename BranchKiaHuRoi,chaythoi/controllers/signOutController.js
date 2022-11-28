const signOut=(req,res,next)=>{
    try{
        user={}
        if(req.session.user){
            user=req.session.user;
        }
        msg='Bạn đã đăng xuất thành công'
        if (req.session) {
            req.session.destroy(error => {
                if (error) {
                    console.log(err);
                }
            })

            res.render('signOutPage.hbs',{message: msg,user:{}});
        }
        else {
            res.render('signOutPage.hbs',{message: msg,user:{}});
        }
    }catch(err){
        res.render('signOutPage.hbs',{message: err.message,user:user});
    }
}
module.exports={
    signOut
}