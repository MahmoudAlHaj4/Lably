const PendingApplication = require('../models/PendingApplication')
const User = require('../models/User')
const { randomUUID } = require('crypto')
const bcrypt = require('bcrypt')


async function getAllPendingApplications(req,res) {
    try{
        const result = await PendingApplication.getAll()

        return res.status(200).json({message: "success",
            data: result
        })
        
    }catch(error){
        return res.status(500).json({message: error.message})
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
            const id = req.params.id
            const application = await PendingApplication.getPendingApp(id)
            if(!application){
                return res.status(404).json({message: 'application not found'})
            }

            const token = randomUUID()
            const expiry = new Date(Date.now() + + 48 * 60 * 60 * 1000)
            const password = await bcrypt.hash(randomUUID() , 10)

            const user = await User.createUser({
                email: application.email,
                password,
                role: 'job_seeker'
            })

            await User.setActivationToken(token, expiry , user.id)
            const result = await PendingApplication.approved(id)

            return res.status(200).json({
            message: 'Application approved, activation token generated',
            activationToken: token,
            data: result

            })
        }catch(error){
            return res.status(500).json({message: error.message})
        }
    }

module.exports = {getAllPendingApplications, getPendingApplication, approvePendingApplication}