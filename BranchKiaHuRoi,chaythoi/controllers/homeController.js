const session = require("express-session");
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadHomePage=async(req,res,next)=>{
    try{
        var foodList
        var popularList
        user={}
        if(req.session.user){
            user=req.session.user
            console.log(user)
        }
        foodList=await dbModel.getTodayFood();
        popularList=await dbModel.getPopularItems(8)
        if(!(req.session&&req.session.role=='admin')){
            res.render('homePageNeutral',{
                role:req.session.role,
                foodList:foodList,
                user:user,
                popularList
            });
        }
        else if(req.session&&req.session.role=='admin'){
            res.render('homeAdminPage',{
                role:req.session.role,
                user:user,
                popularList:popularList
            });
        }
    }catch(err){
        console.log(err);
    }
}
module.exports={loadHomePage};