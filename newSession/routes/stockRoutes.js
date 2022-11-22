const app=require('express');
const stockRoutes=app.Router();

stockRoutes.get('/',(req,res,next)=>{
    try{
        res.render('stock');
    }
    catch(Err){
        console.log(Err);
    }
})
module.exports=stockRoutes;