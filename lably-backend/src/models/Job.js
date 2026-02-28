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

    static async getOneJob(jobId){
        const query = `SELECT * FROM jobs WHERE id =? `
        const [row] = await pool.query(query, [jobId])

        return row[0]
    }

    static async update (jobId , jobData) {
        const query = `UPDATE jobs SET status = ? , job_title =? , description = ?, requirements = ?, location =?, job_type = ? WHERE id =? `
        await pool.query(query , [
            jobData.status,
            jobData.job_title,
            jobData.description,
            jobData.requirements,
            jobData.location,
            jobData.job_type,
            jobId
        ])

        return {...jobData , id: jobId}
    }

    static async delete(jobId) {
        const query = 'DELETE FROM jobs WHERE id =?' 
        await pool.query(query , [jobId])

        return {jobId}
    }
}

module.exports = Job