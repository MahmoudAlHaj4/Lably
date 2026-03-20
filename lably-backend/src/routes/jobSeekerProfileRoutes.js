/**
 * jobSeekerProfileRoutes.js
 * 
 * Routes for job seeker profile management.
 * All routes are protected by authMiddleware and jobSeekerMiddleware.
 * 
 * POST /api/job-seeker/profile/job-seeker-profile — Create a new profile.
 * PUT  /api/job-seeker/profile/job-seeker-profile — Update existing profile.
 * GET  /api/job-seeker/profile/job-seeker-profile — Get current profile.
 */

const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createJobSeekerProfile, updateJobSeekerProfile, getProfile, getCandidateProfile } = require('../controllers/jobSeekerProfileController')
const { jobSeekerMiddleware } = require('../middleware/jobSeekerMiddleware')
const { employerMiddleware } = require('../middleware/employerMiddleware')
const { validate } = require('../middleware/validationMiddleware')
const { body } = require('express-validator')
const { uploadProfileImages } = require('../middleware/uploadMiddleware')
const router = express.Router()

router.post('/profile', authMiddleware, uploadProfileImages.single('profile_image'), [
    body('full_name').trim().notEmpty().withMessage('Full name is required.')
], validate, createJobSeekerProfile)

router.put('/profile', authMiddleware, jobSeekerMiddleware, uploadProfileImages.single('profile_image'), [
    body('full_name').optional().trim().notEmpty().withMessage('Full name cannot be empty.')
], validate, updateJobSeekerProfile)

router.get('/profile', authMiddleware, jobSeekerMiddleware, getProfile)
router.get('/profile/:id', authMiddleware, getCandidateProfile)

module.exports = router