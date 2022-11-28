const dbModel = require('../models/dbHelpers/dbHelpers');

loadStorePage= async (req,res,next)=>{
    try{
        var user={}
        if(req.session.user){
            user=req.session.user
        }
        if(req.query.section=='details'){
            const productDetails=await dbModel.getCurrentStorageDetails();
            console.log(productDetails)
            res.render('inStoreDetailsPage',{
                user:user,
                product:productDetails
            })
        }
        else{
            const product=await dbModel.getCurrentStorage();
            console.log(product)
            res.render('inStorePage',{
                user:user,
                product:product
            })
        }

    }catch(err){
        console.log(err)
    }
}

module.exports={
    loadStorePage
}