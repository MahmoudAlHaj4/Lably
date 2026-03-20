/**
 * experienceController.js
 * 
 * Handles experience section logic for job seekers.
 * Routes are protected by authMiddleware and jobSeekerMiddleware.
 * req.profile is attached by jobSeekerMiddleware.
 * 
 * Functions:
 * addExperience: adds a new experience entry to the job seeker's profile.
 * getJobExperiences: returns all experiences for the authenticated job seeker.
 * UpdateJobExperience: updates an existing experience entry by ID.
 * GetExperience: returns a single experience by ID, checks ownership.
 * DeleteExperience: deletes an experience by ID.
 * 
 * 
 * addExperience Flow:
 * 1. Extract experience fields from request body.
 * 2. Create experience using Experience.create linked to req.profile.id.
 * 3. Return 201 with created experience data.
 * 
 * 
 * getJobExperiences Flow:
 * 1. Get profile from req.profile, set by jobSeekerMiddleware.
 * 2. Fetch all experiences using Experience.getUserExperience.
 * 3. Return 200 with experiences data.
 * 
 * 
 * UpdateJobExperience Flow:
 * 1. Extract experience fields from request body.
 * 2. Get experience ID from request params.
 * 3. Update experience using Experience.Update.
 * 4. If not found → 404 Experience not found.
 * 5. Return 200 with updated experience data.
 * 
 * 
 * GetExperience Flow:
 * 1. Get experience ID from request params.
 * 2. Fetch profile using JobSeekerProfile.findByUserId.
 * 3. Fetch experience using Experience.getOneExperience.
 * 4. If not found → 404 Not found.
 * 5. If experience does not belong to this profile → 403 Forbidden.
 * 6. Return 200 with experience data.
 * 
 * 
 * DeleteExperience Flow:
 * 1. Get experience ID from request params.
 * 2. Check experience exists using Experience.getOneExperience.
 * 3. If not found → 404 Experience not found.
 * 4. Delete experience using Experience.delete.
 * 5. Return 200 with deleted experience ID.
 */

const Experience = require('../models/Experience')
const JobSeekerProfile = require('../models/JobSeekerProfile')

async function addExperience(req, res) {
    try {
        const { company_name, job_title, start_date, end_date, description } = req.body

        const data = await Experience.create(req.profile.id, { company_name, job_title, start_date, end_date, description })

        return res.status(201).json({ message: 'Experience added successfully.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function getJobExperiences(req, res) {
    try {
        const data = await Experience.getUserExperience(req.profile.id)

        return res.status(200).json({ message: 'Success.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function UpdateJobExperience(req, res) {
    try {
        const { company_name, job_title, start_date, end_date, description } = req.body
        const experienceId = req.params.id

        const data = await Experience.update(experienceId, { company_name, job_title, start_date, end_date, description })

        if (!data) {
            return res.status(404).json({ message: 'Experience not found.' })
        }

        return res.status(200).json({ message: 'Experience updated successfully.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function GetExperience(req, res) {
    try {
        const experienceId = req.params.id
        const userId = req.user.id

        const profile = await JobSeekerProfile.findByUserId(userId)
        const data = await Experience.getOneExperience(experienceId)

        if (!data) {
            return res.status(404).json({ message: 'Experience not found.' })
        }
        if (data.job_seeker_profile_id !== profile.id) {
            return res.status(403).json({ message: 'Access denied. This experience does not belong to your profile.' })
        }

        return res.status(200).json({ message: 'Success.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function DeleteExperience(req, res) {
    try {
        const experienceId = req.params.id

        const is_found = await Experience.getOneExperience(experienceId)
        if (!is_found) {
            return res.status(404).json({ message: 'Experience not found.' })
        }

        await Experience.delete(experienceId)

        return res.status(200).json({ message: 'Experience deleted successfully.' })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

module.exports = { addExperience, getJobExperiences, UpdateJobExperience, GetExperience, DeleteExperience }