const express = require('express')
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')
const {getAllPendingApplications, getPendingApplication, approvePendingApplication} = require('../controllers/adminController')
const router = express.Router()

router.get('/pending-applications', authMiddleware , adminMiddleware , getAllPendingApplications)
router.get('/pending-application/:id', authMiddleware , adminMiddleware , getPendingApplication)
router.put('/approve/:id', authMiddleware, adminMiddleware, approvePendingApplication)

module.exports = router