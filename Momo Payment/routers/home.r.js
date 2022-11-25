const express=require("express");
const router=express.Router()
const homeController=require('../controllers/homeController.js')


// router.post('/momo',homeController.getIndex)
// router.post('/momo',homeController.callback)
// router.get('/momo',homeController.getIndex)


// router.get('/momo',homeController.callback)


router.get('/',homeController.getIndex)
router.post('/',homeController.receive)
// router.post('/zalo',homeController.receive)
module.exports = router