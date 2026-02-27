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

    static async update(userId , profileData) {
        const fields = []
        const values = []

        if(profileData.full_name) {
        fields.push('full_name = ?')
        values.push(profileData.full_name)
        }
        if(profileData.phone) {
            fields.push('phone = ?')
            values.push(profileData.phone)
        }
        if(profileData.address){
            fields.push('address = ?')
            values.push(profileData.address)
        }
        if(profileData.about){
            fields.push('about = ?')
            values.push(profileData.about)
        }

        const query = `UPDATE job_seekers_profiles SET  ${fields.join(', ')} WHERE user_id = ? `
        values.push(userId)

        await pool.query(query, values)

        return {...profileData , user_id: userId}
    }
}

module.exports = JobSeekerProfile