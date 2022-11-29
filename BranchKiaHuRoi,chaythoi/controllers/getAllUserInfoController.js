
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadAllUserInfoPage=async(req,res,next)=>{
    try{
        var user={}
        if(req.session.user){
            user=req.session.user
        }
        var allUserInfo=await dbModel.getAllUserInfo();
        res.render('allUserInfoPage',{
            users: allUserInfo,
            user:user
        })
        
    }catch(err){
        res.render('errorPage',{
            user:user,
            message:err.message
        })
    }
}
const updateUserBalance=async(req,res,next)=>{
    try{
        const users=req.body.users; 
        var allUserInfo=await dbModel.setUsersBalance(users);
        if(allUserInfo.rows){
            res.send('Cập nhật giá thành công')
        }
        res.send('Đã xảy ra lỗi')
        
    }catch(err){
        res.send('Đã xảy ra lỗi')
    }
}

module.exports={loadAllUserInfoPage,updateUserBalance};