/**
 * applicationRoutes.js
 * 
 * Routes for job applications.
 * 
 * POST /api/applications/application/:id — Apply to a job by job ID. Job seeker only.
 * GET  /api/applications/application/:id — Get a single application by ID. Employer only.
 * GET  /api/applications/application     — Get all received applications. Employer only.
 */

const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { apply, getEmployerApplication, getEmployerApplications } = require('../controllers/applicationController')
const { jobSeekerMiddleware } = require('../middleware/jobSeekerMiddleware')
const { employerMiddleware } = require('../middleware/employerMiddleware')
const { upload } = require('../middleware/uploadMiddleware')
const router = express.Router() 

router.post('/applications/job/:id', authMiddleware, jobSeekerMiddleware, upload.single('resume') , apply)
router.get('/applications/:id', authMiddleware,employerMiddleware , getEmployerApplication)
router.get('/applications', authMiddleware, employerMiddleware , getEmployerApplications)

module.exports = router