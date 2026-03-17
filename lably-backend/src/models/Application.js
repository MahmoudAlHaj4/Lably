/**
 * Application.js
 * 
 * Handles all database queries for the applications table.
 * 
 * Functions:
 * create: inserts a new application linked to a job seeker and a job.
 * getApplication: returns a single application by ID, joins jobs and job seeker profile to include job title, employer ID, and applicant name.
 * getAllApplications: returns all applications received by an employer, joins jobs and job seeker profiles to include job title and applicant name.
 */

const pool = require('../config/database')
const { randomUUID } = require('crypto')

class Application {
    static async create(jobSeekerId, jobId, applicationData){
        const id = randomUUID()
        const query = ` INSERT INTO applications (id, job_seeker_id, job_id, cover_letter, resume_path)
        VALUES ($1, $2, $3, $4, $5)`

        await pool.query(query, [
            id,
            jobSeekerId,
            jobId,
            applicationData.cover_letter,
            applicationData.resume_path
        ])

        return {id, job_seeker_id: jobSeekerId , job_id: jobId , ...applicationData}
    }

    static async getApplication (applicationId) {
        const query = `SELECT applications.id , applications.job_seeker_id, applications.job_id , applications.cover_letter , applications.resume_path, job_seekers_profiles.full_name, jobs.employer_id
                        FROM applications 
                        JOIN jobs ON applications.job_id = jobs.id
                        JOIN job_seekers_profiles ON applications.job_seeker_id = job_seekers_profiles.user_id
                        WHERE applications.id = $1`
        
        const result = await pool.query(query , [applicationId])

        return result.rows[0]
    }
    
    static async getAllApplications(employerId) {
        const query = `SELECT applications.id , applications.job_seeker_id , applications.job_id, applications.cover_letter , applications.resume_path, applications.applied_at, jobs.job_title, job_seekers_profiles.full_name
                        FROM applications
                        JOIN jobs ON applications.job_id = jobs.id
                        JOIN job_seekers_profiles ON applications.job_seeker_id = job_seekers_profiles.user_id
                        WHERE jobs.employer_id = $1`

        const result = await pool.query(query , [employerId])

        return result.rows
    }
}

module.exports = Application