const app=require('express');
const profileRoutes=app.Router();

profileRoutes.get('/',(req,res,next)=>{
    try{
        res.render('profile');
    }
    catch(Err){
        console.log(Err);
    }
})
module.exports=profileRoutes;