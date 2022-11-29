const app = require('express');
const router = app.Router();
const addNewItemController=require('../controllers/addNewItemController')

router.get('/', addNewItemController.loadPage)

module.exports = router;