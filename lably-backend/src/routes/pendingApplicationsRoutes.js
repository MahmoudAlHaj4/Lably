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
const { upload } = require('../middleware/uploadMiddleware')
const { validate } = require('../middleware/validationMiddleware')
const { body } = require('express-validator')
const router = express.Router()

router.post('/pending-applications', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'portfolio', maxCount: 5 }
]), [
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email address.'),
    body('full_name').trim().notEmpty().withMessage('Full name is required.'),
    body('phone').optional().trim(),
    body('address').optional().trim()
], validate, submitApplication)

router.use((err, req, res, next) => {
    res.status(400).json({ message: err.message })
})

module.exports = router