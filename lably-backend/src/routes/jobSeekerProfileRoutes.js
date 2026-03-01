const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createJobSeekerProfile, updateJobSeekerProfile, getProfile } = require('../controllers/jobSeekerProfileController')
const { jobSeekerMiddleware } = require('../middleware/jobSeekerMiddleware')
const router = express.Router()


router.post('/job-seeker-profile', authMiddleware ,jobSeekerMiddleware, createJobSeekerProfile)
router.put('/job-seeker-profile', authMiddleware ,jobSeekerMiddleware, updateJobSeekerProfile)
router.get('/job-seeker-profile', authMiddleware ,jobSeekerMiddleware, getProfile)

module.exports = router