const dbModel = require('../models/dbHelpers/dbHelpers');
const moment = require('moment')
loadStorePage= async (req,res,next)=>{
    user={}
    if(req.session.user){
        user=req.session.user;
    }
    try{
        if(req.query.section=='details'){
            const productDetails=await dbModel.getCurrentStorageDetails();
            // console.log(productDetails)
            res.render('inStoreDetailsPage',{
                user:user,
                product:productDetails
            })
        }
        else{
            const product=await dbModel.getCurrentStorage();
            // console.log(product)
            res.render('inStorePage',{
                user:user,
                product:product
            })
        }

    }catch(err){
        res.render('errorPage',{
            user:user,
            message:err.message
        })
    }
}

deleteProductInStore=async(req,res,next)=>{
    try{
        const id=req.body.id;
        const dateStr=req.body.dateM.toString();
        console.log(dateStr);
        // console.log(Date.parse(dateStr) )
        const date =moment(new Date(dateStr)).format('YYYY-MM-DD')
        //console.log(moment(Date.parse(dateStr)).format())
        // const dateExp=req.body.dateExp;
        // console.log(dateM)
        const result=await dbModel.deleteProductInStore(id,date)
        res.send('Xóa sản phẩm thành công')

    }catch(err){
        console.log(err)
        res.send('Đã xảy ra lỗi')
    }
}

module.exports={
    loadStorePage,deleteProductInStore
}