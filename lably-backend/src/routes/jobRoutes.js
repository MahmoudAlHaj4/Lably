/**
 * jobRoutes.js
 * 
 * Routes for job management.
 * 
 * POST /api/jobs/job        — Create a new job. Employer only.
 * GET  /api/jobs/job        — Get all jobs posted by the authenticated employer. Employer only.
 * GET  /api/jobs/job/:id    — Get a single job by ID. Authenticated users only.
 * PUT  /api/jobs/job/:id    — Update a job. Employer only.
 * DELETE /api/jobs/job/:id  — Delete a job. Employer only.
 */

const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createJob, getEmployerJobs, getJob, updateJob, deleteJob } = require('../controllers/jobController')
const { employerMiddleware } = require('../middleware/employerMiddleware')
const { validate } = require('../middleware/validationMiddleware')
const { body } = require('express-validator')
const router = express.Router()

router.post('/jobs', authMiddleware, employerMiddleware, [
    body('job_title').trim().notEmpty().withMessage('Job title is required.'),
    body('description').trim().notEmpty().withMessage('Job description is required.'),
    body('job_type').trim().isIn(['remote', 'on_site', 'hybrid']).withMessage('Job type must be remote, on-site, or hybrid.')
], validate, createJob)

router.get('/jobs', authMiddleware, employerMiddleware, getEmployerJobs)
router.get('/jobs/:id', authMiddleware, getJob)

router.put('/jobs/:id', authMiddleware, employerMiddleware, [
    body('job_title').optional().trim().notEmpty().withMessage('Job title cannot be empty.'),
    body('job_type').optional().trim().isIn(['remote', 'on_site', 'hybrid']).withMessage('Job type must be remote, on-site, or hybrid.'),
    body('status').optional().trim().isIn(['active', 'filled', 'closed']).withMessage('Status must be active, filled, or closed.')
], validate, updateJob)

router.delete('/jobs/:id', authMiddleware, employerMiddleware, deleteJob)

module.exports = router