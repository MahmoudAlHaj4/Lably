/**
 * adminController.js
 * 
 * Handles admin verification logic for managing pending applications.
 * All functions are protected by authMiddleware and adminMiddleware.
 * 
 * Functions:
 * getAllPendingApplications: returns all pending applications for the admin dashboard.
 * getPendingApplication: returns a single pending application by ID.
 * approvePendingApplication: approves an application, creates a job seeker account, and generates an activation token.
 * rejectPendingApplication: rejects a pending application.
 * 
 * 
 * getAllPendingApplications Flow:
 * 1. Fetch all applications using PendingApplication.getAll.
 * 2. Return 200 with applications data.
 * 
 * 
 * getPendingApplication Flow:
 * 1. Get application ID from request params.
 * 2. Fetch application using PendingApplication.getPendingApp.
 * 3. Return 200 with application data.
 * 
 * 
 * approvePendingApplication Flow:
 * 1. Get application ID from request params.
 * 2. Fetch application using PendingApplication.getPendingApp.
 * 3. If not found → 404 Application not found.
 * 4. Generate activation token (UUID) and set expiry to 48 hours from now.
 * 5. Generate a temporary hashed password — will be replaced when job seeker activates account.
 * 6. Create inactive user account using User.createUser with role job_seeker and is_active false.
 * 7. Save activation token using User.setActivationToken.
 * 8. Update application status to approved using PendingApplication.approved.
 * 9. Return 200 with activation token.
 * 
 * 
 * rejectPendingApplication Flow:
 * 1. Get application ID from request params.
 * 2. Fetch application using PendingApplication.getPendingApp.
 * 3. If not found → 404 Application not found.
 * 4. Update application status to rejected using PendingApplication.reject.
 * 5. Return 200 with success message.
 */

const PendingApplication = require('../models/PendingApplication')
const User = require('../models/User')
const { randomUUID } = require('crypto')
const bcrypt = require('bcrypt')
const { sendActivationEmail } = require('../services/emailService')

async function getAllPendingApplications(req,res) {
    try{
        const result = await PendingApplication.getAll()

        return res.status(200).json({message: "success",
            data: result
        })
        
    }catch(error){
        return res.status(500).json({message: error.message, data: data})
    }
}

async function getPendingApplication(req, res) {

    try{
        const id = req.params.id
        const result = await PendingApplication.getPendingApp(id)
        return res.status(200).json({
            message: 'Success',
            data: result
        })
    }catch(error){
        return res.status(500).json({message: error.message})
    }
    
}


    async function approvePendingApplication(req, res) {
        try{
            const decision_notes = req.body?.decision_notes ?? null
            const id = req.params.id
            const application = await PendingApplication.getPendingApp(id)
            if(!application){
                return res.status(404).json({message: 'application not found'})
            }
            if(application.application_status === 'approved'){
                return res.status(400).json({message: 'application already approved'})
            }

            const token = randomUUID()
            const expiry = new Date(Date.now() + + 48 * 60 * 60 * 1000)
            const password = await bcrypt.hash(randomUUID() , 10)

            const user = await User.createUser({
                email: application.email,
                password,
                role: 'job_seeker',
                is_active: false
            })

            await User.setActivationToken(token, expiry , user.id)
            const result = await PendingApplication.approved(id, {
                decision_notes: decision_notes
            })
            await sendActivationEmail(application.email, token)

            return res.status(200).json({
            message: 'Application approved, activation token generated',
            data: result

            })
        }catch(error){
            return res.status(500).json({message: error.message})
        }
    }

async function rejectPendingApplication(req,res) {
    try{ 
        const decision_notes = req.body?.decision_notes ?? null
        const applicationId = req.params.id
        const application = await PendingApplication.getPendingApp(applicationId)

        if(!application){
            return res.status(404).json({message : "Application Not found"})
        }

        const data = await PendingApplication.reject(applicationId, {
            decision_notes: decision_notes
        })

        return res.status(200).json({message : "Application is rejected" , data : data})
    }catch(error) {
        return res.status(500).json({message : error.message})
    }
}

module.exports = {getAllPendingApplications, getPendingApplication, approvePendingApplication, rejectPendingApplication}