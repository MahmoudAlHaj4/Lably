const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createEmployerProfile, updateEmployerProfile, getEmployerProfile } = require('../controllers/employerProfileController')
const router = express.Router()

router.post('/employer-profile', authMiddleware , createEmployerProfile)
router.put('/employer-profile', authMiddleware, updateEmployerProfile)
router.get('/employer-profile', authMiddleware , getEmployerProfile)

module.exports = router