
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
            console.log(user)
        }
        res.render('userShoppingCart',{
            user:user,
            arrProduct: result,
            total: total

        })
    } catch (error) {
        console.log(error)
    }
    
}
module.exports = { getCart}