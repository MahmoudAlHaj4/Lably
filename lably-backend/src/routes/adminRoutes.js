/**
 * adminRoutes.js
 * 
 * Routes for admin verification management.
 * All routes are protected by authMiddleware and adminMiddleware.
 * 
 * GET /api/admin/pending-applications     — Get all pending applications.
 * GET /api/admin/pending-application/:id  — Get a single pending application by ID.
 * PUT /api/admin/approve/:id              — Approve a pending application.
 * PUT /api/admin/reject/:id               — Reject a pending application.
 */

const express = require('express')
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware')
const {getAllPendingApplications, getPendingApplication, approvePendingApplication, rejectPendingApplication} = require('../controllers/adminController')
const router = express.Router()

router.get('/pending-applications', authMiddleware , adminMiddleware , getAllPendingApplications)
router.get('/pending-application/:id', authMiddleware , adminMiddleware , getPendingApplication)
router.put('/approve/:id', authMiddleware, adminMiddleware, approvePendingApplication)
router.put('/reject/:id', authMiddleware , adminMiddleware ,rejectPendingApplication)

module.exports = router