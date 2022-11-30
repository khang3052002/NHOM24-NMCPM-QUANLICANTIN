
const dbModel = require('../models/dbHelpers/dbHelpers');

const getCart = async(req,res)=>
{
    try {
        if(!(req.session&&req.session.user)){
            res.redirect('/sign-in')
        }
        else{
            const idUser = req.session.user.id
            const idCart = req.session.user.cartID
    
            var balance = await dbModel.getUserBalance(idUser)
            console.log(balance[0].so_du)
            
            const result = await dbModel.getProductsCart(idCart)
            var total= 0
            for(i=0;i<result.length;i++)
            {
                total = total + result[i].thanh_tien
            }
            // console.log(total)
            user = {}
            if (req.session.user) {
                user = req.session.user
            }
            res.render('userShoppingCart',{
                user:user,
                arrProduct: result,
                total: total,
                showEdit: false,
                balance: balance[0].so_du
            })
        }

    } catch (error) {
        console.log(error)
    }
    
}
const deleteItem = async(req,res)=>
{
    try {
        const idCart = req.session.user.cartID
        const idProduct = req.body.id
        console.log(idCart,idProduct)
        const res = await dbModel.deleteProductCart(idCart,idProduct)
    } catch (error) {
        console.log(error)
    } 
}
// const getCartEdit = async(req,res)=>
// {
//     try {
//         const idUser = req.session.user.id
//         const idCart = req.session.user.cartID

//         const result = await dbModel.getProductsCart(idCart)
//         var total= 0
//         for(i=0;i<result.length;i++)
//         {
//             total = total + result[i].thanh_tien
//         }
//         console.log(total)
//         user = {}
//         if (req.session.user) {
//             user = req.session.user
//         }
//         res.render('userShoppingCart',{
//             user:user,
//             arrProduct: result,
//             total: total,
//             showEdit: true
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
const editCart = async(req,res) =>
{
    try {
        // const idCart = req.session.user.cartID
        const arrProID = req.body.arrProID
        // const 
        const idUser = req.session.user.id
        const arrQuantity = req.body.arrQuantity
        console.log(arrProID,arrQuantity)


        idStr='ARRAY['
        amountStr='ARRAY['
        
        

        for(i=0;i<arrProID.length;i++){
            if(i!=arrProID.length-1){
                idStr= idStr.concat("'",arrProID[i],"'",",")
                amountStr= amountStr.concat(arrQuantity[i],",")
       
            }
            else{
                idStr= idStr.concat("'",arrProID[i],"'","]")
                amountStr= amountStr.concat(arrQuantity[i],"]")
       
            }
        }
        queryStr=idStr+","+amountStr


        const resultDelete = await dbModel.editCart(idUser,queryStr)

        if(resultDelete.rows){
            res.send('Cập nhật thành công')

        }else{
            res.send('Đã xảy ra lỗi')
        }


    } catch (error) {
        res.send('Đã xảy ra lỗi')
    }
}
const createOrder = async(req,res)=>
{
    try {
        const idUser = req.session.user.id
        const arrProID = req.body.arrProID
        const arrQuantity = req.body.arrQuantity

        console.log(idUser,arrProID,arrQuantity)
        idStr='ARRAY['
        amountStr='ARRAY['
        
        

        for(i=0;i<arrProID.length;i++){
            if(i!=arrProID.length-1){
                idStr= idStr.concat("'",arrProID[i],"'",",")
                amountStr= amountStr.concat(arrQuantity[i],",")
       
            }
            else{
                idStr= idStr.concat("'",arrProID[i],"'","]")
                amountStr= amountStr.concat(arrQuantity[i],"]")
       
            }
        }
        queryStr=idStr+","+amountStr
        console.log(queryStr)
        const result = await dbModel.createOrder(idUser,queryStr)

        const orderID = await dbModel.getOrderIDNewCreate(idUser)
        console.log(orderID)
        res.send({result: 'OK', orderID: orderID})
    } catch (error) {
        res.send('Đã xảy ra lỗi')
    }
}
module.exports = { getCart,deleteItem,editCart,createOrder}