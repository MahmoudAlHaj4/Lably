
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