const pool = require('../config/database')
const { randomUUID } = require('crypto')

class User {
    static async findByEmail(email){

        const query = `SELECT id, email, password, role, is_active FROM users WHERE email = ?`

        const [row] = await pool.query(query, [email])

        return row[0]
    }

    static async createUser(userData) {
        const query = `INSERT INTO users (id, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)`
        const id = randomUUID()

        const [result] = await pool.query(query ,[
            id,
            userData.email,
            userData.password,
            userData.role,
            false
        ] )

        return {id, email: userData.email , role: userData.role , is_active : false}
    }

    static async setActivationToken(token ,expiry, userId) {
   
        const query = `UPDATE users SET activation_token = ?, activation_token_expires = ? WHERE id = ?`
        await pool.query(query, [token, expiry, userId])

    }
}

module.exports = User