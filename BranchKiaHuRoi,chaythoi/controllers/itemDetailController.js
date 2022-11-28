
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
const addProToCart=async(req,res)=>
{
    try {
        const idPro = req.body.id
        const quantity = req.body.quantity
        const name = req.body.name
        if(req.session.user){
            user=req.session.user
        }
        console.log(idPro,quantity,req.session.user.cartID, req.session.user.id)
        // console.log(name)
        const params = {
            id: req.session.user.id,
            idPro : idPro,
            quantity:quantity
        }

        const result = await dbModel.addProductToCart(params)
        res.send({name:name})
    } catch (error) {
        console.log(error)
    }
}
module.exports={loadItemDetail,addProToCart};