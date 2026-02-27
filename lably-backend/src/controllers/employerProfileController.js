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

module.exports = {createEmployerProfile}