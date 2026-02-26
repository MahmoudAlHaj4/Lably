const express = require('express')
const { submitApplication } = require('../controllers/pendingApplicationsController')
const upload = require('../middleware/uploadMiddleware')
const router = express.Router()

router.post('/submit', upload.fields([
        { name: 'resume', maxCount: 1 },
        { name: 'portfolio', maxCount: 5 }
    ]), submitApplication)
router.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
})

module.exports = router