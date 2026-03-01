/**
 * employerProfileRoutes.js
 * 
 * Routes for employer profile management.
 * All routes are protected by authMiddleware.
 * 
 * POST /api/employer/profile/employer-profile — Create a new employer profile. Employer only.
 * PUT  /api/employer/profile/employer-profile — Update existing employer profile. Employer only.
 * GET  /api/employer/profile/employer-profile — Get current employer profile.
 */

const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createEmployerProfile, updateEmployerProfile, getEmployerProfile } = require('../controllers/employerProfileController')
const router = express.Router()

router.post('/employer-profile', authMiddleware , createEmployerProfile)
router.put('/employer-profile', authMiddleware, updateEmployerProfile)
router.get('/employer-profile', authMiddleware , getEmployerProfile)

module.exports = router