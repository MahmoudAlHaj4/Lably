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

class PendingApplication {
    static async create(applicationData){
        const query = `INSERT INTO pending_applications 
        (id, email, full_name, phone, address,resume_path, portfolio_path)
        VALUES (?, ?, ?, ?, ?, ?,?)`

        await pool.query(query, [
            applicationData.id,
            applicationData.email,
            applicationData.full_name,
            applicationData.phone,
            applicationData.address,
            applicationData.resume_path,
            applicationData.portfolio_path
        ])

        return {...applicationData}
    }

    static async getAll(){
        const query = `SELECT * FROM pending_applications`
        const [rows] = await pool.query(query)

        return rows
    }

    static async getPendingApp(id){
        const query = `SELECT * FROM pending_applications WHERE id=?`
        const [row] = await pool.query(query ,[id])
        return row[0]
    }

    static async approved(id){
        const query = `UPDATE pending_applications SET 	application_status =? WHERE id = ?`
        const [row] = await pool.query(query, ['approved', id])
        return row[0]
    }

    static async reject(applicationId) {
        const query = `UPDATE pending_applications SET application_status = ? WHERE id = ?`
        const [row] = await pool.query(query , ['rejected' , applicationId])
        return row[0]
    }
}

module.exports = PendingApplication