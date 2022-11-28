const app = require('express');
const router = app.Router();
const cartController=require('../controllers/cartController')


router.get('/', cartController.getCart)
// router.get('/edit', cartController.getCartEdit)

router.post('/',cartController.editCart)


module.exports = router;
