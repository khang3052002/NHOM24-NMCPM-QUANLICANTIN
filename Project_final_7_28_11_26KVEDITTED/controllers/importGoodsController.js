
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadPage=async(req,res,next)=>{
    try{
        user={}
        if(req.session.user){
            user=req.session.user
        }
        allGoods=await dbModel.getAllGoods()
        // console.log(allGoods)
        res.render('importGoodsPage',{user:user,goodsList:allGoods})
    }
    catch(err){
        console.log(err)
    }
}
module.exports={loadPage};