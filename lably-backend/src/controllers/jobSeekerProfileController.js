const JobSeekerProfile = require('../models/JobSeekerProfile')
const User = require('../models/User')

async function createJobSeekerProfile(req, res) {
    try{
        const {full_name, phone, address, about} = req.body
        const userId = req.user.id
        const role = req.user.role

        if(role !== 'job_seeker'){
            return res.status(403).json({message: "You are Not A Job Seeker"})
        }

        const checkIsActive = await User.findById(userId)

        if(checkIsActive.is_active === false){
            return res.status(400).json({message : 'You must Activate your account first'})
        }
        const checkProfile = await JobSeekerProfile.findByUserId(userId)

        if(checkProfile){
            return res.status(400).json({message : "ALready have A Profile"})
        }

        await JobSeekerProfile.create(userId , {
            full_name : full_name,
            phone: phone,
            address: address,
            about: about
        }) 
        return res.status(201).json({
            message : 'Success',

        })
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}

async function updateJobSeekerProfile(req, res) {
    try{
        const { full_name , phone , address ,about} = req.body
        const userId = req.user.id
        const role = req.user.role

        if(role !== 'job_seeker'){
            return res.status(403).json({message: 'You are not a Job Seeker'})
        }

        const isActive = await User.findById(userId)

        if(isActive.is_active === false){
            return res.status(400).json({message : "You must Activate your account and create a profile first"})
        }

        const checkProfile = await JobSeekerProfile.findByUserId(userId)
        if(!checkProfile){
            return res.status(404).json({message: "Not found"})
        }

        await JobSeekerProfile.update(userId , {
            full_name: full_name,
            phone: phone,
            address: address,
            about: about
        })
        return res.status(200).json({message: 'success'})
    }catch(error) {
        return res.status(500).json({message : error.message})
    }
   
}

async function getProfile ( req, res) {
    try{ 
        const userId = req.user.id

        const data = await JobSeekerProfile.findByUserId(userId)
        return res.status(200).json({
            message: 'Success',
            data: data
        })
    }catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {createJobSeekerProfile, updateJobSeekerProfile , getProfile}