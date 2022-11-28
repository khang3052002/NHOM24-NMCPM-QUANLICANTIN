
const dbModel = require('../models/dbHelpers/dbHelpers');

const getGoods = async (req, res) => {
    const key = req.query.key
    try {
        const result = await dbModel.getGoodSearchInfo(key)
        // console.log(result)
        // console.log(typeof result)
        // var foodList
        user = {}
        if (req.session.user) {
            user = req.session.user
            console.log(user)
        }
        res.render('searchGoodsResultPage',
            {
                user: user,
                key: key,
                arrResult : result
            })

        // console.log(result.rows)
        // console.log(result.rows)
        // res.render('searchGoodsResultPage')

    } catch (error) {
        console.log(error)
    }
}
module.exports = { getGoods }