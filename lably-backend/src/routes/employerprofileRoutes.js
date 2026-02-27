const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createEmployerProfile, updateEmployerProfile } = require('../controllers/employerProfileController')
const router = express.Router()

router.post('/employer-profile', authMiddleware , createEmployerProfile)
router.put('/employer-profile', authMiddleware, updateEmployerProfile)

module.exports = router