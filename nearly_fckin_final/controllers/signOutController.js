const signOut=(req,res,next)=>{
    try{
        if (req.session) {
            req.session.destroy(error => {
                if (error) {
                    console.log(err);
                }
            })

            res.redirect('/');
        }
        else {
            res.redirect('/');
        }
    }catch(err){
        console.log(err);
    }
}
module.exports={
    signOut
}