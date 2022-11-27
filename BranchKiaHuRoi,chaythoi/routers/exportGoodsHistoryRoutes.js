const app = require('express');
const router = app.Router();
const exportGoodsHistoryController=require('../controllers/importGoodsHistoryController')

router.get('/', exportGoodsHistoryController.loadHistory)

module.exports = router;