
const dbModel = require('../models/dbHelpers/dbHelpers');

const getGoods = async (req, res) => {
    message=""
    try {
        console.log(req.query)
        user = {}
        if (req.session.user) {
            user = req.session.user
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
            if(result.rows){
                result=result.rows
                res.render('searchGoodsResultPage',
                {
                    user: user,
                    key: key,
                    arrResult : result
                })
            }
            else{
                res.render('searchGoodsResultPage',
                {
                    user: user,
                    key: key,
                    message:result
                })
            }
        
            
    
        }

    } catch (error) {
        res.render('errorPage',{
            user:user,
            message:error.message
        })
    }
}
module.exports = { getGoods }