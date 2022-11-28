
const dbModel = require('../models/dbHelpers/dbHelpers');

const getCart = async(req,res)=>
{
    try {
        const idUser = req.session.user.id
        const idCart = req.session.user.cartID

        const result = await dbModel.getProductsCart(idCart)
        var total= 0
        for(i=0;i<result.length;i++)
        {
            total = total + result[i].thanh_tien
        }
        console.log(total)
        user = {}
        if (req.session.user) {
            user = req.session.user
        }
        res.render('userShoppingCart',{
            user:user,
            arrProduct: result,
            total: total,
            showEdit: false

        })
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

        // const params = {
        //     idUser: idUser,
        //     arrProID: arrProID,
        //     arrQuantity : arrQuantity
        // }
        // if()

        const resultDelete = await dbModel.editCart(idUser,queryStr)

        if(resultDelete.rows){
            res.send('Cập nhật thành công')

        }else{
            res.send(resultDelete)
        }


    } catch (error) {
        console.log(error)
    }
}
module.exports = { getCart,deleteItem,editCart}