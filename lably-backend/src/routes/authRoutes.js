/**
 * authRoutes.js
 * 
 * Routes for authentication.
 * 
 * POST /api/auth/register     — Employer registration. Public.
 * POST /api/auth/login        — Login for all roles. Public.
 * POST /api/auth/activate     — Activate job seeker account. Public.
 */

const express = require('express')
const { login, activateAccount, employerRegister } = require('../controllers/authController')
const { loginRateLimit } = require('../middleware/rateLimitMiddleware')
const { validate } = require('../middleware/validationMiddleware')
const { body } = require('express-validator')
const router = express.Router()

router.post('/login', loginRateLimit, [
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email address.'),
    body('password').notEmpty().withMessage('Password is required.')
], validate, login)

router.put('/activate', [
    body('token').notEmpty().withMessage('Activation token is required.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.').bail()
        .trim().notEmpty().withMessage('Password cannot be empty.')
], validate, activateAccount)

router.post('/register', [
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email address.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.').bail()
        .trim().notEmpty().withMessage('Password cannot be empty.')
], validate, employerRegister)

module.exports = router