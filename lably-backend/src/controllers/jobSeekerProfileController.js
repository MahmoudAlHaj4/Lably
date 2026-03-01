const JobSeekerProfile = require('../models/JobSeekerProfile')
const User = require('../models/User')

async function createJobSeekerProfile(req, res) {
    try{
        const {full_name, phone, address, about} = req.body
        const userId = req.user.id

        const checkProfile = await JobSeekerProfile.findByUserId(userId)

        if(checkProfile) {
            return res.status(400).json({ message: 'Profile already exists' })
        }
        
        const data = await JobSeekerProfile.create(userId , {
            full_name : full_name,
            phone: phone,
            address: address,
            about: about
        }) 
        return res.status(201).json({
            message : 'Success',
            data: data

        })
    }catch(error){
        return res.status(500).json({message : error.message})
    }
}

async function updateJobSeekerProfile(req, res) {
    try{
        const { full_name , phone , address ,about} = req.body
        const userId = req.user.id

        const data = await JobSeekerProfile.update(userId , {
            full_name: full_name,
            phone: phone,
            address: address,
            about: about
        })
        return res.status(200).json({message: 'success' , data: data})
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