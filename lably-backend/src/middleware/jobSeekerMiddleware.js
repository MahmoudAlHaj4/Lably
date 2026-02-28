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