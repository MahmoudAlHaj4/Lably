/**
 * PendingApplication.js
 * 
 * Handles all database queries for the pending_applications table.
 * A pending application is submitted by a job seeker before they have an account.
 * Admin reviews these and either approves or rejects them.
 * 
 * Functions:
 * create: inserts a new pending application with resume and portfolio file paths.
 * getAll: returns all pending applications for the admin dashboard.
 * getPendingApp: returns a single application by ID for admin review.
 * approved: updates application status to approved.
 * reject: updates application status to rejected.
 */
const pool = require('../config/database')
const { randomUUID } = require('crypto')

class PendingApplication {
    static async create(applicationData){
        const id = randomUUID()

        const query = `INSERT INTO pending_applications 
        (id, email, full_name, phone, address,resume_path, portfolio_path)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`

        await pool.query(query, [
            id,
            applicationData.email,
            applicationData.full_name,
            applicationData.phone,
            applicationData.address,
            applicationData.resume_path,
            applicationData.portfolio_path
        ])

        return {id,...applicationData}
    }

    static async getAll(){
        const query = `SELECT * FROM pending_applications`
        const result = await pool.query(query)

        return result.rows
    }

    static async getPendingApp(id){
        const query = `SELECT * FROM pending_applications WHERE id= $1`
        const result = await pool.query(query ,[id])
        return result.rows[0]
    }

    static async approved(applicationId , applicationData ={}){
        const query = `UPDATE pending_applications SET 	application_status = $1, decision_notes = $2 WHERE id = $3 RETURNING *`
        const result = await pool.query(query,['approved', applicationData.decision_notes || null, applicationId])
        return result.rows[0]
    }

    static async reject(applicationId) {
        const query = `UPDATE pending_applications SET application_status = $1 WHERE id = $2 RETURNING *`
        const result = await pool.query(query , ['rejected' , applicationId])
        return result.rows[0]
    }
}

module.exports = PendingApplication