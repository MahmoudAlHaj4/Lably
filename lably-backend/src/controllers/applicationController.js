/**
 * applicationController.js
 * 
 * Handles job application logic for job seekers and employers.
 * 
 * Functions:
 * apply: allows a verified job seeker to apply to a job.
 * getEmployerApplication: returns a single application, checks employer ownership.
 * getEmployerApplications: returns all applications received by the authenticated employer.
 * 
 * 
 * apply Flow:
 * 1. Get job ID from request params.
 * 2. If no job ID → 404 Job not found.
 * 3. Check job exists using Job.getOneJob.
 * 4. If job not found → 404 Job not found.
 * 5. Create application using Application.create linked to job seeker ID and job ID.
 * 6. If job seeker already applied → 409 Already applied (caught from DB duplicate entry error).
 * 7. Return 201 with created application data.
 * 
 * 
 * getEmployerApplication Flow:
 * 1. Get application ID from request params.
 * 2. Get employer ID from req.user — set by authMiddleware.
 * 3. Fetch application using Application.getApplication includes employer ID and applicant name.
 * 4. If not found → 404 Application not found.
 * 5. If employer ID does not match → 403 Forbidden.
 * 6. Return 200 with application data.
 * 
 * 
 * getEmployerApplications Flow:
 * 1. Get employer ID from req.user, set by authMiddleware.
 * 2. Fetch all applications using Application.getAllApplications.
 * 3. Return 200 with applications data.
 */

const Application = require("../models/Application")
const Job = require('../models/Job')
const {uploadToSupabase } = require('../middleware/uploadMiddleware')


async function apply(req, res) {
    try{
        const {cover_letter } = req.body
        const userId = req.user.id 
        const jobId =  req.params.id

        if(!jobId) {
            return res.status(404).json({message: "Job Not found"})
        }

        const checkJob = await Job.getOneJob(jobId)

        if(!checkJob){
            return res.status(404).json({message: "Job Not found"})
        }
        if (!req.file) {
            return res.status(400).json({ message: "Resume is required" })
        }
        const resume_path = await uploadToSupabase(req.file, 'ApplicationsResumes')

        const data = await Application.create(userId, jobId , {
            cover_letter : cover_letter,
            resume_path: resume_path
        })
          return res.status(201).json({
            message: "Success",
            data: data
        })
    }catch(error){
        if(error.code === '23505'){
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

async function getEmployerApplications(req, res) {
    try{
        const employerId = req.user.id 

        const data = await Application.getAllApplications(employerId)



        return res.status(200).json({message : "Success", data: data})
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {apply, getEmployerApplication, getEmployerApplications}