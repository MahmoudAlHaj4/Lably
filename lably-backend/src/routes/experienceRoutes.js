/**
 * experienceRoutes.js
 * 
 * Routes for job seeker experience section.
 * 
 * POST   /api/experience-section/experience       — Add a new experience. Job seeker only.
 * GET    /api/experience-section/experience       — Get all experiences. Job seeker only.
 * PUT    /api/experience-section/experience/:id   — Update an experience. Job seeker only.
 * GET    /api/experience-section/experience/:id   — Get a single experience. Authenticated only.
 * DELETE /api/experience-section/experience/:id   — Delete an experience. Job seeker only.
 */

const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { addExperience, getJobExperiences, UpdateJobExperience, GetExperience, DeleteExperience } = require('../controllers/experienceController')
const { jobSeekerMiddleware } = require('../middleware/jobSeekerMiddleware')
const router = express.Router()

router.post('/experiences', authMiddleware,jobSeekerMiddleware , addExperience)
router.get('/experiences', authMiddleware ,jobSeekerMiddleware, getJobExperiences)
router.put('/experiences/:id', authMiddleware, jobSeekerMiddleware , UpdateJobExperience)
router.get('/experiences/:id', authMiddleware , GetExperience)
router.delete('/experiences/:id', authMiddleware, jobSeekerMiddleware , DeleteExperience)

module.exports = router