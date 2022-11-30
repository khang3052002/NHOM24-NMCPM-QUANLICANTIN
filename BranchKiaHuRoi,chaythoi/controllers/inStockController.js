const dbModel = require('../models/dbHelpers/dbHelpers');
const moment = require('moment')
loadStockPage= async (req,res,next)=>{
    try{
        var user={}
        if(req.session.user){
            user=req.session.user
        }
        if(req.query.section=='details'){
            const productDetails=await dbModel.getCurrentCanteenDetails();
            // console.log(productDetails)
            res.render('inStockDetailsPage',{
                user:user,
                product:productDetails
            })
        }
        else{
            const product=await dbModel.getCurrentCanteen();
            res.render('inStockPage',{
                user:user,
                product:product
            })
        }

    }catch(err){
        console.log(err)
    }
}

deleteProductInStock=async(req,res,next)=>{
    try{
        const id=req.body.id;
        const dateStr=req.body.dateM.toString();
        // console.log(dateStr);
        // console.log(Date.parse(dateStr) )
        const date =moment(new Date(dateStr)).format('YYYY-MM-DD')
        //console.log(moment(Date.parse(dateStr)).format())
        // const dateExp=req.body.dateExp;
        // console.log(dateM)
        const result=await dbModel.deleteProductInCanteen(id,date)
        res.send('Xóa sản phẩm thành công')

    }catch(err){
        console.log(err)
        res.send('Đã xảy ra lỗi')
    }
}

module.exports={
    loadStockPage,deleteProductInStock
}