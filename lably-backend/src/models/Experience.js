/**
 * Experience.js
 * 
 * Handles all database queries for the experiences table.
 * Experiences belong to a job seeker profile, not directly to a user.
 * 
 * Functions:
 * create: inserts a new experience entry linked to a job seeker profile ID.
 * getUserExperience: returns all experiences for a specific job seeker profile.
 * getOneExperience: returns a single experience by ID.
 * Update: updates an existing experience entry.
 * delete: deletes an experience by ID.
 */

const pool = require('../config/database')
const { randomUUID } = require('crypto')

class Experience {
    static async create(profileId , experienceData){
       const id = randomUUID()

       const query = `INSERT INTO experiences (id, job_seeker_profile_id, company_name, job_title, start_date, end_date, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`

       await pool.query(query , [
        id,
        profileId,
        experienceData.company_name,
        experienceData.job_title,
        experienceData.start_date,
        experienceData.end_date,
        experienceData.description
       ])

       return {id, job_seeker_profile_id: profileId , ...experienceData}
    }

    static async getUserExperience (profileId){
        const query = 'SELECT * FROM experiences WHERE job_seeker_profile_id = ?'
        const [rows] = await pool.query(query , [profileId])
        return rows
    }
    static async getOneExperience(experienceId) {
        const query = `SELECT * from experiences WHERE id = ?`
        const [row] = await pool.query(query, [experienceId])
        return row[0]
    }

    static async Update(experienceId , experienceData) {
        const query = `UPDATE experiences SET company_name = ?, job_title = ?, start_date = ?, end_date = ?, description = ? WHERE id = ?`

        await pool.query(query, [
            experienceData.company_name,
            experienceData.job_title,
            experienceData.start_date,
            experienceData.end_date,
            experienceData.description,
            experienceId
        ])
        return {...experienceData , id: experienceId}
    }

    static async delete(experienceId){
        const query = `DELETE FROM experiences WHERE id = ?`

        await pool.query(query, [experienceId])

        return {experienceId}
    }
}

module.exports = Experience