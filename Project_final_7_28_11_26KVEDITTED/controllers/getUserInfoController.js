
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadUserProfile=async(req,res,next)=>{
    try{
        var user={}
        if(req.session){
            user=req.session.user
        }
        var userInfo;
        userInfo =await dbModel.getUserInfo(req.session.user.id);
        console.log(userInfo)
        res.render('userProfilePage',{user:{},info:userInfo[0]})
    }catch(err){
        console.log(err);
    }
}
const getUserInfo=async(req,res,next)=>{
    try{
        var userInfo;
        userInfo =await dbModel.getUserInfo(req.session.user.id);
        res.send(userInfo)
    }catch(err){
        console.log(err);
    }
}
module.exports={getUserInfo,loadUserProfile};