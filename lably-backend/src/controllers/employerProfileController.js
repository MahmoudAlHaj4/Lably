/**
 * employerProfileController.js
 * 
 * Handles employer profile logic.
 * Routes are protected by authMiddleware and employerMiddleware.
 * 
 * Functions:
 * createEmployerProfile: creates a new profile for the authenticated employer.
 * updateEmployerProfile: updates an existing employer profile.
 * getEmployerProfile: returns the authenticated employer's profile.
 * 
 * 
 * createEmployerProfile Flow:
 * 1. Extract profile fields from request body.
 * 2. Get user ID and role from req.user, set by authMiddleware.
 * 3. If role is not employer → 403 Forbidden.
 * 4. If company_name missing → 400 Company name is required.
 * 5. Check if profile already exists using EmployerProfile.findByUserId.
 * 6. If profile exists → 400 Already have a profile.
 * 7. Create profile using EmployerProfile.create.
 * 8. Return 201 success.
 * 
 * 
 * updateEmployerProfile Flow:
 * 1. Extract profile fields from request body.
 * 2. Get user ID and role from req.user, set by authMiddleware.
 * 3. If role is not employer → 403 Forbidden.
 * 4. Check profile exists using EmployerProfile.findByUserId.
 * 5. If not found → 404 Not found.
 * 6. Update profile using EmployerProfile.update.
 * 7. Return 200 success.
 * 
 * 
 * getEmployerProfile Flow:
 * 1. Get user ID from req.user, set by authMiddleware.
 * 2. Fetch profile using EmployerProfile.findByUserId.
 * 3. Return 200 with profile data.
 */


const EmployerProfile = require('../models/EmployerProfile')

async function createEmployerProfile(req, res) {
    try{
        const { company_name , company_description , location , website} = req.body
        const userId = req.user.id
        const role = req.user.role

        if(role !== 'employer'){
            return res.status(403).json({message : "you are ot employer"})
        }
        
        if(!company_name){
            return res.status(400).json({message : "Compane Name is required"})
        }
                
        const checkProfile = await EmployerProfile.findByUserId(userId)

        if(checkProfile){
            return res.status(400).json({message: "Already have a profile "})
        }

        await EmployerProfile.create(userId , {
            company_name : company_name,
            company_description : company_description,
            location: location,
            website: website
        })

        return res.status(201).json({message : 'Success'})
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}

async function updateEmployerProfile(req, res) {
    try{
        const {company_name , company_description , location , website} = req.body
        const role = req.user.role
        const userId = req.user.id

        if(role !== 'employer') {
            return res.status(403).json({message: "You are not an employer"})
        }
         const checkProfile = await EmployerProfile.findByUserId(userId)

        if(!checkProfile){
            return res.status(404).json({message: "Not Found"})
        }

        await EmployerProfile.update(userId , {
            company_name : company_name,
            company_description: company_description,
            location: location,
            website: website
        })

        return res.status(200).json({message : "Profile Updated successfully"})
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}

async function getEmployerProfile(req, res) {
    try{
        const employerId = req.user.id

        const data = await EmployerProfile.findByUserId(employerId)

        return res.status(200).json({
            message: 'Success', 
            data: data
        })
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}


module.exports = {createEmployerProfile , updateEmployerProfile, getEmployerProfile}