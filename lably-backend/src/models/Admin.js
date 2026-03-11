const pool = require('../config/database')

class Admin {
    static async getAllUsers() {
        const query = `SELECT id, email, role, is_active, created_at FROM users WHERE role != 'admin' ORDER BY created_at DESC`
        const result = await pool.query(query)
        return result.rows
    }

    static async deleteUserById(userId) {
        const query = `DELETE FROM users WHERE id = $1 RETURNING id`
        const result = await pool.query(query, [userId])
        return result.rows[0]
    }

    static async getAllJobs() {
        const query = `SELECT * FROM jobs ORDER BY created_at DESC`
        const result = await pool.query(query)
        return result.rows
    }

    static async deleteJobById(jobId) {
        const query = `DELETE FROM jobs WHERE id = $1 RETURNING id`
        const result = await pool.query(query, [jobId])
        return result.rows[0]
    }

    static async getAllApplications() {
        const query = `SELECT * FROM applications ORDER BY applied_at DESC`
        const result = await pool.query(query)
        return result.rows
    }

    static async deleteApplicationById(applicationId) {
        const query = `DELETE FROM applications WHERE id = $1 RETURNING id`
        const result = await pool.query(query, [applicationId])
        return result.rows[0]
    }
}

module.exports = Admin