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
const router = express.Router()

router.post('/login', login)
router.put('/activate', activateAccount)
router.post('/register', employerRegister)

module.exports = router