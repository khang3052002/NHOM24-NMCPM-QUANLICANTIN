
const dbModel = require('../models/dbHelpers/dbHelpers');
const getAllGoods=async(req,res,next)=>{
    try{
        var allGoodsInfo
        allGoodsInfo=await dbModel.getAllGoods()
        res.send(allGoodsInfo)
    }
    catch(err){
        console.log(err)
    }
}
module.exports={getAllGoods};