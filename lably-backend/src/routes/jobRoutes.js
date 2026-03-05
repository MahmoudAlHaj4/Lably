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
const router = express.Router()

router.post('/jobs', authMiddleware, employerMiddleware , createJob) 
router.get('/jobs', authMiddleware ,employerMiddleware, getEmployerJobs)
router.get('/jobs/:id', authMiddleware, getJob)
router.put('/jobs/:id', authMiddleware, employerMiddleware , updateJob)
router.delete('/jobs/:id', authMiddleware, employerMiddleware , deleteJob)

module.exports = router