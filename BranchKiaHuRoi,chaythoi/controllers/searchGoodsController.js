
const dbModel = require('../models/dbHelpers/dbHelpers');

const getGoods = async (req, res) => {

    try {
        console.log(req.query)
        user = {}
        if (req.session.user) {
            user = req.session.user
            console.log(user)
        }

        var key=""
        if(req.query.key){
            key = req.query.key
        }
        var category=""
        if(req.query.category && !req.query.key){
            category = req.query.category

            const result = await dbModel.searchByCategory(category)
            res.render('searchGoodsResultPage',
            {
                user: user,
                key: category,
                arrResult : result
            })

        }
        else{
            const result = await dbModel.getGoodSearchInfo(key)
        
            res.render('searchGoodsResultPage',
                {
                    user: user,
                    key: key,
                    arrResult : result
                })
    
        }

    } catch (error) {
        res.render('errorPage',{
            user:user,
            message:error.message
        })
    }
}
module.exports = { getGoods }