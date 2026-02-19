const PendingApplication = require('../models/PendingApplication')
const fs = require('fs')
async function submitApplication(req, res) {
    try{
        const { email, full_name, phone , address , portfolio_path} = req.body

        if(!email || !full_name){
            return res.status(400).json({error: 'Missing required fields'})
        }
        if(!req.files) {
            return res.status(400).json({error: 'resume is required'})
        }
        const id = req.generatedId
        const resume_path = `uploads/resumes/${id}.pdf`
        const portfolioPaths = req.files['portfolio'] 
            ? req.files['portfolio'].map(file => file.path) 
            : []
        
        
        const cleanData = {
            id,
            email,
            full_name,
            phone: phone || null,
            address: address || null ,
            resume_path ,
            portfolio_path: JSON.stringify(portfolioPaths)
        }

        const result = await PendingApplication.create(cleanData)
        res.status(201).json({
            success: true,
            message: 'Application submitted',
            data: result
        })
    }catch(error) {
        if(req.files){
            if(req.files['resume']){
                await fs.promises.unlink(req.files['resume'][0].path)
            }
            if(req.files['portfolio']){
                for(const file of req.files['portfolio']){
                    await fs.promises.unlink(file.path)
                }
            }
        }
        res.status(500).json({ error: error.message })
    }
}

module.exports = {submitApplication}