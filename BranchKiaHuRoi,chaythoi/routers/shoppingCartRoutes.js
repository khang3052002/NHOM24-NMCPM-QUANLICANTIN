const app = require('express');
const router = app.Router();
const CartController=require('../controllers/CartController')


router.get('/', CartController.getCart)


module.exports = router;