const app = require('express');
const router = app.Router();
const tradingHistoryController=require('../controllers/tradingHistoryController')

router.get('/',tradingHistoryController.loadDetails)
module.exports=router;
