/**
 * EmployerProfile.js
 * 
 * Handles all database queries for the employer_profiles table.
 * 
 * Functions:
 * create: inserts a new employer profile, optional fields default to null.
 * findByUserId: returns an employer profile by user ID.
 * update: updates an existing employer profile by user ID.
 */

const pool = require('../config/database')
const { randomUUID } = require('crypto')

class EmployerProfile {
    static async create(userId, profileData) {
        const id = randomUUID()
        const query = `
            INSERT INTO employer_profiles (
                id, user_id, company_name, company_description, location, website,
                logo_path, banner_path, organization_type, industry_type,
                team_size, year_established, company_vision,
                linkedin_url, twitter_url, facebook_url, instagram_url,
                contact_email, contact_phone
            ) VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
            )`

        await pool.query(query, [
            id,
            userId,
            profileData.company_name,
            profileData.company_description || null,
            profileData.location || null,
            profileData.website || null,
            profileData.logo_path || null,
            profileData.banner_path || null,
            profileData.organization_type || null,
            profileData.industry_type || null,
            profileData.team_size || null,
            profileData.year_established || null,
            profileData.company_vision || null,
            profileData.linkedin_url || null,
            profileData.twitter_url || null,
            profileData.facebook_url || null,
            profileData.instagram_url || null,
            profileData.contact_email || null,
            profileData.contact_phone || null
        ])

        return { id, user_id: userId, ...profileData }
    }

    static async findByUserId(userId) {
        const query = `SELECT * FROM employer_profiles WHERE user_id = $1`
        const result = await pool.query(query, [userId])
        return result.rows[0]
    }

    static async update(userId, profileData) {
        const query = `
            UPDATE employer_profiles SET
                company_name = $1, company_description = $2, location = $3, website = $4,
                logo_path = $5, banner_path = $6, organization_type = $7, industry_type = $8,
                team_size = $9, year_established = $10, company_vision = $11,
                linkedin_url = $12, twitter_url = $13, facebook_url = $14, instagram_url = $15,
                contact_email = $16, contact_phone = $17
            WHERE user_id = $18`

        await pool.query(query, [
            profileData.company_name,
            profileData.company_description || null,
            profileData.location || null,
            profileData.website || null,
            profileData.logo_path || null,
            profileData.banner_path || null,
            profileData.organization_type || null,
            profileData.industry_type || null,
            profileData.team_size || null,
            profileData.year_established || null,
            profileData.company_vision || null,
            profileData.linkedin_url || null,
            profileData.twitter_url || null,
            profileData.facebook_url || null,
            profileData.instagram_url || null,
            profileData.contact_email || null,
            profileData.contact_phone || null,
            userId
        ])

        return { ...profileData, user_id: userId }
    }
}

module.exports = EmployerProfile