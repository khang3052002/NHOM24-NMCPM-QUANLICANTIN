
const dbModel = require('../models/dbHelpers/dbHelpers');

const loadPage = async(req,res)=>
{
    try {
        user={}
        if(req.session.user){
            user=req.session.user
        }
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = { loadPage}