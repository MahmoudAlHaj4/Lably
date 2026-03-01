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
const { createJobSeekerProfile, updateJobSeekerProfile, getProfile } = require('../controllers/jobSeekerProfileController')
const { jobSeekerMiddleware } = require('../middleware/jobSeekerMiddleware')
const router = express.Router()


router.post('/job-seeker-profile', authMiddleware ,jobSeekerMiddleware, createJobSeekerProfile)
router.put('/job-seeker-profile', authMiddleware ,jobSeekerMiddleware, updateJobSeekerProfile)
router.get('/job-seeker-profile', authMiddleware ,jobSeekerMiddleware, getProfile)

module.exports = router