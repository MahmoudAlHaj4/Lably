const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createJobSeekerProfile, updateJobSeekerProfile } = require('../controllers/jobSeekerProfileController')
const router = express.Router()


router.post('/job-seeker-profile', authMiddleware , createJobSeekerProfile)
router.put('/job-seeker-profile', authMiddleware , updateJobSeekerProfile)

module.exports = router