const app = require('express');
const router = app.Router();
const itemDetailController=require('../controllers/itemDetailController')

router.get('/', itemDetailController.loadItemDetail)
module.exports = router;