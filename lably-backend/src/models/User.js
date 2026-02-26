const pool = require('../config/database')

class User {
    static async findByEmail(email){

        const query = `SELECT id, email, password, role, is_active FROM users WHERE email = ?`

        const [row] = await pool.query(query, [email])

        return row[0]
    }
}

module.exports = User