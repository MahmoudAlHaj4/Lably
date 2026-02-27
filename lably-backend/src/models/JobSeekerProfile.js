const pool = require('../config/database')
const { randomUUID } = require('crypto')

class JobSeekerProfile {
    static async create(userId , profileData){
        const id = randomUUID()
        const query = `INSERT INTO job_seekers_profiles (id, user_id, full_name, phone, address, about) VALUES (?, ?, ?, ?, ?, ?)`

        await pool.query(query, [
            id,
            userId,
            profileData.full_name,
            profileData.phone || null,
            profileData.address || null,
            profileData.about || null
        ])

        return {id, user_id: userId , ...profileData}
    }

    static async findByUserId(userId) {
        const query = `SELECT id, user_id, full_name, phone,address, about FROM job_seekers_profiles WHERE user_id= ?`
        const [row] = await pool.query(query , [userId])
        return row[0]
    }
}

module.exports = JobSeekerProfile