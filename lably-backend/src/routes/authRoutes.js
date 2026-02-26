const express = require('express')
const { login, activateAccount } = require('../controllers/authController')
const router = express.Router()

router.post('/login', login)
router.put('/activate', activateAccount)

module.exports = router