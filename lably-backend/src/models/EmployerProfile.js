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
    static async create(userId , profileData) {
        const id = randomUUID()

        const query = `INSERT INTO employer_profiles (id, user_id, company_name, company_description, location, website) VALUES ($1, $2, $3, $4, $5, $6)`

        await pool.query(query , [
            id,
            userId,
            profileData.company_name,
            profileData.company_description || null,
            profileData.location || null,
            profileData.website || null

        ])
        return {id, user_id: userId , ...profileData}
    }

    static async findByUserId(userId) {
        const query = `SELECT * FROM employer_profiles WHERE user_id =$1`
        const result = await pool.query(query , [userId])
        return result.rows[0]
    }

    static async update(userId, profileData){
        const query = `UPDATE employer_profiles SET company_name = $1, company_description = $2, location = $3, website = $4 WHERE user_id = $5`
        await pool.query(query , [
            profileData.company_name,
            profileData.company_description,
            profileData.location,
            profileData.website,
            userId
        ])

        return { ...profileData , user_id: userId}
    }

}

module.exports = EmployerProfile