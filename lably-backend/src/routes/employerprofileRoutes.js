const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createEmployerProfile } = require('../controllers/employerProfileController')
const router = express.Router()

router.post('/employer-profile', authMiddleware , createEmployerProfile)

module.exports = router