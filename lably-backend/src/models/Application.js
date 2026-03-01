const pool = require('../config/database')
const { randomUUID } = require('crypto')

class Application {
    static async create(jobSeekerId, jobId, applicationData){
        const id = randomUUID()
        const query = ` INSERT INTO applications (id, job_seeker_id, job_id, cover_letter, resume_path)
        VALUES (?, ?, ?, ?, ?)`

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
                        WHERE applications.id = ?`
        
        const [row] = await pool.query(query , [applicationId])

        return row[0]
    }
        
}

module.exports = Application