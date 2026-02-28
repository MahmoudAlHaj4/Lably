const Experience = require('../models/Experience')
const JobSeekerProfile = require('../models/JobSeekerProfile')


async function addExperience (req, res) {
    try{
        const {company_name , job_title, start_date, end_date , description} = req.body

        const data = await Experience.create(req.profile.id, {
            company_name: company_name,
            job_title: job_title,
            start_date: start_date,
            end_date: end_date,
            description: description
        })

        return res.status(201).json({message: 'success', data:data})
    }catch(error) {
        return res.status(500).json({message : error.message})
    }
}

async function getJobExperiences(req, res){
    try{
        const profileId = req.profile
        const data = await Experience.getUserExperience(profileId.id)

        return res.status(200).json({message: "success", data: data})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

async function UpdateJobExperience(req, res) {
    try{
        const {company_name , job_title, start_date, end_date , description} = req.body
        const experienceId = req.params.id
        const role = req.user.role
        const userId = req.user.id

        if(role !== 'job_seeker'){
            return res.status(403).json({message: 'You are Not a job seeker'})
        }

        const isActive = await User.findById(userId)

        if(isActive.is_active === false) {
            return res.status(403).json({message: 'You must activate your account first'})
        }

        const profile = await JobSeekerProfile.findByUserId(userId)

        if(!profile){
            return res.status(404).json({message: "Profile Not found"})
        }

        await Experience.Update(experienceId , {
            company_name: company_name,
            job_title: job_title,
            start_date: start_date,
            end_date: end_date,
            description: description

        })
        return res.status(200).json({message: "Updated Success"})
    }catch(error){
        return res.statu(500).json({message: error.message})
    }
}

async function  GetExperience(req, res) {
    try{
        const experienceId =req.params.id

        const data = await Experience.getOneExperience(experienceId)

        return res.status(200).json({
            message: "Success",
            data: data
        })
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

async function DeleteExperience(req, res) {
    try{
        const experienceId = req.params.id
        const role = req.user.role
        const userId = req.user.id

        if(role !== 'job_seeker'){
            return res.status(403).json({message: 'You are not a Job Seeker'})
        }

        const isActive = await User.findById(userId)
        if(isActive.is_active === false){
            return res.status(403).json({message: "You must actiavte Your account"})
        }

        const profile = await JobSeekerProfile.findByUserId(userId)
        if(!profile){
            return res.status(404).json({message: "Profile Not found"})
        }

        const is_found = Experience.getOneExperience(experienceId)

        if(!is_found){
            return res.status(404).json({message: "Experience Not Found"})
        }

        await Experience.delete(experienceId)

        return res.status(200).json({message: 'Successfully Deleted'})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {addExperience, getJobExperiences, UpdateJobExperience, GetExperience, DeleteExperience}