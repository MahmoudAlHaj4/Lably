const pool = require('../config/database')
const { randomUUID } = require('crypto')

class Job {
    static async create(employerId , jobData) {
        const id = randomUUID()

        const query = `INSERT INTO jobs (id, employer_id, status, job_title, description, requirements, location, job_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

        await pool.query(query, [
            id,
            employerId,
            'active',
            jobData.job_title,
            jobData.description,
            jobData.requirements,
            jobData.location,
            jobData.job_type
        ])

        return {id, employer_id : employerId , ...jobData}
    }

    static async getAllEmployerJobs(employerId) {
        const query = `SELECT * FROM jobs WHERE employer_id = ?`
        const [rows] = await pool.query(query , [employerId])

        return rows
    }
}

module.exports = Job