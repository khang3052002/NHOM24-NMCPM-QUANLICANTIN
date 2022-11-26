const session = require("express-session");
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadHomePage=async(req,res,next)=>{
    try{
        var foodList
        user={}
        if(req.session.user){
            user=req.session.user
            console.log(user)
        }
        foodList=await dbModel.getTodayFood();
        if(!(req.session&&req.session.role=='admin')){
            res.render('homePageNeutral',{
                role:req.session.role,
                foodList:foodList,
                user:user
            });
        }
        else if(req.session&&req.session.role=='admin'){
            res.render('homeAdminPage',{
                role:req.session.role,
                user:user
            });
        }
    }catch(err){
        console.log(err);
    }
}
module.exports={loadHomePage};