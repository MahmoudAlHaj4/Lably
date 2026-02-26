const PendingApplication = require('../models/PendingApplication')


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
            const user = await PendingApplication.getPendingApp(id)
            if(!user){
                return res.status(404).json({message: 'User not found'})
            }
            const result = await PendingApplication.approved(id)
            // if(result.affectedRows === 0){
            //     return res.status(404).json({message : 'User not found'})
            // }
            console.log(result)
            return res.status(200).json({
                message: 'Success',
                data: result
            })
        }catch(error){
            return res.status(500).json({message: error.message})
        }
    }

module.exports = {getAllPendingApplications, getPendingApplication, approvePendingApplication}