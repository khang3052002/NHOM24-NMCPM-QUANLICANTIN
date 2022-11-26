const signOut=(req,res,next)=>{
    try{
        msg='Bạn đã đăng xuất thành công'
        if (req.session) {
            req.session.destroy(error => {
                if (error) {
                    console.log(err);
                }
            })

            res.render('signOutPage.hbs',{message: msg});
        }
        else {
            res.render('signOutPage.hbs',{message: msg});
        }
    }catch(err){
        res.render('signOutPage.hbs',{message: err.message});
    }
}
module.exports={
    signOut
}