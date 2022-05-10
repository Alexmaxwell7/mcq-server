var express = require('express')
var router = express.Router()
const apiController = require('../controller/apiController')



router.post('/registerstudent', apiController.registerStudent)
router.post('/registerteacher', apiController.registerTeacher)
router.post('/login', apiController.logIn)


router.get('/check', apiController.verifyToken, apiController.getCheck)


router.post('/testdone', apiController.testDone)


module.exports = router
