const app=require("express");
const router=app.Router();

router.get('/',(req,res,next)=>{
    try{
        res.render('user')
    }catch(error){
        next(error);
    }

})
module.exports=router