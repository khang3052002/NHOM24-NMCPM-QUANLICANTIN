
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadItemDetail=async(req,res,next)=>{
    try{
        user={}
        if(req.session){
            user=req.session.user
        }
        console.log('work')
        res.render('itemDetailPage',{user:{}})
    }
    catch(err){
        console.log(err)
    }
}
module.exports={loadItemDetail};