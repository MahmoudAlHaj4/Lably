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
const { uploadProfileImages } = require('../middleware/uploadMiddleware')
const { validate } = require('../middleware/validationMiddleware')
const { body } = require('express-validator')
const router = express.Router()

router.post('/profile', authMiddleware,
    uploadProfileImages.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),
    [
        body('company_name').trim().notEmpty().withMessage('Company name is required.')
    ], validate, createEmployerProfile)

router.put('/profile', authMiddleware,
    uploadProfileImages.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),
    [
        body('company_name').optional().trim().notEmpty().withMessage('Company name cannot be empty.')
    ], validate, updateEmployerProfile)

router.get('/profile', authMiddleware, getEmployerProfile)

module.exports = router