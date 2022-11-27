
const { query } = require('express');
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

const addNewReceipt=async(req,res,next)=>{
    try{

        // console.log(req.body)
        list=req.body;

        category=list.category
        amount=list.amount
        price=list.price
        mfDate=list.mfDate

        categoryStr='ARRAY['
        amountStr='ARRAY['
        priceStr='ARRAY['
        mfDateStr="'{"

        console.log(category.length)
        for(i=0;i<category.length;i++){
            if(i!=category.length-1){
                categoryStr= categoryStr.concat("'",category[i],"'",",")
                amountStr= amountStr.concat(amount[i],",")
                priceStr= priceStr.concat(price[i],",")
                mfDateStr= mfDateStr.concat(mfDate[i],",")
            }
            else{
                categoryStr=categoryStr.concat("'",category[i],"']")
                amountStr= amountStr.concat(amount[i],"]")
                priceStr= priceStr.concat(price[i],"]")
                mfDateStr= mfDateStr.concat(mfDate[i],"}'")
            }
        }
        queryStr=categoryStr+","+amountStr+","+priceStr+","+mfDateStr

        result=await dbModel.addNewReceipt(queryStr)
        if(result.rows){
            res.send(result.rows[0])
        }
        else{
            res.send(result)
        }
        
    }
    catch(err){
        console.log(err)
    }
}
module.exports={loadPage,addNewReceipt};