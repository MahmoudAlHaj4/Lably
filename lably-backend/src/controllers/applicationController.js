const Application = require("../models/Application")
const Job = require('../models/Job')


async function apply(req, res) {
    try{
        const {cover_letter , resume_path} = req.body
        const userId = req.user.id 
        const jobId =  req.params.id

        if(!jobId) {
            return res.status(404).json({message: "Job Not found"})
        }

        const checkJob = await Job.getOneJob(jobId)

        if(!checkJob){
            return res.status(404).json({message: "Job Not found"})
        }

        const data = await Application.create(userId, jobId , {
            cover_letter : cover_letter,
            resume_path: resume_path
        })
          return res.status(201).json({
            message: "Success",
            data: data
        })
    }catch(error){
        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({message : "You Already applied to this job"})
        }
       return res.status(500).json({message: error.message})
    }
}

async function getEmployerApplication (req, res) {
    try {
        const applicationId = req.params.id
        const employerId = req.user.id

        const data = await Application.getApplication(applicationId)

        if(!data) {
            return res.status(404).json({message : 'Application Not found'})
        }
        if(employerId !== data.employer_id) {
            return res.status(403).json({message: "forbidden its not your application"})
        }


        return res.status(200).json({
            message: "Success",
            data: data
        })
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {apply, getEmployerApplication}