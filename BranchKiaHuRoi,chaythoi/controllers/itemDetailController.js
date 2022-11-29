
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadItemDetail=async(req,res,next)=>{
    user={}
    if(req.session.user){
        user=req.session.user;
    }
    try{
        query=req.query
        item=await dbModel.getFoodById(query.id);
        res.render('itemDetailPage',{user:user,item:item[0]})
    }
    catch(err){
        res.render('errorPage',{
            user:user,
            message:err.message
        })
    }
}
const addProToCart=async(req,res)=>
{
    try {
        if(!(req.session&&req.session.user)){
            res.send({name:false});
        }
        else{
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
        }

    } catch (error) {
        res.send(error.message)
    }
}
module.exports={loadItemDetail,addProToCart};