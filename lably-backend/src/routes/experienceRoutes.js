const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { addExperience, getJobExperiences, UpdateJobExperience, GetExperience, DeleteExperience } = require('../controllers/experienceController')
const router = express.Router()

router.post('/experience', authMiddleware , addExperience)
router.get('/experience', authMiddleware , getJobExperiences)
router.put('/experience/:id', authMiddleware , UpdateJobExperience)
router.get('/experience/:id', authMiddleware , GetExperience)
router.delete('/experience/:id', authMiddleware , DeleteExperience)

module.exports = router