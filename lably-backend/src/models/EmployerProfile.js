const pool = require('../config/database')
const { randomUUID } = require('crypto')

class EmployerProfile {
    static async create(userId , profileData) {
        const id = randomUUID()

        const query = `INSERT INTO employer_profiles (id, user_id, company_name, company_description, location, website) VALUES (?, ?, ?, ?, ?, ?)`

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
        const query = `SELECT * FROM employer_profiles WHERE user_id =?`
        const [row] = await pool.query(query , [userId])
        return row[0]
    }

    static async update(userId, profileData){
        const query = `UPDATE employer_profiles SET company_name = ?, company_description = ?, location = ?, website = ? WHERE user_id = ?`
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