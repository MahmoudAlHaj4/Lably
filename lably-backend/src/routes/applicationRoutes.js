const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { apply, getEmployerApplication, getEmployerApplications } = require('../controllers/applicationController')
const { jobSeekerMiddleware } = require('../middleware/jobSeekerMiddleware')
const { employerMiddleware } = require('../middleware/employerMiddleware')
const router = express.Router() 

router.post('/application/:id', authMiddleware, jobSeekerMiddleware , apply)
router.get('/application/:id', authMiddleware,employerMiddleware , getEmployerApplication)
router.get('/application', authMiddleware, employerMiddleware , getEmployerApplications)

module.exports = router