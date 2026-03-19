/**
 * JobSeekerProfile.js
 * 
 * Handles all database queries for the job_seekers_profiles table.
 * Profile is created after the job seeker activates their account.
 * 
 * Functions:
 * create: inserts a new job seeker profile, phone, address, and about default to null if not provided.
 * findByUserId: returns a job seeker profile by user ID, used to get profile data.
 * update: dynamically builds the UPDATE query based on only the fields provided, so partial updates are supported without overwriting existing data.
 */

const pool = require('../config/database')
const { randomUUID } = require('crypto')

class JobSeekerProfile {
    static async create(userId , profileData){
        const id = randomUUID()
        const query = `INSERT INTO job_seekers_profiles (id, user_id, full_name, phone, address, about, profile_image_path, job_title,  years_of_experience, linkedin_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`

        await pool.query(query, [
            id,
            userId,
            profileData.full_name,
            profileData.phone || null,
            profileData.address || null,
            profileData.about || null,
            profileData.profile_image_path || null,
             profileData.job_title || null,
            profileData.years_of_experience || null,
            profileData.linkedin_url || null
        ])

        return {id, user_id: userId , ...profileData}
    }

    static async findByUserId(userId) {
        const query = `SELECT id, user_id, full_name, phone,address, about, job_title, years_of_experience, linkedin_url  FROM job_seekers_profiles WHERE user_id= $1`
        const result = await pool.query(query , [userId])
        return result.rows[0]
    }

    static async update(userId, profileData) {
        const fields = []
        const values = []

        if (profileData.full_name) {
            values.push(profileData.full_name)
            fields.push(`full_name = $${values.length}`)
        }
        if (profileData.phone) {
            values.push(profileData.phone)
            fields.push(`phone = $${values.length}`)
        }
        if (profileData.address) {
            values.push(profileData.address)
            fields.push(`address = $${values.length}`)
        }
        if (profileData.about) {
            values.push(profileData.about)
            fields.push(`about = $${values.length}`)
        }

        if (profileData.profile_image_path) {
            values.push(profileData.profile_image_path)
            fields.push(`profile_image_path = $${values.length}`)
        }
         if (profileData.job_title) {
            values.push(profileData.job_title)
            fields.push(`job_title = $${values.length}`)
        }
        if (profileData.years_of_experience) {
            values.push(profileData.years_of_experience)
            fields.push(`years_of_experience = $${values.length}`)
        }
        if (profileData.linkedin_url) {
            values.push(profileData.linkedin_url)
            fields.push(`linkedin_url = $${values.length}`)
        }

        values.push(userId)
        const query = `UPDATE job_seekers_profiles SET ${fields.join(', ')} WHERE user_id = $${values.length}`

        await pool.query(query, values)

        return { ...profileData, user_id: userId }
    }

    static async findById(profileId) {
        const query = `SELECT id, user_id, full_name, phone, address, about, job_title, years_of_experience, linkedin_url
                    FROM job_seekers_profiles 
                    WHERE id = $1`
        const result = await pool.query(query, [profileId])
        return result.rows[0]
    }
}

module.exports = JobSeekerProfile