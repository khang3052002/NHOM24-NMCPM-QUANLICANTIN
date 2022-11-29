const app=require('express');
const router=app.Router();
const inStockController=require('../controllers/inStockController');

router.get('/',inStockController.loadStockPage);
router.post('/',inStockController.deleteProductInStock)
module.exports=router;