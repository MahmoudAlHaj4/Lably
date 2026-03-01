/**
 * jobController.js
 * 
 * Handles job management logic for employers.
 * Routes are protected by authMiddleware and employerMiddleware.
 * 
 * Functions:
 * createJob: creates a new job posting for the authenticated employer.
 * getEmployerJobs: returns all jobs posted by the authenticated employer.
 * getJob: returns a single job by ID.
 * updateJob: updates an existing job posting.
 * deleteJob: deletes a job posting.
 * 
 * 
 * createJob Flow:
 * 1. Extract job fields from request body.
 * 2. Get employer ID from req.user, set by authMiddleware.
 * 3. Create job using Job.create, status defaults to active.
 * 4. Return 201 with created job data.
 * 
 * 
 * getEmployerJobs Flow:
 * 1. Get employer ID from req.user, set by authMiddleware.
 * 2. Fetch all jobs using Job.getAllEmployerJobs.
 * 3. Return 200 with jobs data.
 * 
 * 
 * getJob Flow:
 * 1. Get job ID from request params.
 * 2. Fetch job using Job.getOneJob.
 * 3. Return 200 with job data.
 * 
 * 
 * updateJob Flow:
 * 1. Extract job fields from request body.
 * 2. Get job ID from request params.
 * 3. Update job using Job.update.
 * 4. If job not found → 404 Job not found.
 * 5. Return 200 with updated job data.
 * 
 * 
 * deleteJob Flow:
 * 1. Get job ID from request params.
 * 2. Check job exists using Job.getOneJob.
 * 3. If not found → 404 Job not found.
 * 4. Delete job using Job.delete.
 * 5. Return 200 with success message.
 */

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