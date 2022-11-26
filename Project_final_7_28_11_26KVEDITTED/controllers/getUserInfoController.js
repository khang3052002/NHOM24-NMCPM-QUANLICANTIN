
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
const updateUser=async(req,res,next)=>{
    const idUser = req.session.user.id
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    try {
        var res = await dbModel.updateUserInfo(idUser,name,email,phone)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
module.exports={getUserInfo,loadUserProfile,updateUser};