
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadAllUserInfoPage=async(req,res,next)=>{
    try{
        var allUserInfo=await dbModel.getAllUserInfo();
        res.render('allUserInfoPage',{
            user: allUserInfo
        })
        
    }catch(err){
        console.log(err);
    }
}
const updateUserBalance=async(req,res,next)=>{
    try{
        const users=req.body.users; 
        console.log(users)
        var allUserInfo=await dbModel.setUsersBalance(users);
        console.log(allUserInfo);
        res.send('cập nhật giá thành công')
        
    }catch(err){
        console.log(err);
        res.send('đã xảy ra lỗi')
    }
}
// const loadUserProfile=async(req,res,next)=>{
//     try{
//         var user={}
//         if(req.session){
//             user=req.session.user
//         }
//         var userInfo;
//         userInfo =await dbModel.getUserInfo(req.session.user.id);
//         console.log(userInfo)
//         res.render('userProfilePage',{user:{},info:userInfo[0]})
//     }catch(err){
//         console.log(err);
//     }
// }
// const getUserInfo=async(req,res,next)=>{
//     try{
//         var userInfo;
//         userInfo =await dbModel.getUserInfo(req.session.user.id);
//         res.send(userInfo)
//     }catch(err){
//         console.log(err);
//     }
// }
// const updateUser=async(req,res,next)=>{
//     const idUser = req.session.user.id
//     const name = req.body.name
//     const email = req.body.email
//     const phone = req.body.phone
//     try {
//         var res = await dbModel.updateUserInfo(idUser,name,email,phone)
//         console.log(res)
//     } catch (error) {
//         console.log(error)
//     }
// }
module.exports={loadAllUserInfoPage,updateUserBalance};