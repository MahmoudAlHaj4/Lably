const express = require('express')
const { authMiddleware } = require('../middleware/authMiddleware')
const { apply, getEmployerApplication } = require('../controllers/applicationController')
const router = express.Router() 

router.post('/application/:id', authMiddleware , apply)
router.get('/application/:id', authMiddleware , getEmployerApplication)

module.exports = router