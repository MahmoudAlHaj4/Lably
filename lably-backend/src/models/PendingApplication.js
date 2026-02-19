
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

}

module.exports = PendingApplication