/**
 * pendingApplicationController.js
 * 
 * Handles submit application logic for job seekers before they have an account.
 * 
 * Functions:
 * submitApplication: validates fields, saves files, and creates a pending application.
 * 
 * 
 * submitApplication Flow:
 * 1. Validate email and full_name exist in request body.
 * 2. Check req.files: populated by multer upload middleware in the route, contains resume and portfolio files.
 * 3. If no files → 400 resume is required.
 * 4. Get generated UUID from req.generatedId set by middleware before this controller runs.
 * 5. Build resume path using the generated ID.
 * 6. Map portfolio files to their paths, empty array if no portfolio submitted.
 * 7. Clean and structure the data, phone and address default to null if not provided.
 * 8. Save application using {PendingApplication.create (function in PendingApplication Model that inserts into pending_applications table)}.
 * 9. Return 201 with success message and created application data.
 * 
 * Exception:
 * If anything fails, delete any uploaded files from the filesystem to avoid orphaned files,
 * then return 500 with error message.
 */

const PendingApplication = require('../models/PendingApplication')
const fs = require('fs')
async function submitApplication(req, res) {
    try{
        const { email, full_name, phone , address} = req.body

        if(!email || !full_name){
            return res.status(400).json({error: 'Missing required fields'})
        }
        if(!req.files) {
            return res.status(400).json({error: 'resume is required'})
        }
        const id = req.generatedId
        const resume_path = `uploads/resumes/${id}.pdf`
        const portfolioPaths = req.files['portfolio'] 
            ? req.files['portfolio'].map(file => file.path) 
            : []
        
        
        const cleanData = {
            id,
            email,
            full_name,
            phone: phone || null,
            address: address || null ,
            resume_path ,
            portfolio_path: JSON.stringify(portfolioPaths)
        }

        const result = await PendingApplication.create(cleanData)
        res.status(201).json({
            success: true,
            message: 'Application submitted',
            data: result
        })
    }catch(error) {
        if(req.files){
            if(req.files['resume']){
                await fs.promises.unlink(req.files['resume'][0].path)
            }
            if(req.files['portfolio']){
                for(const file of req.files['portfolio']){
                    await fs.promises.unlink(file.path)
                }
            }
        }
        res.status(500).json({ error: error.message })
    }
}

module.exports = {submitApplication}