require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())


const pendingApplicationsRoutes = require('./src/routes/pendingApplicationsRoutes')
app.use('/api/pendingApplication', pendingApplicationsRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Express server is running on http://localhost:${PORT}`)
})