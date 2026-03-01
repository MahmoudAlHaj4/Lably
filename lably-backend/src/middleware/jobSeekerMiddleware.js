/**
 * jobSeekerMiddleware.js
 * 
 * Protects job seeker routes. Runs after authMiddleware.
 * Checks role, account activation, and attaches the job seeker profile to the request.
 * 
 * jobSeekerMiddleware Flow:
 * 1. Check req.user.role, if not job_seeker → 403 Forbidden.
 * 2. Find user by ID using User.findById checks is_active status.
 * 3. If account not activated → 403 Account not activated.
 * 4. Find job seeker profile using JobSeekerProfile.findByUserId.
 * 5. If no profile found → 404 Profile not found.
 * 6. Attach profile to req.profile so controllers can use it without querying again.
 * 7. Call next.
 */

const JobSeekerProfile = require("../models/JobSeekerProfile")
const User = require("../models/User")

async function jobSeekerMiddleware(req, res, next) {

    try{
        const role = req.user.role
        const userId = req.user.id

        if(role !== 'job_seeker'){
            return res.status(403).json({message: "forbidden You must be a Job Seeker"})
        }
        const isActive = await User.findById(userId)
        if(isActive.is_active === false){
            return res.status(403).json({message: "Your account is not activated please activate your account first"})
        }
        const profile = await JobSeekerProfile.findByUserId(userId)

        if(!profile){
            return res.status(404).json({message: "Profile Not found"})
        }
        req.profile = profile
        next()
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {jobSeekerMiddleware}