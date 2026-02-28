const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { addExperience, getJobExperiences, UpdateJobExperience, GetExperience, DeleteExperience } = require('../controllers/experienceController')
const { jobSeekerMiddleware } = require('../middleware/jobSeekerMiddleware')
const router = express.Router()

router.post('/experience', authMiddleware,jobSeekerMiddleware , addExperience)
router.get('/experience', authMiddleware ,jobSeekerMiddleware, getJobExperiences)
router.put('/experience/:id', authMiddleware, jobSeekerMiddleware , UpdateJobExperience)
router.get('/experience/:id', authMiddleware , GetExperience)
router.delete('/experience/:id', authMiddleware, jobSeekerMiddleware , DeleteExperience)

module.exports = router