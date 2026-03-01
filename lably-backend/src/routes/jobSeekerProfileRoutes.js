const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createJobSeekerProfile, updateJobSeekerProfile, getProfile } = require('../controllers/jobSeekerProfileController')
const { jobSeekerMiddleware } = require('../middleware/jobSeekerMiddleware')
const router = express.Router()


router.post('/job-seeker-profile', authMiddleware , createJobSeekerProfile)
router.put('/job-seeker-profile', authMiddleware , updateJobSeekerProfile)
router.get('/job-seeker-profile', authMiddleware , getProfile)

module.exports = router