require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const corsMiddleware  = require('./src/middleware/crosMiddleware')
app.use(corsMiddleware )

const pendingApplicationsRoutes = require('./src/routes/pendingApplicationsRoutes')
app.use('/api/pendingApplication', pendingApplicationsRoutes)

const authRoutes = require('./src/routes/authRoutes')
app.use('/api/auth', authRoutes)

const adminRoutes = require('./src/routes/adminRoutes')
app.use('/api/admin', adminRoutes)

const employerProfileRoutes = require('./src/routes/employerprofileRoutes')
app.use('/api/employer/profile', employerProfileRoutes)

const jobSeekerProfileRoutes = require('./src/routes/jobSeekerProfileRoutes')
app.use('/api/job-seeker/profile', jobSeekerProfileRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Express server is running on http://localhost:${PORT}`)
})