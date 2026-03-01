const express = require('express')
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')
const {getAllPendingApplications, getPendingApplication, approvePendingApplication, rejectPendingApplication} = require('../controllers/adminController')
const router = express.Router()

router.get('/pending-applications', authMiddleware , adminMiddleware , getAllPendingApplications)
router.get('/pending-application/:id', authMiddleware , adminMiddleware , getPendingApplication)
router.put('/approve/:id', authMiddleware, adminMiddleware, approvePendingApplication)
router.put('/reject/:id', authMiddleware , adminMiddleware ,rejectPendingApplication)

module.exports = router