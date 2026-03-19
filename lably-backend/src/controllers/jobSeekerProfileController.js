/**
 * jobSeekerProfileController.js
 * 
 * Handles job seeker profile logic.
 * Routes are protected by authMiddleware and jobSeekerMiddleware.
 * 
 * Functions:
 * createJobSeekerProfile: creates a new profile for the authenticated job seeker.
 * updateJobSeekerProfile: updates an existing profile.
 * getProfile: returns the authenticated job seeker's profile.
 * 
 * 
 * createJobSeekerProfile Flow:
 * 1. Extract profile fields from request body.
 * 2. Get user ID from req.user, set by authMiddleware.
 * 3. Check if profile already exists using JobSeekerProfile.findByUserId.
 * 4. If profile exists → 400 Profile already exists.
 * 5. Create profile using JobSeekerProfile.create.
 * 6. Return 201 with created profile data.
 * 
 * 
 * updateJobSeekerProfile Flow:
 * 1. Extract profile fields from request body.
 * 2. Get user ID from req.user, set by authMiddleware.
 * 3. Update profile using JobSeekerProfile.update.
 * 4. Return 200 with updated profile data.
 * 
 * 
 * getProfile Flow:
 * 1. Get user ID from req.user, set by authMiddleware.
 * 2. Fetch profile using JobSeekerProfile.findByUserId.
 * 3. Return 200 with profile data.
 */

const JobSeekerProfile = require('../models/JobSeekerProfile')

async function createJobSeekerProfile(req, res) {
    try {
        const { full_name, phone, address, about, job_title, years_of_experience, linkedin_url } = req.body
        const userId = req.user.id

        const checkProfile = await JobSeekerProfile.findByUserId(userId)
        if (checkProfile) {
            return res.status(409).json({ message: 'You already have a profile.' })
        }
        let profile_image_path
        if (req.file) {
            profile_image_path = await uploadToSupabase(req.file, 'avatars')
        }

        const data = await JobSeekerProfile.create(userId, { full_name, phone, address, about, profile_image_path: profile_image_path || null , job_title, years_of_experience, linkedin_url})

        return res.status(201).json({ message: 'Profile created successfully.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function updateJobSeekerProfile(req, res) {
    try {
        const { full_name, phone, address, about, job_title, years_of_experience, linkedin_url  } = req.body
        const userId = req.user.id

         let profile_image_path
        if (req.file) {
            profile_image_path = await uploadToSupabase(req.file, 'avatars')
        }

        const data = await JobSeekerProfile.update(userId, { full_name, phone, address, about, job_title, years_of_experience, linkedin_url , ...(profile_image_path && { profile_image_path }) })

        return res.status(200).json({ message: 'Profile updated successfully.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function getProfile(req, res) {
    try {
        const userId = req.user.id
        const data = await JobSeekerProfile.findByUserId(userId)

        return res.status(200).json({ message: 'Success.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function getCandidateProfile(req, res) {
    try {
        const profileId = req.params.id
        const data = await JobSeekerProfile.findById(profileId)

        if (!data) {
            return res.status(404).json({ message: 'Profile not found.' })
        }

        return res.status(200).json({ message: 'Success.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

module.exports = { createJobSeekerProfile, updateJobSeekerProfile, getProfile, getCandidateProfile }