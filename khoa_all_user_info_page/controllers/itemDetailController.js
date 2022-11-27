
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadItemDetail=async(req,res,next)=>{
    try{
        query=req.query
        user={}
        if(req.session.user){
            user=req.session.user
        }
        item=await dbModel.getFoodById(query.id);
        res.render('itemDetailPage',{user:user,item:item[0]})
    }
    catch(err){
        console.log(err)
    }
}
module.exports={loadItemDetail};