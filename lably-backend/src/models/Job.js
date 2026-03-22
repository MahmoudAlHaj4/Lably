/**
 * Job.js
 * 
 * Handles all database queries for the jobs table.
 * 
 * Functions:
 * create: inserts a new job, status defaults to active.
 * getAllEmployerJobs: returns all jobs posted by a specific employer.
 * getOneJob: returns a single job by ID.
 * update: updates job fields including status.
 * delete: deletes a job by ID.
 */

const pool = require('../config/database')
const { randomUUID } = require('crypto')

class Job {
    static async create(employerId , jobData) {
        const id = randomUUID()

        const query = `INSERT INTO jobs (id, employer_id, status, job_title, description, requirements, location, job_type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

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
        const query = `SELECT * FROM jobs WHERE employer_id = $1 ORDER BY created_at DESC`
        const result = await pool.query(query , [employerId])

        return result.rows
    }

    static async getOneJob(jobId) {
        const query = `
            SELECT jobs.*,
                employer_profiles.company_name,
                employer_profiles.company_description,
                employer_profiles.location      AS employer_location,
                employer_profiles.website,
                employer_profiles.logo_path
            FROM jobs
            LEFT JOIN employer_profiles ON jobs.employer_id = employer_profiles.user_id
            WHERE jobs.id = $1`
        const result = await pool.query(query, [jobId])
        return result.rows[0]
    }
    static async update (jobId , jobData) {
        const query = `UPDATE jobs SET status = $1 , job_title = $2 , description = $3, requirements = $4, location = $5, job_type = $6 WHERE id =$7 `
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
        const query = 'DELETE FROM jobs WHERE id =$1' 
        await pool.query(query , [jobId])

        return {jobId}
    }

    static async getJobs() {
        const query = `
            SELECT jobs.*, employer_profiles.company_name, employer_profiles.logo_path
            FROM jobs 
            LEFT JOIN employer_profiles ON jobs.employer_id = employer_profiles.user_id
            WHERE jobs.status = 'active' 
            ORDER BY jobs.created_at DESC`
        const result = await pool.query(query)
        return result.rows
    }
}

module.exports = Job