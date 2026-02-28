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

        const data = await Experience.Update(experienceId , {
                company_name: company_name,
                job_title: job_title,
                start_date: start_date,
                end_date: end_date,
                description: description

            })

        if(!data) {
            return res.status(404).json({message: "Experience Not found"})
        }

        return res.status(200).json({message: "Updated Success", data: data})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

async function  GetExperience(req, res) {
    try{
        const experienceId =req.params.id
        const userId = req.user.id
        const profile = await JobSeekerProfile.findByUserId(userId)
        const data = await Experience.getOneExperience(experienceId)

        if(!data){
            return res.status(404).json({message : "Not found"})
        }

        if(data.job_seeker_profile_id !== profile.id){
            return res.status(403).json({message : "forbidden Its not your profile"})
        }

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
        const is_found = await Experience.getOneExperience(experienceId)

        if(!is_found){
            return res.status(404).json({message: "Experience Not Found"})
        }

        const data = await Experience.delete(experienceId)

        return res.status(200).json({message: 'Successfully Deleted' , data : data.experienceId})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {addExperience, getJobExperiences, UpdateJobExperience, GetExperience, DeleteExperience}