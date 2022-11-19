const express = require('express')
const route = express.Router()

const loginController = require('../controllers/loginController')

route.get('/',loginController.checkLogin)

module.exports = route
