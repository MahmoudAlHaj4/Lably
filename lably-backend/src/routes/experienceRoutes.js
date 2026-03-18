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
const { validate } = require('../middleware/validationMiddleware')
const { body } = require('express-validator')
const router = express.Router()

router.post('/experiences', authMiddleware, jobSeekerMiddleware, [
    body('company_name').trim().notEmpty().withMessage('Company name is required.'),
    body('job_title').trim().notEmpty().withMessage('Job title is required.'),
    body('start_date').notEmpty().withMessage('Start date is required.').isDate().withMessage('Start date must be a valid date.'),
    body('end_date').optional({ nullable: true }).isDate().withMessage('End date must be a valid date.'),
], validate, addExperience)

router.get('/experiences', authMiddleware, jobSeekerMiddleware, getJobExperiences)

router.put('/experiences/:id', authMiddleware, jobSeekerMiddleware, [
    body('company_name').optional().trim().notEmpty().withMessage('Company name cannot be empty.'),
    body('job_title').optional().trim().notEmpty().withMessage('Job title cannot be empty.'),
    body('start_date').optional().isDate().withMessage('Start date must be a valid date.'),
    body('end_date').optional({ nullable: true }).isDate().withMessage('End date must be a valid date.'),
], validate, UpdateJobExperience)

router.get('/experiences/:id', authMiddleware, GetExperience)
router.delete('/experiences/:id', authMiddleware, jobSeekerMiddleware, DeleteExperience)

module.exports = router