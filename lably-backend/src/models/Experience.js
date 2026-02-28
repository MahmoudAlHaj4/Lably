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