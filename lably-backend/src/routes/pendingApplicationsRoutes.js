/**
 * pendingApplicationRoutes.js
 * 
 * Routes for job seeker applications before they have an account.
 * 
 * POST /api/pending-applications/submit: Submit a new application. Public.
 *   → upload middleware runs first: accepts 1 resume and up to 5 portfolio files.
 *   → any multer errors (wrong file type, file too large) are caught and return 400.
 */

const express = require('express')
const { submitApplication } = require('../controllers/pendingApplicationsController')
const upload = require('../middleware/uploadMiddleware')
const router = express.Router()

router.post('/pending-applications', upload.fields([
        { name: 'resume', maxCount: 1 },
        { name: 'portfolio', maxCount: 5 }
    ]), submitApplication)
router.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

module.exports = router