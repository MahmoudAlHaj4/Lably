/**
 * server.js
 * 
 * Application entry point.
 * - Loads environment variables
 * - Initializes Express and global middleware (CORS, body parser, static files)
 * - Mounts all API routes
 * - Verifies DB connection then starts listening on configured port
 */

require('dotenv').config()
const express = require('express')
const app = express()

// Body parser must be registered before routes so req.body is available in controllers
app.use(express.json())

const corsMiddleware  = require('./src/middleware/crosMiddleware')
app.use(corsMiddleware )

app.get('/health', (req, res) => res.send('OK'));

const pendingApplicationsRoutes = require('./src/routes/pendingApplicationsRoutes')
app.use('/api', pendingApplicationsRoutes)

const authRoutes = require('./src/routes/authRoutes')
app.use('/api/auth', authRoutes)

const adminRoutes = require('./src/routes/adminRoutes')
app.use('/api/admin', adminRoutes)

const employerProfileRoutes = require('./src/routes/employerprofileRoutes')
app.use('/api/employer', employerProfileRoutes)

const jobSeekerProfileRoutes = require('./src/routes/jobSeekerProfileRoutes')
app.use('/api/job-seeker', jobSeekerProfileRoutes)

const experienceRoutes = require('./src/routes/experienceRoutes')
app.use('/api', experienceRoutes)

const jobRoutes = require('./src/routes/jobRoutes')
app.use('/api', jobRoutes)

const applicationRoutes = require('./src/routes/applicationRoutes')
app.use('/api', applicationRoutes)

module.exports = app