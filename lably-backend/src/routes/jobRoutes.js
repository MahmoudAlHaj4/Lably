const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { createJob, getEmployerJobs, getJob, updateJob, deleteJob } = require('../controllers/jobController')
const { employerMiddleware } = require('../middleware/employerMiddleware')
const router = express.Router()

router.post('/job', authMiddleware, employerMiddleware , createJob)
router.get('/job', authMiddleware ,employerMiddleware, getEmployerJobs)
router.get('/job/:id', authMiddleware, getJob)
router.put('/job/:id', authMiddleware, employerMiddleware , updateJob)
router.delete('/job/:id', authMiddleware, employerMiddleware , deleteJob)

module.exports = router