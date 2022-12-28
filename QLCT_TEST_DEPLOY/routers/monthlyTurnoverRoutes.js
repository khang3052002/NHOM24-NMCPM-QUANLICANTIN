const app = require('express');
const path=require('path')
const router = app.Router();
const monthlyTurnoverController=require('../controllers/monthlyTurnoverController')
router.get('/',monthlyTurnoverController.loadPage)
router.post('/',monthlyTurnoverController.getCSV)
module.exports=router;
