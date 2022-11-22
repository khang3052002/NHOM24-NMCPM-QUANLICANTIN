const app=require('express');
const sign_inRoutes= app.Router();


sign_inRoutes.get('/',(req,res,next)=>{
    try{
        res.render('sign_in',{
            show:true,
        })
    }catch(err){
        console.log(err);
    }
})
module.exports=sign_inRoutes;