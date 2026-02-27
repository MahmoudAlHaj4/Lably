const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createJobSeekerProfile } = require('../controllers/jobSeekerProfileController')
const router = express.Router()


router.post('/job-seeker-profile', authMiddleware , createJobSeekerProfile)

module.exports = router