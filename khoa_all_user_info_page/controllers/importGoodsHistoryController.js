const dbModel = require('../models/dbHelpers/dbHelpers');
const loadHistory=async(req,res,next)=>{
    user={}
    if(req.session.user){
        user=req.session.user
    }
    res.render('importGoodsHistoryPage',{user:user})
}

module.exports={loadHistory};