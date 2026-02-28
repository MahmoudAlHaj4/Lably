const Job = require('../models/Job')


async function createJob(req, res){
    try{
        const {job_title, description, requirements , location , job_type} = req.body
        const employerId = req.user.id 

        const data = await Job.create(employerId , {
            job_title: job_title,
            description: description, 
            requirements: requirements,
            location: location,
            job_type : job_type
        })

        return res.status(201).json({
            message: "success", 
            data : data
        })
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

async function getEmployerJobs(req, res) {
    try{
        const employerId = req.user.id 
        const data = await Job.getAllEmployerJobs(employerId)

        return res.status(200).json({
            message: "Success",
            data : data
        })
    }catch(error) {
        return res.status(500).json({message :error.message})
    }
}

async function getJob (req, res) {
    try{
        const jobId = req.params.id
        
        const data = await Job.getOneJob(jobId)

        return res.status(200).json({message: 'success' , data: data})
    }catch(error) {
        return res.status(500).json({message : error.message})
    }
}

async function updateJob(req, res) {
    try{
        const {status, job_title, description, requirements, location, job_type} = req.body
        const jobId = req.params.id

        const data = await Job.update(jobId , {
            status : status,
            job_title : job_title,
            description: description,
            requirements: requirements,
            location: location,
            job_type: job_type
        })

        if(!data){
            return res.status(404).json({message: "Job not found"})
        }
        return res.status(200).json({
            message: "Success" ,
            data: data
        })
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

async function deleteJob(req, res) {
    try{
        const jobId = req.params.id    

        const is_found  = await Job.getOneJob(jobId)
        if(!is_found) {
            return res.status(404).json({message : 'Job Not found'})
        }

        const data = await Job.delete(jobId)

        return res.status(200).json({
            message : "Job deleted Successfully ",
            data : data
        })
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {createJob , getEmployerJobs, getJob, updateJob , deleteJob}