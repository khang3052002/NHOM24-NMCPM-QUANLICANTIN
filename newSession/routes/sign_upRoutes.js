const app=require('express');
const sign_upRoutes= app.Router();


sign_upRoutes.get('/',(req,res,next)=>{
    try{
        res.render('sign_up',{
            show:true,
        })
    }catch(err){
        console.log(err);
    }
})
module.exports=sign_upRoutes;