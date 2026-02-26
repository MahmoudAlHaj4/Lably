const express = require('express')
const { login, activateAccount, employerRegister } = require('../controllers/authController')
const router = express.Router()

router.post('/login', login)
router.put('/activate', activateAccount)
router.post('/register', employerRegister)

module.exports = router