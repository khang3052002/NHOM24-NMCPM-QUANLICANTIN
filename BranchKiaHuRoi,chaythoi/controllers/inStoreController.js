const dbModel = require('../models/dbHelpers/dbHelpers');
const moment = require('moment')
loadStorePage= async (req,res,next)=>{
    user={}
    if(req.session.user){
        user=req.session.user;
    }
    try{
        if(req.query.section=='details'){
            var productDetails=await dbModel.getCurrentStorageDetails();
            if(productDetails.rows){
                productDetails=productDetails.rows

                res.render('inStoreDetailsPage',{
                    title:'Hàng trong kho',
                    user:user,
                    product:productDetails
                })
            }
            else{
                res.render('inStoreDetailsPage',{
                    title:'Hàng trong kho',
                    user:user,
                    message:productDetails
                })
            }
        }
        else{
            var product=await dbModel.getCurrentStorage();
            if(product.rows){
                product=product.rows
                res.render('inStorePage',{
                    title:'Hàng trong kho',
                    user:user,
                    product:product
                })
            }
            else{
                res.render('inStorePage',{
                    title:'Hàng trong kho',
                    user:user,
                    message:product
                })
            }
            // console.log(product)

        }

    }catch(err){
        res.render('errorPage',{
            title:'Lỗi',
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