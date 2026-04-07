/**
 * employerProfileController.js
 * 
 * Handles employer profile logic.
 * Routes are protected by authMiddleware and employerMiddleware.
 * 
 * Functions:
 * createEmployerProfile: creates a new profile for the authenticated employer.
 * updateEmployerProfile: updates an existing employer profile.
 * getEmployerProfile: returns the authenticated employer's profile.
 * 
 * 
 * createEmployerProfile Flow:
 * 1. Extract profile fields from request body.
 * 2. Get user ID and role from req.user, set by authMiddleware.
 * 3. If role is not employer → 403 Forbidden.
 * 4. If company_name missing → 400 Company name is required.
 * 5. Check if profile already exists using EmployerProfile.findByUserId.
 * 6. If profile exists → 400 Already have a profile.
 * 7. Create profile using EmployerProfile.create.
 * 8. Return 201 success.
 * 
 * 
 * updateEmployerProfile Flow:
 * 1. Extract profile fields from request body.
 * 2. Get user ID and role from req.user, set by authMiddleware.
 * 3. If role is not employer → 403 Forbidden.
 * 4. Check profile exists using EmployerProfile.findByUserId.
 * 5. If not found → 404 Not found.
 * 6. Update profile using EmployerProfile.update.
 * 7. Return 200 success.
 * 
 * 
 * getEmployerProfile Flow:
 * 1. Get user ID from req.user, set by authMiddleware.
 * 2. Fetch profile using EmployerProfile.findByUserId.
 * 3. Return 200 with profile data.
 */


const { uploadToSupabase } = require('../middleware/uploadMiddleware')
const EmployerProfile = require('../models/EmployerProfile')

async function createEmployerProfile(req, res) {
    try {
        const {
            company_name, company_description, location, website,
            organization_type, industry_type, team_size, year_established,
            company_vision, linkedin_url, twitter_url, facebook_url,
            instagram_url, contact_email, contact_phone
        } = req.body

        const userId = req.user.id

        const checkProfile = await EmployerProfile.findByUserId(userId)
        if (checkProfile) {
            return res.status(409).json({ message: 'You already have a profile.' })
        }

        let logo_path = null
        let banner_path = null

        if (req.files?.logo) {
            logo_path = await uploadToSupabase(req.files.logo[0], 'logos')
        }
        if (req.files?.banner) {
            banner_path = await uploadToSupabase(req.files.banner[0], 'banners')
        }

        await EmployerProfile.create(userId, {
            company_name, company_description, location, website,
            logo_path, banner_path, organization_type, industry_type,
            team_size, year_established, company_vision,
            linkedin_url, twitter_url, facebook_url, instagram_url,
            contact_email, contact_phone
        })

        return res.status(201).json({ message: 'Profile created successfully.' })

    } catch (error) {
          console.error('PROFILE ERROR:', error.message)
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function updateEmployerProfile(req, res) {
    try {
        const {
            company_name, company_description, location, website,
            organization_type, industry_type, team_size, year_established,
            company_vision, linkedin_url, twitter_url, facebook_url,
            instagram_url, contact_email, contact_phone
        } = req.body

        const userId = req.user.id

        const checkProfile = await EmployerProfile.findByUserId(userId)
        if (!checkProfile) {
            return res.status(404).json({ message: 'Profile not found.' })
        }

        let logo_path = checkProfile.logo_path
        let banner_path = checkProfile.banner_path

        if (req.files?.logo) {
            logo_path = await uploadToSupabase(req.files.logo[0], 'logos')
        }
        if (req.files?.banner) {
            banner_path = await uploadToSupabase(req.files.banner[0], 'banners')
        }

        await EmployerProfile.update(userId, {
            company_name, company_description, location, website,
            logo_path, banner_path, organization_type, industry_type,
            team_size, year_established, company_vision,
            linkedin_url, twitter_url, facebook_url, instagram_url,
            contact_email, contact_phone
        })

        return res.status(200).json({ message: 'Profile updated successfully.' })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

async function getEmployerProfile(req, res) {
    try {
        const employerId = req.user.id
        const data = await EmployerProfile.findByUserId(employerId)

        return res.status(200).json({ message: 'Success.', data })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong. Please try again later.' })
    }
}

module.exports = { createEmployerProfile, updateEmployerProfile, getEmployerProfile }