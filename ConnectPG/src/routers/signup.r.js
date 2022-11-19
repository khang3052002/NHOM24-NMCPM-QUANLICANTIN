const express = require('express')
const route = express.Router()

const signupController = require('../controllers/signupController')

route.get('/',signupController.signup)

module.exports = route
