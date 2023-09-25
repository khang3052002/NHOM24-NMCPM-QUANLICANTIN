const session = require("express-session");
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadHomePage=async(req,res,next)=>{
    try{
        var foodList
        var popularList
        user={}
        if(req.session.user){
            user=req.session.user
            console.log(user)
        }
        foodList=await dbModel.getTodayFood();
        popularList=await dbModel.getPopularItems(8)
        if(!(req.session&&req.session.role=='admin')){
            res.render('homePageNeutral',{
                title:'Trang chủ',
                role:req.session.role,
                foodList:foodList,
                user:user,
                popularList,
                
            });
        }
        else if(req.session&&req.session.role=='admin'){
            res.render('homeAdminPage',{
                title:'Trang chủ admin',
                role:req.session.role,
                user:user,
                popularList:popularList,
                

            });
        }
    }catch(err){
        res.render('errorPage',{
            user:user,
            message:err.message
        })
    }
}

// const addToCart=async(req,res,next)=>{
//     try{
//         if(!req.session.user){
//             res.redirect('/sign-in')
//         }
//         else{
//             const idPro = req.body.id
//             const quantity = req.body.quantity
//             const name = req.body.name
//             if(req.session.user){
//                 user=req.session.user
//             }

//             const params = {
//                 id: req.session.user.id,
//                 idPro : idPro,
//                 quantity:quantity
//             }
    
//             const result = await dbModel.addProductToCart(params)
//             res.send({name:name})
//         }

//     }catch(err){

//     }
// }
module.exports={loadHomePage};