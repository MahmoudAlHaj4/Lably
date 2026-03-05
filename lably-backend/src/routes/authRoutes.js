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
const router = express.Router()

router.post('/login', loginRateLimit, login)
router.put('/activate', activateAccount)
router.post('/register', employerRegister)

module.exports = router