const app=require('express');
const productsRoutes=app.Router();

productsRoutes.get('/',(req,res,next)=>{
    try{
        res.render('products');
    }
    catch(Err){
        console.log(Err);
    }
})
module.exports=productsRoutes;