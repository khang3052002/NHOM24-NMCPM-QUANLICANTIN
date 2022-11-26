const session = require("express-session");
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadHomePage=async(req,res,next)=>{
    try{
        var foodList
        foodList=await dbModel.getTodayFood();
        if(!(req.session&&req.session.role=='admin')){
            var isLoggedIn=false;
            if(req.session.role=='user'){
                isLoggedIn=true 
            }
            res.render('homePageNeutral',{
                isLoggedIn:isLoggedIn,
                foodList:foodList
            });
        }
        else if(req.session&&req.session.role=='admin'){
            res.render('homeAdminPage',{
                isLoggedIn:true
            });
        }
    }catch(err){
        console.log(err);
    }
}
module.exports={loadHomePage};